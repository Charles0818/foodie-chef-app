import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import ConfirmEmail from './ConfirmEmail';
import Login from './Login';
import SignUp from './SignUp';
import LoginOptions from './LoginOptions';
const Auth = createStackNavigator();

const AuthStack = () => {
  return (
    <Auth.Navigator initialRouteName="LoginOptions" screenOptions={{
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}>
      <Auth.Screen
        name="LoginOptions"
        component={LoginOptions}
        options={{
          headerShown: false,
        }}
      />
      <Auth.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Auth.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerShown: false,
        }}
      />
      <Auth.Screen
        name="ConfirmEmail"
        component={ConfirmEmail}
        options={{
          headerShown: false,
        }}
      />
    </Auth.Navigator>
  )
}

export default AuthStack;
