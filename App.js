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
import { FontAwesome5 } from '@expo/vector-icons';
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  Home, AuthStack, OnboardScreen, Earnings,
  SettingsStackScreen, ServiceRequest, Chat,
  Chats, IncomingRequest, Bookings, EarningsStackScreen,
  Invite, Notifications, CookBook, AboutUs, Feedback,
  HelpCenter, PromoCode, CompletedRequest
} from './src/screens/index';
import { NavigationBars } from './src/components/index';
import { store, actions } from './src/helpers/index';
import styles, { colors } from './src/styles';
library.add(fab, fas);
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const { authActions: { getFirstTimeKey, retrieveToken, clearStorage } } = actions;
enableScreens ();
const HomeTabScreen = () => {
  return (
    <Tab.Navigator initialRouteName="MyCook"
      tabBar={props => <NavigationBars.BottomBar {...props} />} >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          icon: "home",
        }}
      />
       <Tab.Screen
        name="CookBook"
        component={CookBook}
        options={{
          tabBarLabel: 'Cook Book',
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
      {/* <Tab.Screen
        name="Chats"
        component={Chats}
        options={{
          tabBarLabel: 'Chats',
          IconLibrary: Ionicons,
          icon: "ios-chatbubbles",
          badgeCount: 102,
        }}
      /> */}
      <Tab.Screen
        name="Earnings"
        component={EarningsStackScreen}
        options={{
          tabBarLabel: 'Wallet',
          IconLibrary: FontAwesome5,
          icon: "wallet",
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
      drawerStyle={isLargeScreen ? null : { width: '80%' }}
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

const App = () => {
  const [state, setState] = React.useState({
    isFirstTime: null, token: null, isLoading: true
  })
  React.useEffect(() => {
    const getDataFromStorage  = async () => {
      const isFirstTime = await getFirstTimeKey();
      const token = await retrieveToken();
      await clearStorage();
      setState({isFirstTime, token, isLoading: false})
    }
    getDataFromStorage()
  }, [])
  const { isFirstTime, token, isLoading } = state;
  const initialRouteName = isFirstTime ? "Onboard" : token ? 'Drawer' : 'Auth';
  if(isLoading) return null;
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={'Onboard'} screenOptions={{
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}>
            <Stack.Screen
              name="ServiceRequest"
              component={ServiceRequest}
              options={{
                headerTitle: 'Details',
              }}
            />
            <Stack.Screen
              name="Invite"
              component={Invite}
              options={{
                headerTitle: 'Invite & Earn',
                headerTitleAlign: 'center'
              }}
            />
            <Stack.Screen name="About" component={AboutUs} />
            <Stack.Screen name="Feedback" component={Feedback} />
            <Stack.Screen name="HelpCenter" component={HelpCenter} />
            <Stack.Screen name="PromoCode" component={PromoCode} />
            <Stack.Screen
              name="IncomingRequest"
              component={IncomingRequest}
              options={{
                headerShown: false,
                
              }}
            />
            <Stack.Screen
              name="CompletedRequest"
              component={CompletedRequest} 
              options={{
                headerTitle: 'Booking Details'
              }}
            />
            <Stack.Screen
              name="Chat"
              component={Chat}
            />
            <Stack.Screen
              name="Chats"
              component={Chats}
            />
            <Stack.Screen
              name="Notifications"
              component={Notifications}
              
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
              name="Auth"
              component={AuthStack}
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

export default App;