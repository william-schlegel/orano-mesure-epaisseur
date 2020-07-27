import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabase("mesure.db");

const Tables = [
  {
    version: 1,
    table: "mesures",
    champs: [
      "mesure_id TEXT NOT NULL PRIMARY KEY",
      "date DATE NOT NULL",
      "resultat REAL NOT NULL",
    ],
  },
  {
    version: 1,
    table: "mesures_points",
    champs: [
      "mesure_id TEXT NOT NULL",
      "numero INTEGER NOT NULL",
      "valeur REAL NOT NULL",
      "PRIMARY KEY (mesure_id, numero)",
    ],
  },
];

const initTable = (table, version, champs) => {
  return new Promise((resolve, reject) => {
    // check version de la table existante
    console.log("init table", table);
    db.transaction((tx) =>
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ${table} (${champs.join(", ")})`,
        [],
        (_, res) => {
          resolve(res);
        },
        (_, err) => {
          console.log("err create table", err);
          reject(err);
        }
      )
    );
  });
};

export const init = () => {
  return Promise.all(
    Tables.map(({ version, table, champs }) => {
      return initTable(table, version, champs);
    })
  );
};
