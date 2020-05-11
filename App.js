import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons, FontAwesome5, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { fab, faFontAwesome } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  Home, AuthScreens, OnboardScreen, Earnings,
  SettingsStackScreen, ServiceRequest, Chat,
  Chats, IncomingRequest, Bookings
} from './src/screens/index';
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
          tabBarLabel: 'CookBook',
          icon: "store",
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={Bookings}
        options={{
          tabBarLabel: 'Bookings',
          icon: "book"
        }}
      />
      <Tab.Screen
        name="Chats"
        component={Chats}
        options={{
          tabBarLabel: 'Chats',
          IconLibrary: Ionicons,
          icon: "ios-chatbubbles",
          badgeCount: 102,
        }}
      />
      <Tab.Screen
        name="wallet"
        component={Chats}
        options={{
          tabBarLabel: 'Wallet',
          IconLibrary: FontAwesome5,
          icon: "wallet",
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
      <Drawer.Screen name="Earnings" component={Earnings} />
      
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
            initialRouteName="Drawer" screenOptions={{
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}>
            <Stack.Screen
              name="ServiceRequest"
              component={ServiceRequest}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="IncomingRequest"
              component={IncomingRequest}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Chat"
              component={Chat}
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