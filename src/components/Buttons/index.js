import React from 'react';
import { View, TouchableNativeFeedback, TouchableOpacity, Platform } from 'react-native';
import PropTypes from 'prop-types';
const Button = ({ activeOpacity, rippleColor, action, children, style }) => {
  
  switch(Platform.OS) {
    case "ios": {
      return (
        <TouchableOpacity activeOpacity={activeOpacity} onPress={action}>
          <View style={style}>
            {children}
          </View>
        </TouchableOpacity>
      )
    }
    case "android": {
      return (
        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(rippleColor, false)} onPress={action}>
          <View style={style}>
            {children}
          </View>
        </TouchableNativeFeedback>
      )
    }
    default:
    return (
      <TouchableOpacity activeOpacity={activeOpacity} onPress={action}>
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
  activeOpacity: 0.6,
  style: []
}

export default Button;
