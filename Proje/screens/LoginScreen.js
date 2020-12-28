import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Card, Input, Button } from "react-native-elements";
import { Entypo } from "@expo/vector-icons";
import Fire from "../utils/FireBaseConnection";
import * as firebase from "firebase";
import { SafeAreaView } from "react-native";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const renderErrorMsg = () => {
    if (errorMsg) {
      return (
        <Text style={{ color: "red", fontSize: 15, alignSelf: "center" }}>
          {errorMsg}
        </Text>
      );
    }
  };
  const handleLogin = () => {
    setLoading(true);
    const check = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    {
      if (!check.test(email)) {
        setErrorMsg("Invalid email address!");
        setLoading(false);
      } else if (password.length <= 5) {
        setErrorMsg("Password must be greater than 5!");
        setLoading(false);
      } else {
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then()
          .catch((err) => {
            console.log(err);
            setErrorMsg(err.message);
            setLoading(false);
          });
      }
    }
  };

  return (
    <ScrollView>
      <View
        style={{
          alignItems: "center",
          margin: 0,
          paddingTop: 27,
          height: 57,
          backgroundColor: "white",
        }}
      >
        <Text style={{ color: "black", fontWeight: "600", fontSize: 16 }}>
          Login Screen
        </Text>
      </View>
      <SafeAreaView>
        <Card
          containerStyle={{
            borderColor: "black",
            borderWidth: 2,
            backgroundColor: "snow",
          }}
        >
          <View style={styles.content}>
            <Input
              style={styles.input}
              label="EMAIL"
              labelStyle={styles.label}
              placeholder="email@example.com"
              leftIcon={<Entypo name="mail" size={20} color="dodgerblue" />}
              onChangeText={(text) => setEmail(text)}
            />
            <Input
              style={styles.input}
              label="PASSWORD"
              labelStyle={styles.label}
              placeholder="Password"
              leftIcon={<Entypo name="lock" size={20} color="dodgerblue" />}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />
            {renderErrorMsg()}
            <Button
              style={{ padding: 15, paddingBottom: 0 }}
              iconRight
              icon={<Entypo name="login" size={20} color="white" />}
              title="Login  "
              onPress={handleLogin}
              loading={isLoading}
            />
            <TouchableOpacity
              style={styles.button2}
              onPress={() => {
                navigation.navigate("Register");
              }}
            >
              <Text style={styles.textButton2}>
                If you do not have an account
                <Text style={{ fontWeight: "500", color: "dodgerblue" }}>
                  {" "}
                  press here.
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </Card>
      </SafeAreaView>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: "column",
    padding: 15,
  },
  title: {
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
  },
  label: {
    color: "dodgerblue",
    fontSize: 13,
    textTransform: "uppercase",
  },
  input: {
    height: 40,
    fontSize: 15,
    color: "#161F3D",
  },
  divider: {
    backgroundColor: "black",
    height: 3,
  },
  logo: {
    height: 200,
    width: "100%",
    alignSelf: "center",
  },
  logo2: {
    position: "absolute",
    zIndex: -1,
    opacity: 0.2,
    top: 200,
    right: -170,
    height: 500,
    width: "120%",
  },
  greeting: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
  },
  errMess: {
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
  },
  error: {
    color: "#E9446A",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30,
  },

  textButton: {
    color: "white",
    fontWeight: "bold",
  },
  button: {
    marginHorizontal: 38,
    backgroundColor: "#f1880d",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  textButton2: {
    color: "#414959",
    fontSize: 13,
  },
  button2: {
    alignSelf: "center",
    marginTop: 22,
  },
});
