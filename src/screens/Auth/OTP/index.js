import React, { useState } from 'react';
import { View, Text, ImageBackground, Dimensions, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Screen, Section } from '../../Wrapper';
import { Form, Button, } from '../../../components';
import { styles, colors } from '../../styles';
import { actions } from '../../../helpers'
import { OtpFields } from './components';
const { authActions: { saveToken } } = actions;
const { FormInput2, useFormInput } = Form;
export default OTP = ({ navigation, route: { params } }) => {
  const [otpArray, setOtpArray] = useState(['', '', '', '']);
  const action = async () => {
    try {
      navigation.navigate('ResetPassword')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Screen>
      <View style={[styles.flexCenter, {flex: 1}]}>
        <Section>
          <View style={[styles.flexCenter]}>
            <MaterialCommunityIcons name="security" style={[styles.marginBottom_sm]} size={50} color={colors.color1} />
            <Text style={[styles.font_xlg, styles.heading, styles.marginBottom_sm]}>Verification</Text>
            <Text style={[styles.font_md, styles.text, styles.fontWeight_700, styles.marginBottom_md, styles.color_gray]}>
              Enter OTP code sent to {params.contact}
            </Text>
          </View>
          <View style={[styles.border_r_10, styles.boxShadow_md, styles.bg_white, styles.padding_md, styles.flexCenter, {height: 350, width: 350}]}>
            <OtpFields otpArray={otpArray} setOtpArray={setOtpArray} />
            <View style={[styles.marginTop_md]}>
              <Button action={action} style={[styles.padding_md,{width: 200, height: 50}, styles.flexCenter, styles.border_r_10, styles.bg_color1]}>
                <Text style={[styles.font_lg, styles.heading, styles.color_white]}>Continue</Text>
              </Button>
            </View>
          </View>
        </Section>
      </View>
    </Screen>
  )
}