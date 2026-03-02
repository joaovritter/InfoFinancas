import { useState } from 'react'
import { format } from 'date-fns';

/**
 * Componente para exibir as transacoes filtradas por mes e ano
 * mostra um resumo com o total de entradas, saidas e saldo final
 * renderizar a lista de transacoes filtradas
 * 
 * state para armazenar a data de filtro (mes e ano)
 * funcao para filtrar as transacoes com base na data de filtro
 * calcular o total de entradas, saidas e saldo final com base nas transacoes filtradas
 * renderizar o resumo e a lista de transacoes filtradas
 */

interface Transaction {
    id: string;
    title: string;
    amount: number;
    date: string;
    type: 'income' | 'outcome';
    category: string;
}

interface ReportsProps {
    transactions: Transaction[];
}

const Reports: React.FC<ReportsProps> = ({ transactions }) => {
    const [filterDate, setFilterDate] = useState<string>(''); // formato MM-YYYY

    const filteredTransactions = transactions.filter((transaction) => {
        // Se o input estiver vazio, mostra todas as transações
        if (filterDate === '') return true;

        const transactionMonthYear = format(transaction.date, 'MM-yyyy');
        return transactionMonthYear === filterDate;
    });


    return (
        <div className='p-4'>
            <h2 className='text-x1 font-bold'>Relatórios</h2>

            <input
                type="text"
                placeholder="MM-YYYY"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className='border p-2 rounded'
            />
        </div>
    )
};

export default Reports;

