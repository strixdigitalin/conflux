import React from 'react';
import {StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../screens/auth/LoginScreen';
import GoToLoginPageScreen from '../screens/auth/GoToLoginPageScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import HomeScreen from '../screens/dashboard/HomeScreen';
import EnterOTPScreen from '../screens/auth/EnterOTPScreen';
import MenuScreen from '../screens/menu/MenuScreen';
import PayslipScreen from '../screens/payslip/PayslipScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
  const screenOptions = {
    headerShown: false,
  };

  return (
    <>
      <Stack.Navigator
        screenOptions={screenOptions}
        initialRouteName={'ProfileScreen'}>
        <Stack.Screen
          name="GoToLoginPageScreen"
          component={GoToLoginPageScreen}
        />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
        />
        <Stack.Screen name="EnterOTPScreen" component={EnterOTPScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="MenuScreen" component={MenuScreen} />
        <Stack.Screen name="PayslipScreen" component={PayslipScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      </Stack.Navigator>
    </>
  );
}
