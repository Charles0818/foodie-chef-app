import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { Section, Screen } from '../../Wrapper';
import { Form } from '../../../components';
import { styles, colors } from '../../styles';

const ConfirmEmail = ({ navigation, route: {params} }) => {
  return (
    <Screen>
      <Section style={[styles.flexCenter, styles.paddingHorizontal_md, {flex: 1}]}>
        <Ionicons name="ios-mail-unread" size={124} color="black" color={colors.color1} style={[styles.marginBottom_md]} />
        <Text style={[styles.heading, styles.font_lg]}>{params.message}</Text>
      </Section>
    </Screen>
  )
}

export default ConfirmEmail;
