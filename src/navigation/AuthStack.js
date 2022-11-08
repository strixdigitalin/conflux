import React from 'react';
import {StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

<<<<<<< HEAD
import LoginScreen from "../screens/auth/LoginScreen";
import GoToLoginPageScreen from "../screens/auth/GoToLoginPageScreen";
import ForgotPasswordScreen from "../screens/auth/ForgotPasswordScreen";
import HomeScreen from "../screens/dashboard/HomeScreen";
import EnterOTPScreen from "../screens/auth/EnterOTPScreen";
import MenuScreen from "../screens/menu/MenuScreen";
import PayslipScreen from "../screens/payslip/PayslipScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import LeavesScreen from "../screens/leaves/LeavesScreen";
import ApplyLeavesScreen from "../screens/leaves/ApplyLeaveScreen";
=======
import LoginScreen from '../screens/auth/LoginScreen';
import GoToLoginPageScreen from '../screens/auth/GoToLoginPageScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import HomeScreen from '../screens/dashboard/HomeScreen';
import EnterOTPScreen from '../screens/auth/EnterOTPScreen';
import MenuScreen from '../screens/menu/MenuScreen';
import PayslipScreen from '../screens/payslip/PayslipScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
>>>>>>> fa2d4182ec3f19314dc17659fbb98c5413bbe3a5

const Stack = createStackNavigator();

export default function AuthStack() {
  const screenOptions = {
    headerShown: false,
  };

<<<<<<< HEAD
    const screenOptions = {
        headerShown: false,
    };

    return (
        <>
            <Stack.Navigator
                screenOptions={screenOptions}
                initialRouteName={"LeavesScreen"}
            >
                <Stack.Screen name="GoToLoginPageScreen" component={GoToLoginPageScreen} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
                <Stack.Screen name="EnterOTPScreen" component={EnterOTPScreen} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="MenuScreen" component={MenuScreen} />
                <Stack.Screen name="PayslipScreen" component={PayslipScreen} />
                <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
                <Stack.Screen name="LeavesScreen" component={LeavesScreen} />
                <Stack.Screen name="ApplyLeavesScreen" component={ApplyLeavesScreen} />
            </Stack.Navigator>
        </>
    );
=======
  return (
    <>
      <Stack.Navigator
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
      </Stack.Navigator>
    </>
  );
>>>>>>> fa2d4182ec3f19314dc17659fbb98c5413bbe3a5
}
