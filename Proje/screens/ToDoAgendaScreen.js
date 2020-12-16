import React from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Agenda, LocaleConfig } from "react-native-calendars";
import Constants from "expo-constants";
import * as SQLite from "expo-sqlite";
import parseDate from "../utils/util";


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

const vacation = { key: "vacation", color: "red", selectedDotColor: "blue" };
const massage = { key: "massage", color: "blue", selectedDotColor: "blue" };
const workout = { key: "workout", color: "green" };

export default class ToDoAgendaScreen extends React.Component {
  constructor(props) {
    super(props);
    var dateNow = new Date();
    var dateNowAsString = parseDate(dateNow);
    this.state = {
      dateNow: dateNow,
      dateNowAsString: dateNowAsString,
      items: {},
    };
  }

  render() {
    return (
      <Agenda
        items={{
          "2020-12-14": [
            { name: "ekmek al" },
            { name: "2020-12-14 item 2" },
            { name: "2020-12-14 item 3" },
          ],
          "2020-12-15": [{ name: "item 2 - any js object", height: 80 }],
          "2020-12-16": [],
          "2020-12-17": [
            { name: "item 3 - any js object" },
            { name: "any js object" },
          ],
        }}
        // Callback that gets called when items for a certain month should be loaded (month became visible)
        loadItemsForMonth={this.loadItems.bind(this)}
        renderDay={this.renderDay.bind(this)}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        markingType={"multi-dot"}
        markedDates={{
          "2020-12-14": {
            dots: [vacation, massage, workout],
          },
          "2020-12-15": { dots: [massage, workout]},
        }}
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
        //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
        //hideExtraDays={false}
      />
    );
  }

  loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            this.state.items[strTime].push({
              name: "Item for " + strTime + " #" + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
              done: Math.round(Math.random()),
            });
          }
        }
      }
      const newItems = {};
      Object.keys(this.state.items).forEach((key) => {
        newItems[key] = this.state.items[key];
      });
      this.setState({
        items: newItems,
      });
    }, 1000);
  }

  renderDay(day, item) {
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
          position: "absolute",
          margin: 15,
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
      <View style={[styles.item]} onPress={() => Alert.alert(item.name)}>
        <Text
          style={{ textDecorationLine: item.done ? "line-through" : "none" }}
        >
          {item.name}
        </Text>
      </View>
    );
  }
  renderEmptyDate() {
    return (
      <View style={styles.item}>
        <Text>This is empty date!</Text>
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
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 50,
  },
  dayName: {
    fontSize: 12,
  },
});
