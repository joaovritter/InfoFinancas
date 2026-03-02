# Plano de Desenvolvimento — InfoFinancas (ATUALIZADO)

## Objetivo (mantido)

Concluir a aplicação de controle financeiro pessoal em React, com foco em:

- estado global organizado
- filtros por mês
- persistência em `localStorage`

---

## Diagnóstico do estado atual (02/03/2026)

### O que já existe

- `src/App.tsx` com estado e persistência básica
- `src/components/addTransaction.tsx` com formulário inicial
- `src/components/reports.tsx` com estrutura de filtro e resumo

### Principais desalinhamentos encontrados

1. **Modelo inconsistente entre arquivos**
   - `App.tsx` usa `date: Date`
   - `addTransaction.tsx` envia data formatada `dd-MM-yyyy`
   - `reports.tsx` espera `category` e parseia `dd-MM-yyyy`

2. **Persistência com chave diferente do plano antigo**
   - código atual usa `transactions`
   - padrão desejado: `infofinancas:transactions`

3. **`AddTransaction` incompleto**
   - ainda sem campo `category`
   - assinatura de callback fragmentada em vários parâmetros
   - importa `./App.css` (caminho incorreto para o componente)

4. **`Reports` incompleto**
   - input de mês ainda está `type="text"`
   - resumo é calculado, mas não está renderizado
   - lista e remoção ainda não foram implementadas na UI

5. **Navegação por abas ainda não existe**
   - falta componente `Header`
   - falta estado `activeTab`

---

## Padrão único de dados (definitivo)

```ts
interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string; // YYYY-MM-DD
  type: "income" | "outcome";
  category: string;
}
```

> Decisão: o formato salvo será **sempre `YYYY-MM-DD`**. Isso simplifica filtro mensal com `startsWith("YYYY-MM")`.

---

## Arquitetura alvo (versão final)

### `App.tsx`

- estado global `transactions: Transaction[]`
- estado de aba `activeTab: 'cadastro' | 'relatorios'`
- `handleAddTransaction(transaction: Transaction)`
- `handleDeleteTransaction(id: string)`
- load/save no `localStorage` com chave `infofinancas:transactions`

### Componentes

1. `Header.tsx` — troca de abas
2. `addTransaction.tsx` — cadastro completo
3. `reports.tsx` — filtro mensal + resumo + lista
4. `SummaryCard.tsx` — card de total
5. `TransactionList.tsx` — lista vazia/itens
6. `TransactionItem.tsx` — item com formatação e exclusão

---

## Próximos passos (ordem realista)

1. **Unificar o tipo `Transaction` em `App.tsx`**
2. **Ajustar persistência para `infofinancas:transactions`**
3. **Refatorar `addTransaction.tsx`**
   - incluir `category`
   - trocar callback para objeto único `Transaction`
   - manter `date` como string `YYYY-MM-DD`
4. **Conectar cadastro no `App.tsx`**
5. **Criar `Header.tsx` e navegação por abas**
6. **Completar `reports.tsx`**
   - `input type="month"`
   - filtro via `startsWith(selectedMonth)`
   - render de resumo
7. **Criar `SummaryCard.tsx`**
8. **Criar `TransactionList.tsx` e `TransactionItem.tsx`**
9. **Integrar exclusão no relatório**
10. **Revisar UX com Tailwind**

---

## Checklist atualizado

- [ ] Tipo `Transaction` único em toda a app
- [ ] Data padronizada em `YYYY-MM-DD` no armazenamento
- [ ] `AddTransaction` com validação de título, categoria, valor e data
- [ ] Persistência com chave `infofinancas:transactions`
- [ ] Navegação entre abas (`cadastro`/`relatorios`)
- [ ] Filtro mensal funcional em `Reports`
- [ ] Resumo (entrada/saída/saldo) renderizado corretamente
- [ ] Lista com estado vazio e exclusão por item
- [ ] Formatação BRL e data `DD/MM/YYYY` na exibição
- [ ] Estilo consistente com Tailwind
