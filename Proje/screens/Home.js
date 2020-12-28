import React from "react";
import { StyleSheet, Text, View } from "react-native";
import firebase from "firebase";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          Hoşgeldin {" " + firebase.auth().currentUser.email}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontWeight: "bold",
    color: "black",
    padding: 5,
    margin: 5,
  },
});
