import React from 'react';
import { View, SafeAreaView } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
import PropTypes from 'prop-types'
import { styles } from './styles';
import { ErrorBoundary, useNetworkState } from '../components';
import { NetworkError } from './NetworkError';
export const Screen = ({children, style}) => {
  // const { isConnected } = useNetworkState();
  // if(!isConnected) return <NetworkError />
  return (
    <SafeAreaView style={[styles.screen, style ? style : null]}>
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </SafeAreaView>
  )
}

export const Section = ({children, style, ...rest}) => {
  return (
    <View {...rest} style={[styles.paddingHorizontal_sm, styles.marginBottom_md, style ? style : null]}>{children}</View>
  )
};

export const NetworkInfo = ({ children }) => {
  const { isConnected } = useNetworkState();
  if(!isConnected) return <NetworkError />
  return children
}

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