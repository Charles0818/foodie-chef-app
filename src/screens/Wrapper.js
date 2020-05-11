import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PropTypes from 'prop-types'
import { styles } from './styles';
export const Screen = ({children, style}) => {
  return (
    <SafeAreaView style={[styles.screen, style ? style : null]}>
      {children}
    </SafeAreaView>
  )
}

export const Section = ({children, style, ...rest}) => {
  return (
    <View {...rest} style={[styles.paddingHorizontal_sm, styles.marginBottom_md, style ? style : null]}>{children}</View>
  )
};

Screen.propTypes = {
  style: PropTypes.array
}
Screen.propTypesDefault = {
  style: [],
}

Section.propTypes = {
  style: PropTypes.array
}
Section.propTypesDefault = {
  style: [],
}