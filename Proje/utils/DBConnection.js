import React from "react";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.ToDoDB");

export function CreateTable() {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, date TEXT, color TEXT)"
    );
  });
  console.log("Tablo oluştu!");
}

export function InsertItem(item) {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO items (text, date, color) values (?, ?, ?)",
      [item.text, item.date, item.color],
      (txObj, resultSet) =>{
          console.log("Eklenenin idsi:",resultSet.insertId);
      },
      (txObj, error) => console.log("Error:", error)
    );
  });
}
/*
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
    // Check if the items table exists if not create it

    this.fetchData(); // ignore it for now
  }
}

//okuma
fetchData = () => {
  db.transaction((tx) => {
    // sending 4 arguments in executeSql
    tx.executeSql(
      "SELECT * FROM items",
      null, // passing sql query and parameters:null
      // success callback which sends two things Transaction object and ResultSet Object
      (txObj, { rows: { _array } }) => this.setState({ data: _array }),
      // failure callback which sends two things Transaction object and Error
      (txObj, error) => console.log("Error ", error)
    ); // end executeSQL
  }); // end transaction
};
//yazma
// event handler for new item creation
newItem = () => {
  
};
// güncelleme (tabloda tanımlanan count u bir arttırararak değerini güncelliyor)
increment = (id) => {
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE items SET count = count + 1 WHERE id = ?",
      [id],
      (txObj, resultSet) => {
        if (resultSet.rowsAffected > 0) {
          let newList = this.state.data.map((data) => {
            if (data.id === id) return { ...data, count: data.count + 1 };
            else return data;
          });
          this.setState({ data: newList });
        }
      }
    );
  });
};
// delete işlemi (id ye göre)
sil = (id) => {
  db.transaction((tx) => {
    tx.executeSql(
      "DELETE FROM items WHERE id = ? ",
      [id],
      (txObj, resultSet) => {
        if (resultSet.rowsAffected > 0) {
          let newList = this.state.data.filter((data) => {
            if (data.id === id) return false;
            else return true;
          });
          this.setState({ data: newList });
        }
      }
    );
  });
};
*/
