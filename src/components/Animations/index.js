import React, { useState, useEffect } from 'react';
import { Animated } from 'react-native';

export const ScaleToSize = ({style, children, ...rest}) => {
  const [x] = useState(new Animated.Value(0));
  useEffect(() => {
    Animated.timing(x, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [x]);
  return (
    <Animated.View style={[...style, {transform: [{ scale: x }]} ]} {...rest}>
      {children}
    </Animated.View>
  );
};

export const FadeIn = ({style, children, ...rest}) => {
  const [x] = useState(new Animated.Value(0));
  useEffect(() => {
    Animated.timing(x, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [x]);
  return (
    <Animated.View style={[...style, {transform: [{ scale: x }], opacity: x} ]} {...rest} >
      {children}
    </Animated.View>
  );
};
