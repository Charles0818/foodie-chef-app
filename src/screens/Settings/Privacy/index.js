import * as React from 'react';
import { View, Text } from 'react-native';
import { Section, Screen } from '../../Wrapper';
import { styles, colors } from '../../styles';
const PrivacySettings = () => {
  return (
    <Screen style={[styles.flexCenter]}>
      <Text>Privacy Settings</Text>
    </Screen>
  )
}

export default PrivacySettings;
