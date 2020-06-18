import React from 'react';
import { View, Text, ImageBackground, Dimensions, StyleSheet } from 'react-native';
import { Screen, Section } from '../../Wrapper';
import { Form, Button, } from '../../../components';
import { styles, colors } from '../../styles';
import { actions } from '../../../helpers'

const { authActions: { saveToken } } = actions;
const { FormInput2, useFormInput } = Form;
export default ResetPassword = () => {
  const { input: password, handleUserInput: setPassword, error: passwordErr } = useFormInput("password");
  const { input: password2, handleUserInput: setPassword2 } = useFormInput("password");
  const validatePassword = password !== password2 ? 'Passwords do not match' : '';
  const validateAllField = password === password2 
  return (
    <Screen>
      <View style={[styles.flexCenter, {flex: 1}]}>
        <Section>
          <View style={[styles.flexCenter]}>
            <Text style={[styles.font_xlg, styles.fontWeight_700, styles.marginBottom_xsm]}>Reset Password</Text>
            <Text style={[styles.font_md, styles.fontWeight_700, styles.text_center, styles.marginBottom_sm, styles.color_gray]}>
              Please choose a secure password you can remember
            </Text>
          </View>
          <FormInput2 icon={"lock"} value={password} onChange={setPassword} err={passwordErr} placeholder="Password" textContentType="newPassword" />
          <FormInput2 icon={"lock"} value={password2} onChange={setPassword2} err={validatePassword} placeholder="Password Confirmation" />
          <View style={[styles.marginTop_sm]}>
            <Button style={[styles.padding_md, styles.flexCenter, styles.border_r_5, styles.bg_color1, {height: 50}]}>
              <Text style={[styles.font_md, styles.fontWeight_700, styles.color_white]}>Reset Password</Text>
            </Button>
          </View>
        </Section>
      </View>
    </Screen>
  )
}