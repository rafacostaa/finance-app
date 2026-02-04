import "./App.css";
import { useFinance } from "./hooks/useFinance";

function App() {
  const { transactions, isLoading, addTransaction } = useFinance();
  const handleAdd = () => {
    addTransaction({
      description: "Nova Compra",
      amount: -50.0,
      category: "Alimentação",
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold tracking-tight">Finanças Desktop</h1>
        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
        >
          + Adicionar Transação
        </button>
      </header>

      {isLoading ? (
        <p>Carregando dados do SQLite...</p>
      ) : (
        <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="p-3 font-semibold">Descrição</th>
                <th className="p-3 font-semibold text-right">Valor</th>
                <th className="p-3 font-semibold">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {transactions.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50">
                  <td className="p-3">{t.description}</td>
                  <td
                    className={`p-3 text-right font-medium ${t.amount < 0 ? "text-red-500" : "text-green-600"}`}
                  >
                    R$ {t.amount.toFixed(2)}
                  </td>
                  <td className="p-3 text-slate-500">
                    {new Date(t.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
