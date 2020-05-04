import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Settings from './Settings';
import Currencies from './Currencies';
import PrivacySettings from './PrivacySettings';
import Languages from './Languages';
const SettingsStack = createStackNavigator();
const SettingsStackScreen = () => {
  return (
    <SettingsStack.Navigator initilRouteName="Settings">
      <SettingsStack.Screen name="Settings" component={Settings} />
      <SettingsStack.Screen name="Currencies" component={Currencies} />
      <SettingsStack.Screen name="PrivacySettings" component={PrivacySettings} />
      <SettingsStack.Screen name="Languages" component={Languages} />
    </SettingsStack.Navigator>
  )
}

export default SettingsStackScreen;
