
/**
 * COmponente de resumo financeiro, mostrando entradas, saídas e saldo
 * desacopla a lógica de cálculo do resumo da exibição dos dados na reports
 * recebe as transações filtradas por mês e ano (do componente Reports)
 * calcula o total de entradas, saídas e saldo final
 * renderiza os valores formatados em BRL
 * 
 */

interface SummaryCardProps {
    title: string,
    value: number,
    type: 'income' | 'outcome' | 'balance';
}

const Summary: React.FC<SummaryCardProps> = ({ title, value, type }) => {

    const formatBRL = (value: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    }

    return (
        <div className={`border rounded p-4 ${type === 'income' ? 'bg-green-50'
            : type === 'outcome' ? 'bg-red-50'
                : 'bg-gray-50'
            }`}>
            <p className='text-sm text-gray-600'>{title}</p>
            <p className={`text-2x1 font-bold ${type === 'income' ? 'text-green-600'
                : type === 'outcome' ? 'text-red-600'
                    : value >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                {formatBRL(value)}
            </p>


        </div>
    )
}

export default Summary;