import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import CreateService from './CreateService';
import AllServices from './AllServices';
import ServiceDetails from './ServiceDetails';
import { NavigationBars } from '../../components';
const CookBookStack = createStackNavigator();
const CookBook = () => {
  return (
    <CookBookStack.Navigator initialRouteName="AllServices" screenOptions={{
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}>
      <CookBookStack.Screen name="CreateService" component={CreateService} options={{
        headerTitle: 'Create Service'
      }} />
      <CookBookStack.Screen name="AllServices" component={AllServices} options={{
        headerTitle: 'All Services'
      }} />
      <CookBookStack.Screen name="ServiceDetails" component={ServiceDetails} options={{
        headerTitle: 'Pizza'
      }} />
    </CookBookStack.Navigator>
  )
}

export default CookBook;
