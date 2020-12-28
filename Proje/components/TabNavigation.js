import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ToDoAgendaScreen from "../screens/ToDoAgendaScreen";
import AddTodoItemScreen from "../screens/AddTodoItemScreen";

import Home from "../screens/Home";

export default function TabNavigation() {
  const [updateHandle, setUpdate] = useState(true);

  const handleClick = () => {
    setUpdate(true);
  };

  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: "blue",
        inactiveTintColor: "gray",
        labelStyle: { fontSize: 14 },
      }}
    >
      <Tab.Screen
        name="Home"
        children={() => {
          return <Home />;
        }}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused, size }) => {
            const IcoColor = focused ? "blue" : "gray";
            // You can return any component that you like here!
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
      <Tab.Screen
        name="Agenda"
        children={() => {
          let bool = updateHandle;
          setUpdate(false);
          return <ToDoAgendaScreen update={bool} />;
        }}
        options={{
          tabBarLabel: "Agenda",
          tabBarIcon: ({ focused, size }) => {
            const IcoColor = focused ? "blue" : "gray";
            // You can return any component that you like here!
            return (
              <MaterialCommunityIcons
                name="calendar"
                size={size}
                color={IcoColor}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="AddToDo"
        children={() => <AddTodoItemScreen updateHandler={handleClick} />}
        options={{
          tabBarLabel: "Add To Do",
          tabBarIcon: ({ focused, size }) => {
            const IcoColor = focused ? "blue" : "gray";
            return (
              <MaterialCommunityIcons
                name="marker-check"
                size={size}
                color={IcoColor}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
