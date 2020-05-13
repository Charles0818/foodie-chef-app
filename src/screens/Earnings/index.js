import React from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Transactions from './Transactions';
import Wallet from './Wallet';
import { colors, styles } from '../styles'
const EarningsStack = createStackNavigator();
export default EarningsStackScreen = ({navigation}) => {
    React.useEffect(() => {
      const navlistener = navigation.addListener('didFocus', () => {
        StatusBar.setBarStyle('light-content', true);
      StatusBar.setBackgroundColor(colors.color1, true);
    });
    return () => navigation.removeListener(navlistener)
  }, [])
  return (
    <EarningsStack.Navigator initialRouteName="Wallet" screenOptions={{
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}>
      <EarningsStack.Screen name="Wallet" component={Wallet} options={{
        headerShown: false,
      }} />
      <EarningsStack.Screen name="Transactions" component={Transactions} options={{
        headerStatusBarHeight: 80,
        headerStyle: [{backgroundColor: colors.color1,}],
        headerTitleStyle: {color: colors.white, fontSize: 24},
        headerTitleAllowFontScaling: true,
        headerBackTitleStyle: colors.white,
      }} />
    </EarningsStack.Navigator>
  )
}

