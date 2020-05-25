import React from 'react';
import { createStackNavigator, CardStyleInterpolators, HeaderBackButton } from '@react-navigation/stack';
import Settings from './Settings';
import Currencies from './Currencies';
import PrivacySettings from './Privacy';
import ProfileUpdate from './ProfileUpdate';
import VerificationProof from './VerificationProof';
import Languages from './Languages';
import NotificationSettings from './Notification';
import ChangePassword from './Password';
import PaymentMethod from './PaymentMethod';
import { NavigationBars } from '../../components'
const SettingsStack = createStackNavigator();
const SettingsStackScreen = ({navigation, route}) => {
 
  const navRoutes = navigation.dangerouslyGetParent();
  console.log('previous', navRoutes)
  return (
    <SettingsStack.Navigator initialRouteName="Settings" screenOptions={{
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}>
      <SettingsStack.Screen name="Settings" component={Settings} options={{
        headerLeft: () => <HeaderBackButton onPress={() => navigation.goBack()} />
      }}/>
      <SettingsStack.Screen name="Currencies" component={Currencies} />
      <SettingsStack.Screen name="PrivacySettings" component={PrivacySettings} options={{
        headerTitle: 'Privacy Settings'
      }} />
      <SettingsStack.Screen name="Languages" component={Languages} />
      <SettingsStack.Screen name="PaymentMethod" component={PaymentMethod} options={{
        headerTitle: 'Payment Method'
      }} />
      <SettingsStack.Screen name="ChangePassword" component={ChangePassword} />
      <SettingsStack.Screen name="NotificationSettings" component={NotificationSettings} options={{
        headerTitle: 'Notification Settings'
      }} />
      <SettingsStack.Screen name="ProfileUpdate" initialParams={{uploadedDocuments: []}} component={ProfileUpdate}
        options={{
          title: "Personal Information",
          headerTitleStyle: {
            fontSize: 16,
          },
          headerTitleAlign: 'center',
          headerRight: () => <NavigationBars.DrawerBar />
        }}/>
      <SettingsStack.Screen name="VerificationProof" component={VerificationProof}
        options={{
          title: "Personal Information",
          headerTitleStyle: {
            fontSize: 16,
          },
          headerTitleAlign: 'center',
          headerRight: () => <NavigationBars.DrawerBar />
        }}
      />
    </SettingsStack.Navigator>
  )
}

export default SettingsStackScreen;
