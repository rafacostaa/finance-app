import { Button } from "@/components/ui/button";
import "./App.css";
import { useFinance } from "./hooks/useFinance";

function App() {
  const { transactions, isLoading, addTransaction, isAdding } = useFinance();
  const handleAdd = () => {
    addTransaction({
      description: "Nova Transação",
      amount: -150.0,
      category: "Desktop",
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold tracking-tight">Finanças Desktop</h1>
        <Button
          onClick={handleAdd}
          disabled={isAdding}
          variant="default"
          size="sm"
        >
          {isAdding ? "Gravando..." : "+ Adicionar Transação"}
        </Button>
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
