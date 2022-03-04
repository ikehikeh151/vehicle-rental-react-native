/* eslint-disable no-unused-vars */
import React from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
import Forgot from './screens/Forgot';
import History from './screens/History';
import Chat from './screens/Chat';
import Profile from './screens/Profile';
import DetailVehicle from './screens/DetailVehicle';
import AddItem from './screens/AddItem';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import NotLogin from './screens/NotLogin';
import CategoryVehicles from './screens/CategoryVehicles';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthScreen = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="Forgot" component={Forgot} />
  </Stack.Navigator>
);

const TabHome = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="AddItemScreen" component={AddItem} />
      <Stack.Screen name="CategoryVehicle" component={CategoryVehicles} />
      <Stack.Screen name="DetailVehicleScreen" component={DetailVehicle} />
    </Stack.Navigator>
  );
};

const TabHistory = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HistoryScreen" component={History} />
    </Stack.Navigator>
  );
};

const TabChat = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ChatScreen" component={Chat} />
    </Stack.Navigator>
  );
};

const TabProfile = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileScreen" component={Profile} />
      <Stack.Screen name="FavoriteScreen" component={DetailVehicle} />
      <Stack.Screen name="UpdateProfileScreen" component={DetailVehicle} />
    </Stack.Navigator>
  );
};

const TabStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="HomeTab"
        component={TabHome}
        options={{
          tabBarLabel: 'Home',
          tabBarActiveTintColor: '#FFCD61',
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name={'home'} color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="History"
        component={TabHistory}
        options={{
          tabBarLabel: 'History',
          tabBarActiveTintColor: '#FFCD61',
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name={'clipboard-list'} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={TabChat}
        options={{
          tabBarLabel: 'Chat',
          tabBarActiveTintColor: '#FFCD61',
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name={'comment'} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={TabProfile}
        options={{
          tabBarLabel: 'Profile',
          tabBarActiveTintColor: '#FFCD61',
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name={'user-alt'} color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Router = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="TabStack"
  >
    <Stack.Screen name="AuthScreen" component={AuthScreen} />
    <Stack.Screen name="TabStack" component={TabStack} />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  tabWrapper: {
    height: 60,
    borderRadius: 5,
    backgroundColor: 'red',
  },
  tabIconWrapper: {
    position: 'relative',
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'red',
  },
  tabIcon: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: 'red',
    bottom: 5,
    height: 25,
    opacity: 1,
    width: 25,
  },
});

export default Router;
