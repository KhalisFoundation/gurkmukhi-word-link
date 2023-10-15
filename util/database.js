/* eslint-disable import/no-dynamic-require */
import * as SQLite from "expo-sqlite";
import { Platform } from "react-native";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";

// wordlink.db DB should saved in this same directory.
async function openDatabase() {
  if (!(await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite`)).exists) {
    await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}SQLite`);
  }
  const file = `${FileSystem.documentDirectory}SQLite/myDatabaseName.db`;
  if (!(await FileSystem.getInfoAsync(`${file}`)).exists) {
    await FileSystem.downloadAsync(Asset.fromModule(require("./wordLink.db")).uri, `${file}`);
  }

  return SQLite.openDatabase("myDatabaseName.db");
}

async function startDB() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  const db = await openDatabase();

  return db;
}

const getWords = async () => {
  const db = await startDB();

  const result = await new Promise((resolve, reject) => {
    if (db) {
      db.transaction((tx) => {
        tx.executeSql(
          "select words, definition from Words",
          [],
          (_, { rows }) => {
            resolve(rows);
            return rows;
          },
          () => {
            reject();
          }
        );
      });
    }
  });
  return result;
};

export default getWords;
