// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri_plugin_sql::{Migration, MigrationKind};

fn main() {
    // Define as tabelas ao iniciar (Migrations)
    let migrations = vec![
        Migration {
            version: 1,
            description: "create_transactions_table",
            sql: "CREATE TABLE IF NOT EXISTS transactions (
                id INTEGER PRIMARY KEY AUTO_INCREMENT,
                description TEXT NOT NULL,
                amount REAL NOT NULL,
                date TEXT NOT NULL
            );",
            kind: MigrationKind::Up,
        }
    ];

    tauri::Builder::default()
        .plugin(tauri_plugin_sql::Builder::default()
            .add_migrations("sqlite:finance.db", migrations)
            .build())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}