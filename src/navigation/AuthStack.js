import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../screens/auth/LoginScreen';
import EnterOTPScreen from '../screens/auth/EnterOTPScreen';
import MenuScreen from '../screens/menu/MenuScreen';
import PayslipScreen from '../screens/payslip/PayslipScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import LeavesScreen from '../screens/leaves/LeavesScreen';
import ApplyLeavesScreen from '../screens/leaves/ApplyLeaveScreen';
import GoToLoginPageScreen from '../screens/auth/GoToLoginPageScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import HomeScreen from '../screens/dashboard/HomeScreen';
import CalendarScreen from '../screens/calendar/CalendarScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
  const screenOptions = {
    headerShown: false,
  };
  return (
    <>
      <Stack.Navigator
        // initialRouteName={'CalendarScreen'}>
        screenOptions={screenOptions}
        initialRouteName={'GoToLoginPageScreen'}>
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
        <Stack.Screen name="LeavesScreen" component={LeavesScreen} />
        <Stack.Screen name="ApplyLeavesScreen" component={ApplyLeavesScreen} />
        <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
      </Stack.Navigator>
    </>
  );
}
