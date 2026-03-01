import { useState } from 'react'
import './App.css'

/**
 * Componente que gerencia estados locais para armazenar os campos do formulário de transação e a função de envio.
 * Validar os dados antes de enviar
 * Gerar Id unico
 * Chamar a funcao onAddTransactionSubmit para enviar os dados para o componente pai (App.tsx)
 * limpar campos do formulário após o envio
 * no formulário usamos os setters dos states
 */

interface AddTransactionProps {
    onAddTransactionSubmit: (
        id: string,
        title: string,
        amount: number,
        date: string,
        type: 'income' | 'outcome'
    ) => void;
}

const AddTransaction: React.FC<AddTransactionProps> = ({ onAddTransactionSubmit }) => {

    const [title, setTitle] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);
    const [date, setDate] = useState<string>('');
    const [type, setType] = useState<'income' | 'outcome'>('income');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); //evita que a pagina recarregue ao enviar o formulário

        if (!title.trim() || amount <= 0 || !date.trim()) {
            alert('Por favor, preencha todos os campos corretamente.');
            return;
        }

        const id = crypto.randomUUID();

        onAddTransactionSubmit(id, title, amount, date, type);

        setTitle('');
        setAmount(0);
        setDate('');
        setType('income');

    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-4'>
            <h2 className='text-x1 font-bold'>Adicionar Transação</h2>

            <input
                type="text"
                placeholder="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='border p-2 rounded'
            />

            <input
                type="text"
                placeholder="Título"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className='border p-2 rounded'
            />

            <input
                type="text"
                placeholder="Título"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className='border p-2 rounded'
            />

            <div className="flex gap-4">
                <label>
                    <input
                        type="radio"
                        name="type"
                        value="income"
                        checked={type === 'income'}
                        onChange={() => setType('income')}
                    />
                    Entrada
                </label>
                <label>
                    <input
                        type="radio"
                        name="type"
                        value="outcome"
                        checked={type === 'outcome'}
                        onChange={() => setType('outcome')}
                    />
                    Saída
                </label>
            </div>

            <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
                Adicionar
            </button>

        </form>
    );
}

export default AddTransaction
