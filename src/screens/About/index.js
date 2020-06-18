import * as React from 'react';
import { View, Text } from 'react-native'
import { Screen, Section } from '../Wrapper';
import { styles } from '../styles';

export default AboutUs = () => {
  return (
    <Screen style={[styles.flexCenter]}>
      <Text>About Us</Text>
    </Screen>
  )
}