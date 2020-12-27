import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import * as firebase from "firebase";
import DrawerNavigation from "./components/DrawerNavigation";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

const Stack = createStackNavigator();

const App = () => {
  const [logedin, setLogedin] = useState(false);
  
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      user ? setLogedin(true) : setLogedin(false);
    });
  }, []);

  if (logedin) {
    return (
      <NavigationContainer>
        <DrawerNavigation />
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
