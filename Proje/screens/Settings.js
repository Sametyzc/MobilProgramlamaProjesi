import React from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import firebase from "firebase";
import { Button } from "react-native-elements";
import { AntDesign } from '@expo/vector-icons';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  signOutUser = () => {
    this.setState({ isLoading: true });
    Alert.alert(
      "Bildirim",
      "Çıkmak istediğinize emin misiniz?",
      [
        {
          text: "Hayır",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Evet",
          onPress: () => firebase.auth().signOut(),
        },
      ],
      { cancelafble: false }
    );
    this.setState({ isLoading: false });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Setting Page!</Text>
        <Button
          style={{ padding: 15, paddingBottom: 0 }}
          iconRight
          icon={<AntDesign name="logout" size={20} color="white" />}
          title="Log out     "
          onPress={this.signOutUser}
          loading={this.state.isLoading}
        />
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
