import React, { Component } from 'react';
import {
  Dimensions,
  LayoutAnimation,
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import {
  Group,
  Path,
  Surface,
  Shape
} from 'react-native/Libraries/ART/ReactNativeART';
import { StraightLine } from './StraightLine.js';
import { sendValueFromPoint } from '../../actions';

 class Line extends Component {

  static defaultProps = {
    strokeColor: 'white',
    strokeWidth: 1,                           // Width of in-between graph
  };

  state = {

    width: Dimensions.get('window').width,
    // set initial height to zero so when updated to actual height and
    // animated, the chart raises from the bottom to the top of the container
    height: 0,
    arrayClosest: [],
    selectedVal: -1,
  };

  componentWillMount() {
      this.updateArrayClosest();
  }

  componentWillUpdate() {
  //  this.setState({ height: 0 });
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    //  console.log('Num: ', this.getClosestTo(this.state.arrayClosest, this.props.xVal));
    this.state.selectedVal = this.getClosestTo(this.state.arrayClosest, this.props.xVal);
    this.props.sendValueFromPoint(this.state.selectedVal);
    this.updateArrayClosest();
  }

  onLayout = (event: Object) => {
    // pull out width and height out of event.nativeEvent.layout
    const {
      nativeEvent: {
        layout: {
          width,
          height
        }
      }
    } = event;
    // update the state
    this.setState({
      width,
      height,
    });
  };
  getClosestTo(array, goal) {
    let selected = 10000;
    let obj;

    array.forEach((num) => {
      const diff = Math.abs(num.xPos - goal);

      if (diff < selected) {
        selected = diff;
        obj = num;
      }
    });

    return obj.yVal;
  }
  updateArrayClosest() {
    const {
      width,
    } = this.state;

    this.state.arrayClosest = [];
    // step between each value point on horizontal (x) axis
    const stepX = width / (this.props.stockData.length - 1 || 1);
    this.props.stockData.forEach((number, index) => {
    const x = index * stepX;
     this.state.arrayClosest = [...this.state.arrayClosest, { xPos: x, yVal: number }];
  });
//  console.log('Array: ', this.state.arrayClosest);
  }

  props: {
    xVal: number,
    fillColor: string,
    strokeColor: string,
    strokeWidth: number,
  };

  // Handle container view's onLayout event to get its width and height after rendered and
  // update the state so the component can render the chart using actual width and height


  buildPath = (): Path => {
    const {
      strokeWidth,
    } = this.props;
    const {
      width,
      height,
    } = this.state;

    let firstPoint: boolean = true;
    let previous: { x: number, y: number };

    const minValue = Math.min(...this.props.stockData);
    const maxValue = Math.max(...this.props.stockData) - minValue;
      // step between each value point on horizontal (x) axis
    const stepX = width / (this.props.stockData.length - 1 || 1);
      // step between each value point on vertical (y) axis
    const stepY = maxValue ? (height - (strokeWidth * 2)) / maxValue : 0;
      // adjust values so that min value becomes 0 and goes to the bottom edge
    const adjustedValues = this.props.stockData.map(value => value - minValue);

    const path = Path().moveTo(-strokeWidth, strokeWidth);
    // start from the left bottom corner so we could fill the area with color

    adjustedValues.forEach((number, index) => {
      const x = index * stepX;
      const y = (-number * stepY) - strokeWidth;

      if (firstPoint) {
        // straight line to the first point
        path.lineTo(-strokeWidth, y);
      } else {
        // make curved line
        path.curveTo(previous.x + (stepX / 3), previous.y, x - (stepX / 3), y, x, y);
      }
      // save current x and y coordinates for the next point
      previous = { x, y };
      firstPoint = false;
    });

    return path
      // line to the right bottom corner so we could fill the area with color
      .lineTo(width + strokeWidth, strokeWidth)
      .close();
  };

  render() {
    const {
      fillColor,
      strokeColor,
      strokeWidth,
      xVal
    } = this.props;
    const {
      width,
      height,
    } = this.state;
    return (
      <View
        style={styles.container}
        onLayout={this.onLayout}
      >

        <Surface width={width} height={height}>
          <Group x={0} y={height}>
            <Shape
              d={this.buildPath(this.props.stockData)}
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />

          </Group>
          <StraightLine xVal={xVal} />

        </Surface>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // align at the bottom of the container so when animated it rises to the top
    justifyContent: 'flex-end',
  },
});

function mapStateToProps(state) {
  return {
		filter: state.stockFilterReducer.filter,
		stockList: state.stockFilterReducer.stockList,
		stockData: state.stockFilterReducer.stockData
  };
}

export default connect(mapStateToProps, { sendValueFromPoint })(Line);
