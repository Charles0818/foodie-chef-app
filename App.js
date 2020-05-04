import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { Home, AuthScreens, OnboardScreen, SettingsStackScreen, SplashScreen } from './src/screens/index';
import { NavigationBars } from './src/components/index';
import { Store } from './src/helpers/index';
import styles, { colors } from './src/styles';
library.add(fab, fas);
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

enableScreens ();
const HomeTabScreen = () => {
  return (
    <Tab.Navigator initialRouteName="MyCook"
      tabBar={props => <NavigationBars.BottomBar {...props} />} >
      <Tab.Screen
        name="MyCook"
        component={Home}
        options={{
          tabBarLabel: 'Cook Book',
          icon: "store",
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={Home}
        options={{
          tabBarLabel: 'Bookings',
          icon: "book"
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Home}
        options={{
          tabBarLabel: 'Updates',
          icon: "bell",
          badgeCount: 5,
        }}
      />
      <Tab.Screen
        name="Earnings"
        component={Home}
        options={{
          tabBarLabel: 'Earnings',
          icon: "dollar-sign"
        }}
      />
    </Tab.Navigator>
  )
}

const DrawerNavigation = () => {
  const dimensions = useWindowDimensions();
  const isLargeScreen = dimensions.width >= 768
  return (
    <Drawer.Navigator
      drawerContent={(props) => <NavigationBars.DrawerContent {...props} />}
      drawerType={isLargeScreen ? 'permanent' : 'front'}
      openByDefault={false}
      initialRouteName="Home"
      hideStatusBar={false}
      minimumSwipeDistance={40}
      overlayColor={colors.dark_opacity}
      drawerStyle={isLargeScreen ? null : { width: '100%' }}
      drawerContentOptions={{
        activeBackgroundColor: colors.bg_gray
      }}>
      <Drawer.Screen name="Home" component={HomeTabScreen} />
      <Drawer.Screen name="Settings" component={SettingsStackScreen} />
    {/* screens */}
    </Drawer.Navigator>
  )
}
export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={Store.store}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Drawer" >
            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Onboard"
              component={OnboardScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Drawer"
              component={DrawerNavigation}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="LoginOptions"
              component={AuthScreens.LoginOptions}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Login"
              component={AuthScreens.Login}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="SignUp"
              component={AuthScreens.SignUp}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ConfirmEmail"
              component={AuthScreens.ConfirmEmail}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}