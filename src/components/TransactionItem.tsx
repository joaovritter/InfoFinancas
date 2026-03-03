/**
 * Componente mais baixo, focado em apresentacao
 * Recebe uma transacao (objeto)
 * exibe os dados formatados: titulo, data, valor
 * renderiza o botao de excluir, que chama a funcao delete
*/

interface Transaction {
    id: string;
    title: string,
    amount: number,
    date: string,
    type: 'income' | 'outcome'
}

interface TransactionItemProps {
    transaction: Transaction;
    onDelete: (id: string) => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, onDelete }) => {
    return (
        
    )


}

export default TransactionItem;