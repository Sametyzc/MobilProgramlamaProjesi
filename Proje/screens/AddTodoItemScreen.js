import React from "react";
import { Input } from "react-native-elements";
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import ColorPalette from "react-native-color-palette";
import DateTimePicker from "@react-native-community/datetimepicker";

export default class AddTodoItemScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      iconColor: "black",
      iconName: "clear",
      selectedColor: "",
    };
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <Card>
          <Card.Title h4>Add To Do Form</Card.Title>
          <Card.Divider style={{ backgroundColor: "black", height: 2 }} />
          <Text style={styles.header}>Enter To Do Item</Text>
          <Input placeholder="Type Name" />
          <Card.Divider style={{ backgroundColor: "gray", height: 1.5 }} />
          <Text style={styles.header}>Select Date</Text>
          <View style={{ marginLeft: "30%", paddingBottom: 7 }}>
            <DateTimePicker
              minimumDate={new Date()}
              value={new Date()}
              mode="date"
              display="default"
              onChange={this.dateTimePickerOnChange}
            />
          </View>
          <Card.Divider style={{ backgroundColor: "gray", height: 1.5 }} />
          <Text style={styles.header}>Select A Dot Color</Text>
          <View>
            <ColorPalette
              onChange={this.colorPaletteOnChange.bind(this)}
              colors={[
                "#fff",
                "#C0392B",
                "#0a801f",
                "#2978f0",
                "#9B59B6",
                "#edf035",
              ]}
              defaultColor={"#fff"}
              title={""}
              icon={
                <Icon
                  name={this.state.iconName}
                  size={25}
                  color={this.state.iconColor}
                />
              }
            />
          </View>
          <Card.Divider style={{ backgroundColor: "gray", height: 1.5 }} />
        </Card>
      </KeyboardAvoidingView>
    );
  }

  dateTimePickerOnChange(event, selectedDate) {}

  colorPaletteOnChange(color) {
    if (color === "#fff") {
      this.setState({iconName: "clear"});
      this.setState({iconColor: "black"});
      this.setState({selectedColor: ""});
    }
    else{
      this.setState({iconName: "done"});
      this.setState({iconColor: "white"});
      this.setState({selectedColor: color});
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
  },
  dateContainer: {},
  header: {
    fontWeight: "bold",
    color: "black",
    padding: 5,
    margin: 5,
  },
});
