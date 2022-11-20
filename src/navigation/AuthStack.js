import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/auth/LoginScreen';
import EnterOTPScreen from '../screens/auth/EnterOTPScreen';
import GoToLoginPageScreen from '../screens/auth/GoToLoginPageScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import IntroScreen from '../onboarding/IntroScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
  const screenOptions = { headerShown: false };
  return (
    <>
      <Stack.Navigator
        screenOptions={screenOptions}
        initialRouteName={'GoToLoginPageScreen'}
      >
        <Stack.Screen name="IntroScreen" component={IntroScreen} />
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
      </Stack.Navigator>
    </>
  );
}
