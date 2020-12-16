import React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { CreateTable } from "./utils/DBConnection";
import TabNavigation from "./components/TabNavigation.js";

const App = () => {
  CreateTable();
  return (
    <NavigationContainer>
      <TabNavigation />
    </NavigationContainer>
  );
};
export default App;
