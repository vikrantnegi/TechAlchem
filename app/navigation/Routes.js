import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import {Image} from 'react-native';
import Ticket from '../screens/Ticket';
import Play from '../screens/Play';
import Settings from '../screens/Settings';
import {colorCode} from '../designs/colors';
import Details from '../screens/Details';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeScreens = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="Home"
        component={Home}
      />
      <Stack.Screen
        options={({route}) => ({
          headerShown: false,
          tabBarVisible: getTabBarVisibility(route),
        })}
        name="Details"
        component={Details}
      />
    </Stack.Navigator>
  );
};

const getTabBarVisibility = route => {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : '';
  console.log(routeName, 'seno');
  if (routeName === 'Details') {
    return false;
  }
  return true;
};

export default function Routes() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: colorCode.white,
            borderTopRightRadius: 45,
            borderTopLeftRadius: 45,
            height: 100,
            shadowColor: '#999',
            shadowOffset: {width: 0, height: 1},
            shadowOpacity: 1,
            shadowRadius: 3,
            elevation: 10,
          },
        }}>
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <Image source={require('../assets/images/home.png')} />
            ),
          }}
          name="Home"
          component={HomeScreens}
        />
        <Tab.Screen
          options={{
            tabBarIcon: () => (
              <Image source={require('../assets/images/ticket.png')} />
            ),
          }}
          name="Ticket"
          component={Ticket}
        />
        <Tab.Screen
          options={{
            tabBarIcon: () => (
              <Image source={require('../assets/images/play.png')} />
            ),
          }}
          name="Play"
          component={Play}
        />
        <Tab.Screen
          options={{
            tabBarIcon: () => (
              <Image source={require('../assets/images/user.png')} />
            ),
          }}
          name="Profile"
          component={Profile}
        />
        <Tab.Screen
          options={{
            tabBarIcon: () => (
              <Image source={require('../assets/images/settings.png')} />
            ),
          }}
          name="Settings"
          component={Settings}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
