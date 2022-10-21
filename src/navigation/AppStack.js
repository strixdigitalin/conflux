import React from "react";
import { StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import BottomTabs from "../bottom_tabs/BottomTabs";
import HomeScreen from "../screens/dashboard/HomeScreen";

export default function AppStack() {
    const Stack = createStackNavigator();

    const screenOptions = {
        headerShown: false,
    };

    return (
        <>
            <Stack.Navigator initialRouteName="Root"
                screenOptions={screenOptions}
            >
                <Stack.Screen name="Root" component={BottomTabs} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
            </Stack.Navigator>
        </>
    );
}