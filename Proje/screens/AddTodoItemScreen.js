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
  Platform,
} from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import ColorPalette from "react-native-color-palette";
import DateTimePicker from "@react-native-community/datetimepicker";
import { InsertItem } from "../utils/DBConnection";
import parseDate from "../utils/util";

export default class AddTodoItemScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentDate: new Date(),
      iconColor: "black",
      iconName: "clear",
      selectedColor: "",
      selectedDate: new Date(),
      typedText: "",
      loading: false,
      errorMessage: "",
    };
  }

  renderButton() {
    if (this.state.loading) {
      return <Button loading />;
    }
    return (
      <Button
        title="Ekle"
        icon={<Icon name="done" size={25} color="white" />}
        iconRight
        onPress={this.buttonOnPress.bind(this)}
      />
    );
  }

  renderErrorMessage() {
    if (this.state.errorMessage === "") {
      return <></>;
    }
    return <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>;
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <Card>
          <Card.Title h4>Add To Do Form</Card.Title>
          <Card.Divider style={styles.headerDivider} />
          <Text style={styles.header}>Enter To Do Item</Text>
          <Input
            placeholder="Type Name"
            onChangeText={this.inputOnChangeText.bind(this)}
          />
          <Card.Divider style={styles.secondaryDivider} />
          <Text style={styles.header}>Select Date</Text>
          <View style={{ marginLeft: "30%", paddingBottom: 7 }}>
            <DateTimePicker
              minimumDate={this.state.currentDate}
              value={this.state.selectedDate}
              mode="date"
              display="default"
              onChange={this.dateTimePickerOnChange.bind(this)}
            />
          </View>
          <Card.Divider style={styles.secondaryDivider} />
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
          <Card.Divider style={styles.secondaryDivider} />
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            {this.renderButton()}
            {this.renderErrorMessage()}
          </View>
        </Card>
      </KeyboardAvoidingView>
    );
  }

  buttonOnPress() {
    this.setState({ loading: true });
    if (this.state.typedText === "") {
      this.setState({ loading: false });
      this.setState({ errorMessage: "Name is not valid!" });
    } else {
      var dateAsString = parseDate(this.state.selectedDate);
      var item = {
        text: this.state.typedText,
        date: dateAsString,
        color: this.state.selectedColor,
      };
      InsertItem(item);
    }
  }

  inputOnChangeText(value) {
    this.setState({ typedText: value });
  }

  dateTimePickerOnChange(_, date) {
    this.setState({ selectedDate: date });
  }

  colorPaletteOnChange(color) {
    if (color === "#fff") {
      this.setState({ iconName: "clear" });
      this.setState({ iconColor: "black" });
      this.setState({ selectedColor: "" });
    } else {
      this.setState({ iconName: "done" });
      this.setState({ iconColor: "white" });
      this.setState({ selectedColor: color });
    }
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
  headerDivider: {
    backgroundColor: "darkblue",
    height: 4,
  },
  secondaryDivider: {
    backgroundColor: "blue",
    height: 2,
  },
});
