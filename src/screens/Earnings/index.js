import React from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator, CardStyleInterpolators, HeaderBackButton } from '@react-navigation/stack';
import Transactions from './Transactions';
import Wallet from './Wallet';
import Rewards from './Rewards';
import { colors, styles } from '../styles'
const EarningsStack = createStackNavigator();
export default EarningsStackScreen = ({navigation}) => {
  return (
    <EarningsStack.Navigator initialRouteName="Wallet" screenOptions={{
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}>
      <EarningsStack.Screen name="Wallet" component={Wallet} options={{
        headerTitle: 'Dashboard'
      }} />
      <EarningsStack.Screen name="Rewards" component={Rewards}  />
      <EarningsStack.Screen name="Transactions" component={Transactions} options={{
        headerStatusBarHeight: 80,
        headerStyle: [{backgroundColor: colors.color1,}],
        headerTitleStyle: {color: colors.white, fontSize: 24},
        headerTitleAllowFontScaling: true,
        headerTintColor: colors.white,
      }} />
    </EarningsStack.Navigator>
  )
}

