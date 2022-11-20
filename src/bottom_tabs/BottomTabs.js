import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS} from '../utils/theme';
import {SIZES} from '../utils/theme';
import LinearGradient from 'react-native-linear-gradient';
import HomeScreen from '../screens/dashboard/HomeScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import LeaveScreen from '../screens/leave/LeaveScreen';
import AttendanceScreen from '../screens/attendance/AttendanceScreen';
import MenuScreen from '../screens/menu/MenuScreen';
import LeavesScreen from '../screens/leaves/LeavesScreen';
import CalendarScreen from '../screens/calendar/CalendarScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        showLabel: false,
        tabBarLabel: '',
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: COLORS.white,
          borderRadius: 0,
          height: 64,
          justifyContent: 'center',
          alignItems: 'center',
          borderTopStartRadius: 8,
          borderTopEndRadius: 8,
        },
      }}>
      <Tab.Screen
        name="HomeTab"
        component={MenuScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <BuildTabComponent
                image={require('../assets/img/dashboard.png')}
                text="Dashboard"
                focused={focused}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <BuildTabComponent
                image={require('../assets/img/user-profile.png')}
                text="My Profile"
                focused={focused}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="LeaveTab"
        component={LeavesScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <BuildTabComponent
                image={require('../assets/img/leave.png')}
                text="Leave"
                focused={focused}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="AttendanceScreen"
        component={CalendarScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <BuildTabComponent
                image={require('../assets/img/attendance.png')}
                text="Attendance"
                focused={focused}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const BuildTabComponent = ({image, text, focused, center}) => {
  return (
    <LinearGradient
      colors={focused ? ['#E27127', '#EDAA26'] : ['#fff', '#fff']}
      style={{
        height: 64,
        marginBottom: -15,
        paddingTop: 10,
        width: SIZES.width / 4,
      }}>
      <View style={{alignItems: 'center', paddingTop: 2}}>
        <Image
          source={image}
          resizeMode="contain"
          style={{
            width: 23,
            height: 23,
            tintColor: focused ? COLORS.white : '#161616',
          }}
        />
        <Text
          style={{
            fontSize: 10.5,
            fontWeight: '400',
            color: focused ? COLORS.white : '#161616',
            lineHeight: 11,
            textAlign: 'center',
            marginTop: 8,
          }}>
          {text}
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default BottomTabs;
