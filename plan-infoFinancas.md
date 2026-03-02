# Plano de Desenvolvimento — InfoFinancas (React + TS + Tailwind + localStorage)

## Objetivo

Desenvolver uma aplicação Front-end em React para controle financeiro pessoal, praticando:

- Manipulação de estado
- Filtragem de arrays por data
- Persistência no navegador com `localStorage`

---

## Stack

- React (Vite)
- TypeScript
- Tailwind CSS
- localStorage (sem back-end)

---

## Modelo de Dados (único da aplicação)

```ts
interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string; // formato YYYY-MM-DD
  type: "income" | "outcome";
  category: string;
}
```

---

## Arquitetura Geral

### `App.tsx` (estado global + navegação)

Responsabilidades:

1. Manter estado global `transactions: Transaction[]`
2. Carregar transações do `localStorage` ao iniciar
3. Salvar no `localStorage` sempre que `transactions` mudar (`useEffect`)
4. Manter estado de aba `activeTab: 'cadastro' | 'relatorios'`
5. Expor handlers:
   - `handleAddTransaction(newTransaction)`
   - `handleDeleteTransaction(id)`

---

## Componentes e Requisitos

### 1) `Header.tsx`

Props:

- `activeTab: 'cadastro' | 'relatorios'`
- `onChangeTab: (tab) => void`

Entrega:

- Título do app
- Botões “Cadastro” e “Relatórios”
- Aba ativa com destaque visual

---

### 2) `AddTransaction.tsx` (Cadastro)

Props:

- `onAddTransaction: (transaction: Transaction) => void`

Campos:

- title
- amount
- date (`input type="date"`)
- type (`income` / `outcome`)
- category

Validações no submit:

1. `title.trim()` e `category.trim()` não vazios
2. `amount` convertido para número
3. `amount` válido (`!NaN`) e `> 0`
4. `date` preenchida no formato `YYYY-MM-DD`

Fluxo do submit:

1. `preventDefault()`
2. validar
3. montar objeto `Transaction`:
   - `id: crypto.randomUUID()`
4. enviar para pai via `onAddTransaction`
5. limpar formulário

---

### 3) `Reports.tsx` (Relatórios)

Props:

- `transactions: Transaction[]`
- `onDeleteTransaction: (id: string) => void`

Estado local:

- `selectedMonth: string` no formato `YYYY-MM` (`input type="month"`)

Regras:

1. Filtrar transações:
   - `transaction.date.startsWith(selectedMonth)`
2. Calcular resumo com `reduce()`:
   - total de entradas
   - total de saídas
   - saldo final (`income - outcome`)
3. Renderizar:
   - 3 `SummaryCard`
   - `TransactionList` com transações filtradas

---

### 4) `SummaryCard.tsx`

Props:

- `title: string`
- `value: number`
- `variant?: 'income' | 'outcome' | 'balance'`

Comportamento:

- Exibir valor em BRL (`Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })`)
- Cor:
  - income: verde
  - outcome: vermelho
  - balance: verde se >= 0, vermelho se < 0

---

### 5) `TransactionList.tsx`

Props:

- `transactions: Transaction[]`
- `onDeleteTransaction: (id: string) => void`

Comportamento:

- Renderizar lista (ou tabela) de `TransactionItem`
- Se vazio: mensagem “Nenhuma transação neste período”

---

### 6) `TransactionItem.tsx`

Props:

- `transaction: Transaction`
- `onDelete: (id: string) => void`

Comportamento:

- Exibir:
  - título
  - categoria
  - valor em BRL
  - data formatada `DD/MM/YYYY` (com `date-fns` ou `Intl`)
- Botão excluir chama `onDelete(transaction.id)`

---

## Persistência (localStorage)

Chave:

- `infofinancas:transactions`

Fluxo:

1. Ao iniciar app:
   - ler chave
   - `JSON.parse`
   - fallback para `[]`
2. Ao alterar `transactions`:
   - `localStorage.setItem(chave, JSON.stringify(transactions))`

---

## Formatação (padrões)

### Data

- Armazenamento: `YYYY-MM-DD` (interface `Transaction`)
- Exibição na lista: `DD/MM/YYYY`

### Moeda

- Sempre BRL com `Intl.NumberFormat`

---

## Ordem de Implementação (passo a passo)

1. Definir `Transaction` e estado global em `App.tsx`
2. Implementar `Header.tsx` e troca de abas
3. Finalizar `AddTransaction.tsx` (validação + submit + reset)
4. Conectar `AddTransaction` ao `App.tsx`
5. Criar `Reports.tsx` com filtro por mês
6. Criar `SummaryCard.tsx`
7. Criar `TransactionList.tsx`
8. Criar `TransactionItem.tsx` (formatações + delete)
9. Integrar delete no `App.tsx`
10. Revisar UX/estilo com Tailwind

---

## Critérios de Conclusão (Checklist)

- [ ] Cadastro cria transação válida com `id` único
- [ ] Validações de texto/valor/data/categoria funcionando
- [ ] `localStorage` salva e restaura dados corretamente
- [ ] Navegação entre abas funcionando
- [ ] Filtro mensal em `Reports` funcionando
- [ ] Totais (entrada/saída/saldo) corretos via `reduce`
- [ ] Lista mostra dados formatados (BRL e DD/MM/YYYY)
- [ ] Exclusão remove item do estado e da persistência
- [ ] UI consistente com Tailwind
