import React, { Component } from 'react';
import { View, Text, Animated, StyleSheet, TextInput } from 'react-native';
import { string, func, object, number } from 'prop-types';
import { styles, colors } from '../../styles';

export default FormInput = React.memo(({label, value, onChange, err, textInputStyles = [], ...rest }) => {
  const [isFieldActive, setIsFieldActive] = React.useState(false);
  const position = React.useRef(new Animated.Value(value ? 1 : 0)).current
  const handleFocus = () => {
    if (!isFieldActive) {
      setIsFieldActive(true);
      Animated.timing(position, {
        toValue: 1,
        duration: 150,
      }).start();
    }
  }

  const handleBlur = () => {
    if (isFieldActive && !value) {
      setIsFieldActive(false);
      Animated.timing(position, {
        toValue: 0,
        duration: 150,
      }).start();
    }
  }
  const returnAnimatedTitleStyles = () => {
    return [
      {
        top: position.interpolate({
          inputRange: [0, 1],
          outputRange: [14, 0],
        })
      },
      isFieldActive || value ? styles.font_xsm : styles.font_md,
    ]
  }
  React.useEffect(() => {
    returnAnimatedTitleStyles()
  }, [value])
  return (
    <View style={[styles.marginBottom_sm]}>
      <View style = {[inputStyles.container, styles.bg_white, styles.slimBorderBottom, styles.fontWeight_bold]}>
        <Animated.Text
          style = {[inputStyles.titleStyles, styles.fontWeight_700, styles.color_gray, ...returnAnimatedTitleStyles()]}
        > 
          {label}
        </Animated.Text>
        <TextInput
          value = {value}
          style = {[inputStyles.textInput, styles.marginBottom_xsm, ...textInputStyles]}
          underlineColorAndroid = 'transparent'
          onFocus = {handleFocus}
          onBlur = {handleBlur}
          onChangeText={text => onChange(text)}
          value={value}
          {...rest}
        />
      </View>  
      <Text style={[styles.color_danger, styles.font_sm]}>{err}</Text>  
    </View>
  )
}, (prev, next) => prev.value !== next.value)

const inputStyles = StyleSheet.create({
  container: {
    width: '100%',
    borderStyle: 'solid',
    borderLeftColor: colors.color1,
    borderLeftWidth: 5,
    paddingLeft: 5,
  },
  textInput: {
    fontSize: 15,
    marginTop: 16,
    color: 'black',
  },
  titleStyles: {
    position: 'absolute',
    left: 4,
  }
})