import TransactionItem from './TransactionItem'

/**
 * Componente intermediario que organiza a lista de transacoes filtradas por mes e ano
 * recebe a lista de transacoes ja filtrada pelo componente Reports
 * renderiza cada transacao como um item da lista, mostrando titulo, valor formatado em BRL, data formatada e tipo (entrada ou saida)
 * passa a funcao de deletar para cada item da lista, permitindo que o usuario remova transacoes diretamente da lista

 */

interface Transaction {
    id: string;
    title: string,
    amount: number,
    date: string,
    type: 'income' | 'outcome'
}

interface TransactionListProps {
    transactions: Transaction[];
    onDeleteTransaction: (id: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDeleteTransaction }) => {
    return (
        <div className="mt-6">
            <h3 className="text-lg font-bold mb-4"> Transações do Mês </h3>
            {transactions.length === 0 ? (
                <p className="text-gray-500 text-center py-8"> Nenhuma transação neste período</p>
            ) : (
                <div className="space-y-2">
                    {/*Transactions itens aqui, faz um map de transactions, percorrre para cada TransactionItem (comp)
                    passa os props do component: id(com key), transaction, onDelete */}
                </div>
            )
            }
        </div>
    )
}

export default TransactionList;