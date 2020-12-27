import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Agenda, LocaleConfig } from "react-native-calendars";
import { Button } from "react-native-elements";
import parseDate from "../utils/util";
import { GetDates, UpdateItem, GetDB } from "../utils/DBConnection";

//Ajanda da gösterilecek olan ay ve gün isimleri atandı.
LocaleConfig.locales["tr"] = {
  monthNames: [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ],
  monthNamesShort: [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ],
  dayNames: [
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi",
    "Pazar",
  ],
  dayNamesShort: ["Pzt", "Salı", "Çrş", "Prş", "Cuma", "Cts", "Pazar"],
  today: "Bugün",
};
LocaleConfig.defaultLocale = "tr";

export default class ToDoAgendaScreen extends React.Component {
  constructor(props) {
    super(props);
    var dateNow = new Date();
    var dateNowAsString = parseDate(dateNow);

    this.state = {
      refresh: true,
      dateNow: dateNow,
      dateNowAsString: dateNowAsString,
      items: {},
      markedDates: {},
    };
  }

  update() {
    this.setState({ refresh: true });
    GetDates()
      .then((data) => this.setItems(data))
      .catch((error) => {
        console.error(error);
      });
    this.setState({ refresh: false });
  }
  render() {
    if (this.props.update) {
      this.update();
      this.props.update = false;
    }
    return (
      <Agenda
        items={this.state.items}
        renderDay={this.renderDay.bind(this)}
        renderItem={this.renderItem.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        markingType={"multi-dot"}
        onRefresh={this.update.bind(this)}
        refreshing={this.state.refresh}
        markedDates={this.state.markedDates}
        theme={{
          //CalendarList için tema
          textSectionTitleColor: "#b6c1cd",
          textSectionTitleDisabledColor: "#d9e1e8",
          selectedDayTextColor: "#fff",
          todayTextColor: "#36a1ff",
          dayTextColor: "#2d4150",
          monthTextColor: "black",
          indicatorColor: "black",
          textDayFontWeight: "300",
          textMonthFontWeight: "bold",
          textDayFontWeight: "bold",
          textDayHeaderFontWeight: "300",
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16,
          //Agenda için tema
          agendaKnobColor: "#66b7ff",
        }}
      />
    );
  }

  setItems(data) {
    let items = {};
    let markedDates = {};
    data.map((item) => {
      if (typeof items[item.date] === "undefined") {
        items[item.date] = [];
      }
      items[item.date].push({
        name: item.text,
        color: item.color,
        done: item.done,
        id: item.id,
      });
      if (item.color !== "") {
        if (typeof markedDates[item.date] === "undefined") {
          markedDates[item.date] = { dots: [] };
        }
        markedDates[item.date].dots.push({
          key: item.id + "",
          color: item.color,
        });
      }
    });
    this.setState({ items: items });
    this.setState({ markedDates: markedDates });
  }

  renderDay(day) {
    if (typeof day === "undefined") {
      return;
    }
    var d = new Date(day.dateString);
    var dayName = LocaleConfig.locales["tr"].dayNamesShort[d.getDay() - 1];
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          position: "absolute",
          margin: 10,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color:
              day.dateString === this.state.dateNowAsString
                ? "#66b7ff"
                : "#535f69",
          }}
        >
          {day.day}
        </Text>
        <Text
          style={[
            styles.dayName,
            {
              color:
                day.dateString === this.state.dateNowAsString
                  ? "#66b7ff"
                  : "#535f69",
            },
          ]}
        >
          {dayName}
        </Text>
      </View>
    );
  }

  renderItem(item) {
    return (
      <View style={[styles.item]}>
        <View
          style={[
            {
              backgroundColor: item.color,
            },
            styles.itemDot,
          ]}
        />
        <Text
          style={[
            { textDecorationLine: item.done == 1 ? "line-through" : "none" },
            styles.itemText,
          ]}
        >
          {item.name}
        </Text>
        <View style={styles.buttonContainer}>
          {item.done == 1 ? (
            <Button
              key={item.id}
              icon={<Icon name="times-circle" size={25} color="red" />}
              type="clear"
              buttonStyle={{ margin: 2, padding: 0 }}
              onPress={() => {
                this.onDeleteButtonPress(item.id);
              }}
            />
          ) : (
            <Button
              key={item.id}
              icon={<Icon name="check-circle" size={25} color="green" />}
              type="clear"
              buttonStyle={{ margin: 2, padding: 0 }}
              onPress={() => {
                this.onDoneButtonPress(item.id);
              }}
            />
          )}
        </View>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  }

  onDoneButtonPress(id) {
    const db = GetDB();
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE items SET done = 1 WHERE id = ?;",
        [id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            this.update();
          }
        },
        (txObj, error) => {
          console.log("[update] error: ", error);
        }
      );
    });
  }

  onDeleteButtonPress(id) {
    const db = GetDB();
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM items WHERE id = ? ",
        [id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            this.update();
          }
        },
        (txObj, error) => {
          console.log("[delete] error: ", error);
        }
      );
    });
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 50,
    marginRight: 10,
  },
  itemDot: {
    borderRadius: 10,
    width: 15,
    height: 15,
    margin: 2,
  },
  itemText: {
    marginLeft: 5,
    fontSize: 15,
  },
  dayName: {
    fontSize: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    marginLeft: "auto",
  },
  doneButton: {
    backgroundColor: "green",
  },
});
