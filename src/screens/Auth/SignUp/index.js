import React from 'react';
import { View, Text, ImageBackground, Dimensions, StyleSheet } from 'react-native';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Screen, Section } from '../../Wrapper';
import { Form, Button, Spinners} from '../../../components';
import { styles, colors } from '../../styles';
import { ajax, actions } from '../../../helpers';
const { FormInput2, useFormInput } = Form;
const { authActions: { signUpRequest } } = actions;
const { useSpinner, ButtonSpinner } = Spinners;
const { useAjaxStatus } = ajax
const SignUp = ({navigation, signUpRequest}) => {
  const { Spinner, setAnimating } = ButtonSpinner();
  const { AjaxStatus, setAjaxStatus } = useAjaxStatus();
  const { input: email, handleUserInput: setEmail, error: emailErr, isValid: emailIsValid,  } = useFormInput("email");
  const { input: password, handleUserInput: setPassword, error: passwordErr } = useFormInput("password");
  const { input: password2, handleUserInput: setPassword2 } = useFormInput("password");
  const { input: name, handleUserInput: setName, error: nameErr, isValid: nameIsValid } = useFormInput("name");
  const validatePassword = password !== password2 ? 'Passwords do not match' : '';
  const validateAllField = emailIsValid && password === password2 && nameIsValid;
  console.log(validateAllField);
  const handleSignUp = () => signUpRequest({email, password, name}, setAnimating, setAjaxStatus)
  return (
  <Screen>
    <ImageBackground
       source={require("../../../assets/chef.jpg")}
      style={[{ flex: 1 }]}>
      <View style={[styles.bg_darkOpacity, styles.flexCenter, { flex: 1 }]}>
        <View style={[formStyles.screenContainer]}>
          <View style={[styles.flexCenter, styles.marginBottom_lg]}>
            <Text numberOfLines={1} style={[styles.font_xlg, styles.fontWeight_700, styles.color_white, styles.marginBottom_md]}>Cuisino</Text>
            <Text numberOfLines={1} style={[styles.color2, styles.font_sm]}>Register with your email to get started.</Text>
          </View>
          <View style={[styles.marginBottom_sm]}>
            <FormInput2 icon={"user"} value={name} onChange={setName} err={nameErr} placeholder="Full Name" textContentType="name" />
            <FormInput2 icon={"at"} value={email} onChange={setEmail} err={emailErr} placeholder="Email Address" keyboardType="email-address" textContentType="emailAddress" />
            <FormInput2 icon={"lock"} value={password} onChange={setPassword} err={passwordErr} placeholder="Password" textContentType="newPassword" />
            <FormInput2 icon={"lock"} value={password2} onChange={setPassword2} err={validatePassword} placeholder="Password Confirmation" />
            <Button action={handleSignUp} buttonProps={{disabled: !validateAllField}}
              style={[styles.row, styles.alignItems_center, styles.bg_color1, styles.flexCenter, { height: 50, width: '100%' }]}>
              <Text numberOfLines={1} style={[styles.font_md, styles.color_white, styles.fontWeight_700, styles.text_center, styles.marginRight_md]}>SIGN UP</Text>
              {Spinner}
            </Button>
          </View>
          <Button action={() => navigation.navigate("LoginOptions")}>
            <Text numberOfLines={1} style={[styles.color_white, styles.font_md, styles.text_center, styles.fontWeight_700]}>Go back to login options</Text>
           
          </Button>
        </View>
      </View>
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