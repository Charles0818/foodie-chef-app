import * as React from 'react';
import { View, Text } from 'react-native';
import { Section, Screen } from '../../Wrapper';
import { styles, colors } from '../../styles';
const Languages = () => {
  return (
    <Screen style={[styles.flexCenter]}>
      <Text>Available Languages</Text>
    </Screen>
  )
}

export default Languages;
