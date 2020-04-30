import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import * as React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { Home, AuthScreens, OnboardScreen, SplashScreen } from './src/screens/index';
import { NavigationBars } from './src/components/index';
import { Store } from './src/helpers/index';
library.add(fab, fas);
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
          tabBarLabel: 'My Cook Book',
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
    </Tab.Navigator>
  )
}
export default function App() {
  return (
    <Provider store={Store.store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SplashScreen"
            mode="modal" >
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
            name="Home"
            component={HomeTabScreen}
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
  );
}