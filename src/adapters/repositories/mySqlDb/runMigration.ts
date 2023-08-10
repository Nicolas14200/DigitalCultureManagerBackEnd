const fs = require('fs').promises;
const path = require('path');
import mysql from "mysql2/promise";

export async function runMigrations() {
  // Créer la connexion à la base de données
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test",
  });

  // Lire tous les fichiers du dossier de migration
  const files = await fs.readdir(path.join(__dirname, 'migrations'));

  for (const file of files) {
    // Ignorer les fichiers qui ne sont pas .sql
    if (path.extname(file) !== '.sql') continue;

    console.log(`Exécution de la migration: ${file}`);

    // Lire le fichier SQL
    const sql = await fs.readFile(path.join(__dirname, 'migrations', file), 'utf8');

    // Exécuter le fichier SQL
    await connection.execute(sql);
  }

  console.log('Toutes les migrations ont été exécutées avec succès.');


  return (await connection);
}

