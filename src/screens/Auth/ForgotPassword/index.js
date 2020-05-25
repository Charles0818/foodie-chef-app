import React from 'react';
import { View, Text, ImageBackground, Dimensions, StyleSheet } from 'react-native';
import { Screen, Section } from '../../Wrapper';
import { MaterialIcons } from '@expo/vector-icons';
import { Form, Button, } from '../../../components';
import { styles, colors } from '../../styles';
import { actions } from '../../../helpers'

const { authActions: { saveToken } } = actions;
const { FormInput2, useFormInput } = Form;
export default ForgotPassword = ({navigation}) => {
  const { input, handleUserInput, error, isValid  } = useFormInput("Email/mobile");

  return (
    <Screen>
      <View style={[styles.flexCenter, {flex: 1}]}>
        <Section>
          <View style={[styles.flexCenter]}>
            <Text style={[styles.font_xlg, styles.heading, styles.marginBottom_sm,]}>Forgot Password</Text>
            <Text style={[styles.font_sm, styles.fontWeight_700, styles.text, styles.marginBottom_sm, styles.text_center, styles.color_gray]}>
              Please enter your email/mobile & we will send an OTP to verify your ownership
            </Text>
          </View>
          <FormInput2 value={input} icon="mail-outline" iconLibrary={MaterialIcons} onChange={handleUserInput} err={error} placeholder="Email/mobile" />
          <View style={[styles.marginTop_sm]}>
            <Button action={() => navigation.navigate("OTP", {contact: input})}
              style={[styles.padding_md, styles.flexCenter, styles.border_r_5, styles.bg_color1, {height: 50}]}>
              <Text style={[styles.font_lg, styles.heading, styles.color_white]}>Send</Text>
            </Button>
          </View>
        </Section>
      </View>
    </Screen>
  )
}