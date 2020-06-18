import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import ConfirmEmail from './ConfirmEmail';
import Login from './Login';
import SignUp from './SignUp';
import LoginOptions from './LoginOptions';
import ForgotPassword from './ForgotPassword';
import OTP from './OTP';
import ResetPassword from './ResetPassword';
const Auth = createStackNavigator();

const AuthStack = () => {
  return (
    <Auth.Navigator initialRouteName="LoginOptions" screenOptions={{
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      headerShown: false,
    }}>
      <Auth.Screen
        name="LoginOptions"
        component={LoginOptions}
      />
      <Auth.Screen
        name="Login"
        component={Login}
      />
      <Auth.Screen
        name="SignUp"
        component={SignUp}
      />
      <Auth.Screen
        name="ConfirmEmail"
        component={ConfirmEmail}
      />
      <Auth.Screen
        name="OTP"
        component={OTP}
      />
      <Auth.Screen
        name="ForgotPassword"
        component={ForgotPassword}
      />
      <Auth.Screen
        name="ResetPassword"
        component={ResetPassword}
      />
    </Auth.Navigator>
  )
}

export default AuthStack;
