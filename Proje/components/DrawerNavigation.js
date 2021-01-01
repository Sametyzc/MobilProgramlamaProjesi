import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { createDrawerNavigator } from "@react-navigation/drawer";

import TabNavigation from "./TabNavigation";
import Settings from "../screens/Settings";

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerType="slide"
      drawerPosition="right"
      drawerStyle={{
        flex: 1,
        flexDirection: "column",
      }}
      
    >
      <Drawer.Screen
        name="Home"
        children={() => {
          return <TabNavigation />;
        }}
        options={{
          drawerIcon: ({ focused, size }) => {
            const IcoColor = focused ? "blue" : "gray";
            return (
              <MaterialCommunityIcons
                name="home"
                size={size}
                color={IcoColor}
              />
            );
          },
        }}
      />
      <Drawer.Screen
        name="Settings"
        children={() => {
          return <Settings />;
        }}
        options={{
          drawerIcon: ({ focused, size }) => {
            const IcoColor = focused ? "blue" : "gray";
            // You can return any component that you like here!
            return (
              <MaterialCommunityIcons
                name="settings"
                size={size}
                color={IcoColor}
              />
            );
          },
        }}
      />
    </Drawer.Navigator>
  );
}
