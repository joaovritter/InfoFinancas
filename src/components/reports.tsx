import { useState } from 'react'

/**
 * Componente para exibir as transacoes filtradas por mes e ano
 * mostra um resumo com o total de entradas, saidas e saldo final
 * renderizar a lista de transacoes filtradas
 */

interface Transaction {
    id: string;
    title: string;
    amount: number;
    date: string; // formato DD-MM-YYYY
    type: 'income' | 'outcome';
    category: string;
}

interface ReportsProps {
    transactions: Transaction[];
}

const Reports: React.FC<ReportsProps> = ({ transactions }) => {
    const [filterDate, setFilterDate] = useState<string>(''); // formato MM-YYYY

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

