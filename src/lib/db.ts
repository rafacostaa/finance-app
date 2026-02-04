import Database from "@tauri-apps/plugin-sql";

// Singleton para garantir que não abriremos múltiplas conexões à toa
let db: Database | null = null;

export const getDb = async () => {
  if (!db) {
    // O arquivo financas.db será criado na pasta de dados padrão do SO
    db = await Database.load("sqlite:financas.db");
  }
  return db;
};

// Funções de CRUD Helper
export const financeService = {
  async getAllTransactions() {
    const conn = await getDb();
    return await conn.select<
      { id: number; description: string; amount: number; date: string }[]
    >("SELECT * FROM transactions ORDER BY date DESC");
  },

  async addTransaction(description: string, amount: number, category: string) {
    const conn = await getDb();
    const date = new Date().toISOString();
    return await conn.execute(
      "INSERT INTO transactions (description, amount, category, date) VALUES ($1, $2, $3, $4)",
      [description, amount, category, date],
    );
  },

  async deleteTransaction(id: number) {
    const conn = await getDb();
    return await conn.execute("DELETE FROM transactions WHERE id = $1", [id]);
  },
};
