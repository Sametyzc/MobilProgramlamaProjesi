import React, { Component, useState } from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import { getBooksList } from "./utils/BookAPI.js";

const Cat = () => {
  const [number, setNumber] = useState(true);

  return (
    <View>
      <Text>{number}</Text>
      <Button
        onPress={() => {
          setNumber(getBooksList("tavşan"));
        }}
        title="Bana bas"
      />
    </View>
  );
};

const Cafe = () => {
  return (
    <View style={styles.container}>
      <Text>{getBooksList("tavşan")}</Text>
    </View>
  );
};

export default Cafe;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  detailedContainer: {
    marginVertical: "50%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    color: "black",
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
  },
  textStyle: {
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "AvenirNext-Regular" : "Roboto",
  },
  textInput: {
    backgroundColor: "gray",
    color: "white",
    height: 40,
    width: 300,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    alignSelf: "center",
  },
  largeText: {
    fontSize: 44,
  },
  mediumText: {
    fontSize: 20,
  },
  smallText: {
    fontSize: 12,
  },
});
