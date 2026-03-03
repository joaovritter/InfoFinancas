import { useMemo, useState } from 'react'
import { format, isValid, parse } from 'date-fns';
import SummaryCard from './SummaryCard';

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
}

interface ReportsProps {
    transactions: Transaction[];
    onDeleteTransaction: (id: string) => void;
}

const Reports: React.FC<ReportsProps> = ({ transactions, onDeleteTransaction }) => {
    const [filterDate, setFilterDate] = useState<string>(format(new Date(), 'yyyy-MM'));


    //lista filtrada pelo mes e ano, mantem somente as que pertencem ao mes escolhido (filterDate)
    const filteredTransactions = useMemo(() => {
        return transactions.filter((transaction) => {
            const parsedDate = parse(transaction.date, 'dd-MM-yyyy', new Date());
            if (!isValid(parsedDate)) {
                return false;
            }
            return format(parsedDate, 'yyyy-MM') === filterDate;
        })
    }, [transactions, filterDate]);


    //calcula o total de entradas, saidas e saldo final com base nas transacoes filtradas
    const summary = useMemo(() => {
        return filteredTransactions.reduce(
            (acc, transaction) => {
                if (transaction.type === 'income') {
                    acc.income += transaction.amount;
                } else {
                    acc.outcome += transaction.amount;
                }
                acc.balance = acc.income - acc.outcome;
                return acc;
            },
            { income: 0, outcome: 0, balance: 0, }
        )
    }, [filteredTransactions]);


    const formatBRL = (value: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    }

    return (
        <div className='p-4'>
            <h2 className='text-x1 font-bold'>Relatórios</h2>

            <input
                type="month"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className='border p-2 rounded'
            />

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
                <SummaryCard title="Entradas" value={summary.income} type="income" />
                <SummaryCard title="Saídas" value={summary.outcome} type="outcome" />
                <SummaryCard title="Saldo" value={summary.balance} type="balance" />
            </div>

            {/* Lista de Transações */}
            <div className='mt-6'>
                <h3 className='text-lg font-bold mb-4'>Transações do Mês</h3>
                {filteredTransactions.length === 0 ? (
                    <p className='text-gray-500 text-center py-8'>Nenhuma transação neste período</p>
                ) : (
                    <div className='space-y-2'>
                        {filteredTransactions.map((transaction) => {
                            const parsedDate = parse(transaction.date, 'dd-MM-yyyy', new Date());

                            return (
                                <div key={transaction.id} className='border rounded p-4 flex items-center justify-between hover:bg-gray-50'>
                                    <div>
                                        <p className='font-semibold'>{transaction.title}</p>
                                        <p className='text-sm text-gray-500'>
                                            {isValid(parsedDate) ? format(parsedDate, 'dd/MM/yyyy') : transaction.date}
                                        </p>
                                    </div>
                                    <div className='flex items-center gap-4'>
                                        <span className={`font-bold text-lg ${transaction.type === 'income'
                                            ? 'text-green-600'
                                            : 'text-red-600'
                                            }`}
                                        >
                                            {transaction.type === 'income' ? '+' : '-'} {' '}
                                            {formatBRL(transaction.amount)}
                                        </span>

                                        <button
                                            onClick={() => onDeleteTransaction(transaction.id)}
                                            className='px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600'
                                        >
                                            Excluir
                                        </button>

                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
};

export default Reports;

