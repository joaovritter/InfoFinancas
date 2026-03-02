import { useState } from 'react'
import './App.css'

interface Transaction {
  id: string,
  title: string,
  amount: number,
  date: Date,
  type: 'income' | 'outcome',
}

const App = () => {
  const [transaction, setTransaction] = useState<Transaction[]>(
    JSON.parse(localStorage.getItem('transactions') || '[]') //pega as transações do localStorage ou inicia com um array vazio
  );


  return (
    <>

    </>
  )
}

export default App
