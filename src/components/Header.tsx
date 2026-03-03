import React from "react";

/**
 * Componente para navegação entre abas (Cadastro e relatórios)
 * quando clica no botão -> chamar função para mudar de aba
 * Somente exibe e comunica cliques para o pai (App)
 * não contem lógica de transações, nem de exibição de dados, apenas a navegação
 * 
 * recebe do pai:
 *  - activeTab (aba que esta ativa no momento) 
 *  - onTabChange (funcao callback que é chamada quando clicar em botão)
 */

interface HeaderProps {
    activeTab: 'cadastro' | 'relatorios';
    onTabChange: (tab: 'cadastro' | 'relatorios') => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
    return (
        <header className="bg-blue-600 text-white p-4">
            <div className="container mx-auto">

                <h1 className="text-2x1 font-bold"> Info Finanças </h1>
            </div>

            <nav className="flex gap-4 mt-4">
                <button
                    onClick={() => onTabChange('cadastro')}
                    className={`px-4 py-2 rounded font-semibold transition 
                        ${activeTab === 'cadastro'
                            ? 'bg-white text-blue-600'
                            : 'bg-blue-500 text-white hover:bg-blue-400'
                        }`}
                >
                    Cadastro
                </button>

                <button
                    onClick={() => onTabChange('relatorios')}
                    className={`px-4 py-2 rounded font-semibold transition 
                        ${activeTab === 'relatorios'
                            ? 'bg-white text-blue-600'
                            : 'bg-blue-500 text-white hover:bg-blue-400'
                        }`}
                >
                    Cadastro
                </button>
            </nav>




        </header>


    )

}

