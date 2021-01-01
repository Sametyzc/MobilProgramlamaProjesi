import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import * as firebase from "firebase";
import DrawerNavigation from "./components/DrawerNavigation";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import AfterLogin from "./components/AfterLogin";

const Stack = createStackNavigator();

const App = () => {
  const [logedin, setLogedin] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      firebase.auth().onAuthStateChanged((user) => {
        user ? setLogedin(true) : setLogedin(false);
      });
    }
    return () => (isMounted = false);
  }, []);

  if (logedin) {
    return <AfterLogin />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
