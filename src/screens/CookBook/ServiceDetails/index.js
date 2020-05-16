import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Screen, Section } from '../../Wrapper';
import { Cards, Button }  from '../../../components';
import { styles, colors } from '../../styles';
const ServiceDetails = ({ navigation, route: { params } }) => {
  const { service } = params;
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: service.name
    })
  })
  return (
    <Screen style={[styles.flexCenter]}>
      <Text>Service Details</Text>
    </Screen>
  )
}

export default ServiceDetails;