import React from 'react';
import { Path, Group, Shape } from 'react-native/Libraries/ART/ReactNativeART';

const StraightLine = ({
  xVal = 100,
}) => {
  const path = Path()
    .moveTo(xVal, 0)
    .lineTo(xVal, 650)
    .close();

  return (
    <Group width={500} height={500}>
      <Shape d={path} stroke="#85C1E9" strokeWidth={1} />
    </Group>
  );
};

export { StraightLine };
