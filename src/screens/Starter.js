import React from 'react';
import { View, Text } from 'react-native';
import { Screen } from './Wrapper';
import styles from '../styles';
const Starter = () => {
  return (
    <Screen style={[styles.flexCenter]}>
      <View style={[]}>
        <Text style={[styles.font_lg, styles.fontWeight_700, styles.color1]}>CUISINGO LOGO</Text>
      </View>
    </Screen>
  )
}

export default Starter;
