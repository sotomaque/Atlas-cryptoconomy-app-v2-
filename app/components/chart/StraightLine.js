import React from 'react';
import {
} from 'react-native';
import {
  Path,
  Group,
  Shape
} from 'react-native/Libraries/ART/ReactNativeART';

 const StraightLine = ({ xVal = 100 }) => {
    const path = Path()
              .moveTo(xVal, 0)
              .lineTo(xVal, 650)
              .close();
              
    return (
        <Group
          width={500}
          height={500}
        >
          <Shape d={path} stroke="#000" strokeWidth={0.75} />
        </Group>
    );
};

export { StraightLine };
