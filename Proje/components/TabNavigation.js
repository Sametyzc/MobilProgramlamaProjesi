import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ToDoAgendaScreen from '../screens/ToDoAgendaScreen';
import AddTodoItemScreen from '../screens/AddTodoItemScreen';

export default function TabNavigation() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Agenda"
      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
        labelStyle: { fontSize: 14 },
      }}
    >
      <Tab.Screen
        name="Agenda"
        component={ToDoAgendaScreen}
        options={{
          tabBarLabel: 'Agenda',
          tabBarIcon: ({ focused, size }) => {
            const IcoColor = focused ? 'blue' : 'gray';
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
        component={AddTodoItemScreen}
        options={{
          tabBarLabel: 'Add To Do',
          // eslint-disable-next-line react/prop-types
          tabBarIcon: ({ focused, size }) => {
            const IcoColor = focused ? 'blue' : 'gray';
            // You can return any component that you like here!
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
