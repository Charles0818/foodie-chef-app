import React from 'react';
import {
  View, StyleSheet, TouchableNativeFeedback, TouchableWithoutFeedback,
  UIManager, LayoutAnimation, TouchableOpacity, Platform
} from 'react-native';
import PropTypes from 'prop-types';
import { colors, styles } from '../styles';
export const Button = ({ activeOpacity = .8, rippleColor, buttonProps = {} , action = () => console.log('button clicked'), children, style }) => {
 
  switch(Platform.OS) {
    case "ios": {
      return (
        <TouchableOpacity
          style={style}
          delayPressIn={0}
          delayPressOut={0}
          activeOpacity={activeOpacity}
          onPress={action}
          {...buttonProps} >
          {children}
        </TouchableOpacity>
      )
    }
    case "android": {
      return (
        <TouchableNativeFeedback
          delayPressIn={0}
          delayPressOut={0}
          background={TouchableNativeFeedback.Ripple(rippleColor, false)}
          onPress={action}
          {...buttonProps} >
          <View style={[style, {overflow: 'hidden'}]}>
            {children}
          </View>
        </TouchableNativeFeedback>
      )
    }
    default:
    return (
      <TouchableOpacity {...buttonProps} activeOpacity={activeOpacity} onPress={action}>
        <View>
          {Children}
        </View>
      </TouchableOpacity>
    )
  }
}

Button.propTypes =  {
  action: PropTypes.func.isRequired,
  rippleColor: PropTypes.string,
  activeOpacity: PropTypes.number,
  style: PropTypes.array,
}

Button.defaultPropTypes = {
  rippleColor: "#a0a0a0",
  activeOpacity: 0.9,
  style: [],
  action: () => console.log('action fired')
}

const SwitchButton = ({isActive, setIsActive}) => {
  return (
    <TouchableWithoutFeedback onPress={setIsActive}>
      <View style={[toggleStyle.viewToggle, 
        !isActive ? {backgroundColor: colors.gray_color} : { backgroundColor: colors.google_green,  alignItems: 'flex-end'}]}>
        <View style={toggleStyle.circleToggle}></View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export const useToggleButton = (value) => {
  const [isActive, setIsActive] = React.useState(value ? value : false);
  const handleChange = () => {
    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    setIsActive(prev => !prev )
  }
  const ToggleButton = <SwitchButton setIsActive={handleChange} isActive={isActive} />
  return { isActive, handleChange, ToggleButton }
}

const toggleStyle = StyleSheet.create({
  viewToggle: {
    height: 27,
    width: 55,
    borderRadius: 20,
    justifyContent: 'center',
    paddingRight: 3,
  },
  circleToggle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff'
  }
})
