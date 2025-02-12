import { createContext, useEffect, useState, type ReactNode } from "react";
import { api } from "../lib/axios";

interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}

interface TransactionsContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionsContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
    async function fetchTransactions(query?: string) {
      // Request with axios
      const response = await api.get("transactions", {
        params: {
          q: query,
        }
      });

      setTransactions(response.data);



      // Request with fetch api:
      // const url = new URL("http://localhost:3000/transactions");

      // if (query) {
      //   url.searchParams.append('q', query);
      // }

      // const response = await fetch(url);
      // const data = await response.json();

      //setTransactions(data);
    }
    
    useEffect(() => {
      fetchTransactions();
    }, [])

  return (
    <TransactionsContext.Provider value={{ 
      transactions,
      fetchTransactions 
    }}>
      {children}
    </TransactionsContext.Provider>
  )
}