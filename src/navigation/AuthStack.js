import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/auth/LoginScreen';
import EnterOTPScreen from '../screens/auth/EnterOTPScreen';
import GoToLoginPageScreen from '../screens/auth/GoToLoginPageScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import IntroScreen from '../onboarding/IntroScreen';
import Auth from '../services/Auth';
import PayslipScreen from '../screens/payslip/PayslipScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
  const screenOptions = { headerShown: false };

  const [isFirstLaunch, setIsFirstLaunch] = React.useState(null);
  let routeName;

  React.useEffect(() => {
    Auth.getIntro().then(value => {
      console.log('value: ', value);
      if (value == null) {
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch.toString() === 'true') {
    routeName = 'IntroScreen';
  } else {
    routeName = 'GoToLoginPageScreen';
  }

  return (
    <>
      <Stack.Navigator
        screenOptions={screenOptions}
        initialRouteName={routeName}>
        <Stack.Screen name="PayslipScreen" component={PayslipScreen} />
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
