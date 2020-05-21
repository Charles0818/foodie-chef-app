import React, { Component } from 'react';
import { View, Animated, StyleSheet, TextInput } from 'react-native';
import { string, func, object, number } from 'prop-types';

const FloatingTitleTextInput = (props) => {
  const { placeholder, value, onChange, err, icon, ...rest } = props
  const [isFieldActive, setIsFieldActive] = React.useState(false);
  const position = React.useRef(new Animated.Value(value ? 1 : 0)).current
  const handleFocus = React.useCallback(() => {
    if (!isFieldActive) {
      setIsFieldActive(true);
      Animated.timing(position, {
        toValue: 1,
        duration: 150,
      }).start();
    }
  }, [isFieldActive])

  const handleBlur = React.useCallback(() => {
    if (isFieldActive && !value) {
      setIsFieldActive(false);
      Animated.timing(position, {
        toValue: 0,
        duration: 150,
      }).start();
    }
  }, [isFieldActive])
  const returnAnimatedTitleStyles = () => {
    const {
      titleActiveColor, titleInactiveColor, titleActiveSize, titleInActiveSize
    } = props;
  
    return {
      top: position.interpolate({
        inputRange: [0, 1],
        outputRange: [14, 0],
      }),
      fontSize: isFieldActive ? titleActiveSize : titleInActiveSize,
    }
}
  return (
    <View style = {Styles.container}>
      <Animated.Text
        style = {[Styles.titleStyles, returnAnimatedTitleStyles()]}
      >
        {placeholder}
      </Animated.Text>
      <TextInput
        value = {value}
        style = {[Styles.textInput]}
        underlineColorAndroid = 'transparent'
        onFocus = {handleFocus}
        onBlur = {handleBlur}
        onChangeText = {onChange}
        {...rest}
      />
    </View>
  )
}

FloatingTitleTextInput.propTypes = {
  placeholder: string.isRequired,
  value: string.isRequired,
  onChange: func.isRequired,
  keyboardType: string,
  titleActiveSize: number, // to control size of title when field is active
  titleInActiveSize: number, // to control size of title when field is inactive
  titleActiveColor: string, // to control color of title when field is active
  titleInactiveColor: string, // to control color of title when field is active
}

FloatingTitleTextInput.defaultProps = {
  keyboardType: 'default',
  titleActiveSize: 8.5,
  titleInActiveSize: 15,
  titleActiveColor: 'grey',
  titleInactiveColor: 'dimgrey',
  textInputStyles: {}, 
  otherTextInputAttributes: {},
}
const Styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 3,
    borderStyle: 'solid',
    borderWidth: 0.5,
    height: 50,
    marginVertical: 4,
  },
  textInput: {
    fontSize: 15,
    marginTop: 5,
    color: 'black',
  },
  titleStyles: {
    position: 'absolute',
    left: 3,
    left: 4,
  }
})

export default FloatingTitleTextInput;