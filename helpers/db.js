import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabase("mesure.db");

const Tables = [
  {
    table: "materiau",
    champs: [
      "id TEXT NOT NULL PRIMARY KEY",
      "description TEXT NOT NULL",
      "vitesseProp REAL NOT NULL",
    ],
  },
  {
    table: "capteur",
    champs: [
      "id TEXT NOT NULL PRIMARY KEY",
      "macAddress TEXT NOT NULL",
      "materiauId TEXT NOT NULL",
      "description TEXT NOT NULL",
      "vitesseProp REAL NOT NULL",
      "zone TEXT NOT NULL",
      "alerte REAL NOT NULL",
      "photo TEXT NOT NULL",
      "debutA REAL NOT NULL",
      "largeurA REAL NOT NULL",
      "seuilA REAL NOT NULL",
      "debutB REAL NOT NULL",
      "largeurB REAL NOT NULL",
      "seuilB REAL NOT NULL",
    ],
  },
  {
    table: "mesure",
    champs: [
      "idCapteur TEXT NOT NULL",
      "dateMesure TEXT NOT NULL",
      "debutA REAL NOT NULL",
      "largeurA REAL NOT NULL",
      "seuilA REAL NOT NULL",
      "debutB REAL NOT NULL",
      "largeurB REAL NOT NULL",
      "seuilB REAL NOT NULL",
      "epaisseur REAL NOT NULL",
      "points TEXT NOT NULL",
      "PRIMARY KEY (idCapteur, dateMesure)",
    ],
  },
];

const initTable = (table, champs) => {
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
    Tables.map(({ table, champs }) => {
      return initTable(table, champs);
    })
  );
};
