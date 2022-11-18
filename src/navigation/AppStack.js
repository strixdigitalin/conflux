import React from 'react';
import {StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import BottomTabs from '../bottom_tabs/BottomTabs';
import HomeScreen from '../screens/dashboard/HomeScreen';
import MenuScreen from '../screens/menu/MenuScreen';
import PayslipScreen from '../screens/payslip/PayslipScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import LeavesScreen from '../screens/leaves/LeavesScreen';
import ApplyLeavesScreen from '../screens/leaves/ApplyLeaveScreen';
import CalendarScreen from '../screens/calendar/CalendarScreen';

export default function AppStack() {
  const Stack = createStackNavigator();

  const screenOptions = {
    headerShown: false,
  };

  return (
    <>
      <Stack.Navigator initialRouteName="Root" screenOptions={screenOptions}>
        <Stack.Screen name="Root" component={BottomTabs} />
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
