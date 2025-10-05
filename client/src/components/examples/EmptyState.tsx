import { EmptyState } from '../EmptyState';
import { Package, Plus } from 'lucide-react';

export default function EmptyStateExample() {
  return (
    <div className="p-6 space-y-8">
      <EmptyState
        icon={Package}
        title="Nenhum produto cadastrado"
        description="Você ainda não adicionou produtos ao seu estoque. Comece adicionando seu primeiro produto para começar a gerenciar seu inventário."
        actionLabel="Adicionar Primeiro Produto"
        onAction={() => console.log('Add first product clicked')}
      />
      
      <div className="border-t pt-8">
        <EmptyState
          icon={Plus}
          title="Conecte sua planilha"
          description="Para começar a usar o StockPro, conecte sua planilha do Google Sheets vazia."
        />
      </div>
    </div>
  );
}
