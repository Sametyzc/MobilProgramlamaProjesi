import React from "react";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.ToDoDB2");

export function CreateTable() {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, date TEXT, color TEXT, done INT)"
    );
  });
}

export function InsertItem(item) {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO items (text, date, color, done) values (?, ?, ?, ?)",
      [item.text, item.date, item.color, 0],
      (txObj, resultSet) => {
      },
      (txObj, error) => console.log("Error:", error)
    );
  });
}

export function UpdateItem(id) {
  
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql("UPDATE items SET done = 1 WHERE id = ?;",
        [id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            resolve(resultSet);
          }
        },
        (txObj, error) => {
          reject(error);
        }
      );
    });
    reject(false);
  });
}

export function GetDB() {
  return db;
}

export async function GetDates() {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM items",
        null,
        (txObj, { rows: { _array } }) => {
          resolve(_array);
        },
        (txObj, error) => {
          reject(error);
        }
      );
    });
  });
}

export async function GetItemByDate(date) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT text,done FROM items WHERE date = ?",
        [date],
        (txObj, { rows: { _array } }) => {
          resolve(_array);
        },
        (txObj, error) => {
          reject(error);
        }
      );
    });
  });
}