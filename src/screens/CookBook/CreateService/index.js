import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Screen, Section } from '../../Wrapper';
import { Cards, Button }  from '../../../components';
import { styles, colors } from '../../styles';
const CreateService = () => {
  return (
    <Screen style={[styles.flexCenter]}>
      <Text>Create Service</Text>
    </Screen>
  )
}

export default CreateService;