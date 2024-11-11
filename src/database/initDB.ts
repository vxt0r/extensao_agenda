import { type SQLiteDatabase } from "expo-sqlite";

export async function initDB(database: SQLiteDatabase) {
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS reservas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cliente TEXT NOT NULL,
      data_servico TEXT NOT NULL,
      tipo_servico TEXT,
      duracao_min INTEGER
    );`)
};
