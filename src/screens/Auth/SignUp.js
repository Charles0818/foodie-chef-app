import React from 'react';
import { View, Text, ImageBackground, Dimensions, StyleSheet } from 'react-native';
import { Screen, Section } from '../Wrapper';
import { Form, Button, } from '../../components';
import { styles, colors } from '../styles';

const { FormInput2, useFormInput } = Form;
const SignUp = ({navigation}) => {
  const handleSignUp = () => {
    console.log('clicked')
  }
  const { input: email, handleUserInput: setEmail, error: emailErr, isValid: emailIsValid,  } = useFormInput("email");
  const { input: password, handleUserInput: setPassword, error: passwordErr } = useFormInput("password");
  const { input: password2, handleUserInput: setPassword2 } = useFormInput("password");
  const { input: name, handleUserInput: setName, error: nameErr, isValid: nameIsValid } = useFormInput("name");
  const validatePassword = password !== password2 ? 'Passwords do not match' : '';
  const validateAllField = emailIsValid && password === password2 && nameIsValid;
  console.log(validateAllField)
  return (
  <Screen>
    <ImageBackground
       source={require("../../assets/chef.jpg")}
      style={[{ flex: 1 }]}>
      <View style={[styles.bg_darkOpacity, styles.flexCenter, { flex: 1 }]}>
        <View style={[formStyles.screenContainer]}>
          <View style={[styles.flexCenter, styles.marginBottom_lg]}>
            <Text numberOfLines={1} style={[styles.font_xlg, styles.fontWeight_700, styles.color_white, styles.marginBottom_md]}>Cuisino</Text>
            <Text numberOfLines={1} style={[styles.color2, styles.font_sm]}>Register with your email to get started.</Text>
          </View>
          <View style={[styles.marginBottom_sm]}>
            <FormInput2 icon={"user"} value={name} onChange={setName} err={nameErr} placeholder="Full Name" />
            <FormInput2 icon={"at"} value={email} onChange={setEmail} err={emailErr} placeholder="Email Address" keyboardType="email-address" />
            <FormInput2 icon={"lock"} value={password} onChange={setPassword} err={passwordErr} placeholder="Password" />
            <FormInput2 icon={"lock"} value={password2} onChange={setPassword2} err={validatePassword} placeholder="Password Confirmation" />
            <Button action={() => navigation.navigate("Home", {screen: 'MyCook'})}
              style={[styles.bg_danger, styles.flexCenter, { height: 50, width: '100%' }]}>
              <Text numberOfLines={1} style={[styles.font_md, styles.color_white, styles.fontWeight_700, styles.text_center]}>SIGN UP</Text>
            </Button>
          </View>
          <Button action={() => navigation.navigate("LoginOptions")}>
            <Text numberOfLines={1} style={[styles.color_white, styles.font_md, styles.text_center, styles.fontWeight_700]}>Go back to login options</Text>
          </Button>
        </View>
      </View>
    </ImageBackground>
  </Screen>
  )
}

const formStyles = StyleSheet.create({
  buttonWrapper: {
    flex:1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  screenContainer: {
    width: Dimensions.get('window').width - 100
  }
})

export default SignUp;