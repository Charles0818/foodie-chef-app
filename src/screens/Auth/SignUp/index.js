import React from 'react';
import { View, Text, ScrollView, ImageBackground, Dimensions, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Screen, Section } from '../../Wrapper';
import { Form, Button, Spinners, Utils } from '../../../components';
import { styles, colors } from '../../styles';
import { ajax, actions } from '../../../helpers';
const { FormInput2, useFormInput, useRadioPicker } = Form;
const { authActions: { signUpRequest } } = actions;
const { useSpinner, ButtonSpinner } = Spinners;
const { useAjaxStatus } = ajax
const { dataConstants: { accountType } } = Utils;
const SignUp = ({navigation: {navigate, replace}, signUpRequest}) => {
  const { Spinner, setAnimating } = ButtonSpinner();
  const { AjaxStatus, setAjaxStatus } = useAjaxStatus();
  const { selectedValue: type, Picker } = useRadioPicker(accountType)
  const { input: email, handleUserInput: setEmail, error: emailErr, isValid: emailIsValid,  } = useFormInput("email");
  const { input: password1, handleUserInput: setPassword1, error: password1Err } = useFormInput("password");
  const { input: password2, handleUserInput: setPassword2 } = useFormInput("password");
  const { input: first_name, handleUserInput: setFirstName, error: firstNameErr, isValid: firstNameIsValid } = useFormInput("first name");
  const { input: last_name, handleUserInput: setLastName, error: lastNameErr, isValid: lastNameIsValid } = useFormInput("last name");
  const { input: phone_number, handleUserInput: setPhone, error: phoneErr, isValid: phoneIsValid } = useFormInput("phone");
  const validatePassword = password1 !== password2 ? 'Passwords do not match' : '';
  const validateAllField = emailIsValid && password1 === password2 &&
    firstNameIsValid && lastNameIsValid && phoneIsValid;
  console.log(validateAllField);
  const handleSignUp = () => signUpRequest(
    {email, password1, password2, first_name, last_name, phone_number, type},
    setAnimating, setAjaxStatus, replace
  )
  return (
  <Screen>
    <ImageBackground
       source={require("../../../assets/chef.jpg")}
      style={[{ flex: 1 }]}>
      <ScrollView contentContainerStyle={[styles.flexCenter,]} style={[styles.bg_darkOpacity, { flex: 1 }]}>
        <View style={[formStyles.screenContainer]}>
          <View style={[styles.flexCenter, styles.marginBottom_lg]}>
            <Text numberOfLines={1} style={[styles.font_xlg, styles.fontWeight_700, styles.color_white, styles.marginBottom_md, styles.marginTop_lg]}>Cuisino</Text>
            <Text numberOfLines={1} style={[styles.color2, styles.font_sm]}>Register with your email to get started.</Text>
          </View>
          <View style={[styles.marginBottom_sm]}>
            <FormInput2 icon={"user"} value={first_name} onChange={setFirstName}
              err={firstNameErr} placeholder="First name" textContentType="name" />
            <FormInput2 icon={"user"} value={last_name} onChange={setLastName}
              err={lastNameErr} placeholder="Last name" textContentType="name"/>
            <FormInput2 icon={"at"} value={email} onChange={setEmail} err={emailErr}
              placeholder="Email Address" keyboardType="email-address" textContentType="emailAddress" />
            <FormInput2 icon={"phone"} iconLibrary={AntDesign} value={phone_number}
              onChange={setPhone} err={phoneErr} placeholder="Phone Number"
              keyboardType="phone-pad" textContentType="telephoneNumber" />
            <Picker />
            <FormInput2 icon={"lock"} value={password1} onChange={setPassword1}
              err={password1Err} placeholder="Password" textContentType="newPassword"
              secureTextEntry={true} />
            <FormInput2 icon={"lock"} value={password2} onChange={setPassword2}
              err={validatePassword} placeholder="Password Confirmation"
              secureTextEntry={true} />
            <Button action={handleSignUp} buttonProps={{disabled: !validateAllField}}
              style={[styles.row, styles.alignItems_center, styles.bg_color1, styles.flexCenter, { height: 50, width: '100%' }]}>
              <Text numberOfLines={1} style={[styles.font_md, styles.color_white, styles.fontWeight_700, styles.text_center, styles.marginRight_md]}>SIGN UP</Text>
              {Spinner}
            </Button>
          </View>
          <Button action={() => navigate("LoginOptions")}>
            <Text numberOfLines={1} style={[styles.color_white, styles.font_md, styles.text_center, styles.fontWeight_700]}>Go back to login options</Text>
          </Button>
        </View>
      </ScrollView>
    </ImageBackground>
    <AjaxStatus />
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

const mapDispatchToProps = dispatch => 
  bindActionCreators({ signUpRequest }, dispatch);

export default connect(null, mapDispatchToProps)(SignUp);