import React, { useState, useEffect } from 'react';
import { Animated, View } from 'react-native';

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

{/* <View style={{transform: [{scaleY}]}} ></View> */}

export const FadeIn = ({style, children, shouldAnimate = false, ...rest}) => {
  const [x] = useState(new Animated.Value(0));
  const [animate, setAnimate] = useState(shouldAnimate);
  useEffect(() => {
    Animated.timing(x, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, [x, shouldAnimate]);
  return (
    <Animated.View style={[...style, {transform: [{ scale: x }], opacity: x} ]} {...rest} >
      {children}
    </Animated.View>
  );
};
