import { useEffect, useState } from 'react'
import './App.css'

interface Transaction {
  id: string,
  title: string,
  amount: number,
  date: string,
  type: 'income' | 'outcome',
}

const App = () => {
  const [transaction, setTransaction] = useState<Transaction[]>(
    JSON.parse(localStorage.getItem('transactions') || '[]') //pega as transações do localStorage ou inicia com um array vazio
  );

  //estado de aba
  const [activeTab, setActiveTab] = useState<'cadastro' | 'relatorios'>('cadastro');

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transaction)); //salva as transações no localStorage
  }, [transaction]);

  return (
    <>

    </>
  )
}

export default App
