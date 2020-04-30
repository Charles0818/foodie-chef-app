import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Screen, Section } from '../Wrapper';
import { useFormInput, Store } from '../../helpers/index';
import { Form } from '../../components';
import styles, { colors } from '../../styles/index'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const { actions: { authActions: { signInRequest } } } = Store;
const { FormInput } = Form;
const Login = ({navigation, route: { params }, signInRequest}) => {

  const { input: email, handleUserInput: setEmail, error: emailErr, isValid: emailIsValid } = useFormInput("email");
  const { input: password, handleUserInput: setPassword, error: passwordErr, isValid: passIsValid,  } = useFormInput("password");
  const validateFields = emailIsValid && passIsValid
  return (
    <Screen style={[styles.paddingTop_lg, styles.paddingHorizontal_md]}>
      <Section style={[{flex: 1}]}>
        <FormInput label="Email" value={email} onChange={setEmail} err={emailErr} placeholder="Your email address" autoCompleteType="email" keyboardType="email-address" />
        <FormInput label="Password" value={password} onChange={setPassword} err={passwordErr} placeholder="Password" autoCompleteType="password" />
        <View style={[styles.row, styles.justifyContent_end, styles.marginBottom_md]}>
          <Text style={[styles.uppercase, styles.color_primary, styles.font_sm, styles.fontWeight_bold]}>forgot password</Text>
        </View>
        <View style={[styles.row, styles.alignItems_center]}>
          <Text style={[styles.color_primary, styles.font_sm, styles.fontWeight_bold, styles.marginRight_sm]}>Don't have an account ?</Text>
          <View style={[]} onPress={() => navigation.navigate("SignUp")}>
            <Text style={[styles.color1, styles.font_md, styles.fontWeight_bold, styles.marginRight_sm]}>sign up</Text>
          </View>
        </View>
        <View style={[formStyles.buttonWrapper]}>
        <LoginButton navigation={navigation} isValid={validateFields} params={params} action={signInRequest} data={{email, password}} />
        </View>
      </Section>

    </Screen>
  )
}

const LoginButton = ({navigation, isValid, params, action, data}) => {
  const popAction = StackActions.pop(1);
  console.log(params);
  const handleLogin = () => { 
    action(data);
    params.redirectedBack ? (
      navigation.dispatch(popAction)
    ) : null
  }
  return (
    <View style={{width: 300, opacity: isValid ? 1 : 0.6}}>
      <TouchableNativeFeedback disabled={!isValid} onPress={handleLogin} background={TouchableNativeFeedback.Ripple('#a0a0a0', false)}>
        <View style={[styles.row, styles.padding_md, styles.bg_color1, styles.flexCenter, styles.border_r_5]}>
          <Text numberOfLines={1} style={[styles.color_white, styles.font_md, styles.fontWeight_bold]}>LOGIN</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  )
}

const formStyles = StyleSheet.create({
  buttonWrapper: {
    flex:1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    // marginBottom: 36,
  }
})

const mapDispatchToProps = dispatch => 
  bindActionCreators({ signInRequest }, dispatch);

  export default connect(null, mapDispatchToProps)(Login);