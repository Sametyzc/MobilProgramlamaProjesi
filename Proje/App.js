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
export default App;
