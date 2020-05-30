import React from 'react';
import { View, Text, ImageBackground, Dimensions, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Screen, Section } from '../../Wrapper';
import { Form, Button, Spinners} from '../../../components';
import { styles, colors } from '../../styles';
import { ajax, actions } from '../../../helpers'

const { authActions: { saveToken, signInRequest } } = actions;
const { FormInput2, useFormInput } = Form;
const { useSpinner, ButtonSpinner } = Spinners;
const { useAjaxStatus } = ajax
const Login = ({navigation: { navigate, replace }, signInRequest}) => {
  const { setAjaxStatus, AjaxStatus } = useAjaxStatus();
  const { setAnimating, Spinner, animating } = ButtonSpinner()
  const { input: email, handleUserInput: setEmail, error: emailErr, isValid: emailIsValid,  } = useFormInput("email");
  const { input: password, handleUserInput: setPassword, error: passwordErr, isValid: passwordIsValid } = useFormInput("password ");
  const validateAllField = emailIsValid && passwordIsValid;
  const handleLogin = () => {
    const goHome = () => navigate("Drawer", {screen: 'Home'})
    signInRequest({email, password}, setAnimating, setAjaxStatus, goHome)
    // saveToken('token');
    // navigation.replace("Drawer", {screen: 'Home'})
  }
  return (
  <Screen>
    <ImageBackground
       source={require("../../../assets/chef.jpg")}
      style={[{ flex: 1 }]}>
      <View style={[styles.bg_darkOpacity, styles.flexCenter, { flex: 1 }]}>
        <View style={[formStyles.screenContainer]}>
          <View style={[styles.flexCenter, styles.marginBottom_lg]}>
            <Text numberOfLines={1} style={[styles.font_xlg, styles.fontWeight_700, styles.color_white, styles.marginBottom_md]}>Cuisino</Text>
            <Text numberOfLines={1} style={[styles.color2, styles.font_sm]}>Login your account.</Text>
          </View>
          <View style={[styles.marginBottom_sm]}>
            <FormInput2 icon={"at"} value={email} onChange={setEmail} err={emailErr} placeholder="Email Address" keyboardType="email-address" textContentType="emailAddress" />
            <FormInput2 icon={"lock"} value={password} onChange={setPassword} err={passwordErr} placeholder="Password" textContentType="password" secureTextEntry={true} />
            <Button action={handleLogin} buttonProps={{disabled: !validateAllField || animating}}
              style={[styles.row, styles.alignItems_center, styles.bg_danger, styles.flexCenter, { height: 50, width: '100%' }]}>
              <Text numberOfLines={1} style={[styles.font_md, styles.color_white, styles.fontWeight_700, styles.text_center, styles.marginRight_md]}>LOGIN</Text>
              {Spinner}
            </Button>
          </View>
          <Button action={() => navigate("ForgotPassword")}>
            <Text numberOfLines={1} style={[styles.color_white, styles.font_md, styles.text_center, styles.fontWeight_700, styles.marginBottom_sm]}>Forgot Password ?</Text>
          </Button>
          <Button action={() => navigate("LoginOptions")}>
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
  bindActionCreators({ signInRequest }, dispatch);

export default connect(null, mapDispatchToProps)(Login);