import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { financeService } from "../lib/db";

export function useFinance() {
  const queryClient = useQueryClient();

  // Busca as transações
  const transactionsQuery = useQuery({
    queryKey: ["transactions"],
    queryFn: () => financeService.getAllTransactions(),
  });

  // Mutação para adicionar transação
  const addTransactionMutation = useMutation({
    mutationFn: (data: {
      description: string;
      amount: number;
      category: string;
    }) =>
      financeService.addTransaction(
        data.description,
        data.amount,
        data.category,
      ),
    onSuccess: () => {
      // Isso invalida o cache e força o React Query a buscar os dados atualizados no SQLite
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  return {
    transactions: transactionsQuery.data ?? [],
    isLoading: transactionsQuery.isLoading,
    isError: transactionsQuery.isError,
    addTransaction: addTransactionMutation.mutate,
    isAdding: addTransactionMutation.isPending,
  };
}
