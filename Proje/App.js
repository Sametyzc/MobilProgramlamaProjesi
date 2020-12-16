<<<<<<< Updated upstream
import React from 'react';
import { Text, View } from 'react-native';
import ToDoAgenda from "./screens/ToDoAgenda.js";


const App = () => {
  return (
    <ToDoAgenda/>
  )
}
=======
import React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import TabNavigation from "./components/TabNavigation.js";

const App = () => {
  return (
    <NavigationContainer>
      <TabNavigation />
    </NavigationContainer>
  );
};
>>>>>>> Stashed changes
export default App;
