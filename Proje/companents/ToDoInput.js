import React from "react";
import { Alert, StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";

export default class ToDoInput extends React.Component {
  constructor(props) {
    super(props);
    var dateNow = new Date();
    var dateNowAsString = dateNow.toString("yyyy-MM-dd");
    this.state = {
      dateNow: dateNow,
      dateNowAsString: dateNowAsString,
      items: {},
    };
  }

  render() {
    return (
        <View>
            <TextInput placeholder="Press for input!">

            </TextInput>
        </View>
    );
  }


}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});