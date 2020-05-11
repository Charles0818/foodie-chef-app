import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Settings from './Settings';
import Currencies from './Currencies';
import PrivacySettings from './PrivacySettings';
import ProfileUpdate from './ProfileUpdate';
import VerificationProof from './VerificationProof';
import Languages from './Languages';
import { NavigationBars } from '../../components'
const SettingsStack = createStackNavigator();
const SettingsStackScreen = () => {
  return (
    <SettingsStack.Navigator initilRouteName="Settings" screenOptions={{
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}>
      <SettingsStack.Screen name="Settings" component={Settings} />
      <SettingsStack.Screen name="Currencies" component={Currencies} />
      <SettingsStack.Screen name="PrivacySettings" component={PrivacySettings} />
      <SettingsStack.Screen name="Languages" component={Languages} />
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
