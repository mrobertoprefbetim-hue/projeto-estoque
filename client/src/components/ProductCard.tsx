import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  client?: string;
  company?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function ProductCard({
  id,
  name,
  sku,
  quantity,
  price,
  client,
  company,
  onEdit,
  onDelete
}: ProductCardProps) {
  const getStockStatus = () => {
    if (quantity === 0) return { label: "Sem Estoque", variant: "destructive" as const };
    if (quantity < 10) return { label: "Estoque Baixo", variant: "secondary" as const };
    return { label: "Em Estoque", variant: "default" as const };
  };

  const status = getStockStatus();

  return (
    <Card className="p-4 hover-elevate" data-testid={`product-card-${id}`}>
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base mb-1" data-testid={`product-name-${id}`}>{name}</h3>
          <p className="text-xs font-mono text-muted-foreground" data-testid={`product-sku-${id}`}>SKU: {sku}</p>
        </div>
        <Badge variant={status.variant} className={`shrink-0 ${quantity < 10 && quantity > 0 ? 'bg-chart-3 text-white' : ''} ${quantity === 0 ? '' : quantity >= 10 ? 'bg-chart-2 text-white' : ''}`}>
          {status.label}
        </Badge>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
        <div>
          <p className="text-muted-foreground text-xs">Quantidade</p>
          <p className="font-medium" data-testid={`product-quantity-${id}`}>{quantity}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs">Preço</p>
          <p className="font-medium" data-testid={`product-price-${id}`}>R$ {price.toFixed(2)}</p>
        </div>
      </div>

      {(client || company) && (
        <div className="mb-3 text-sm">
          {client && (
            <p className="text-muted-foreground">
              <span className="text-xs">Cliente:</span> <span className="font-medium" data-testid={`product-client-${id}`}>{client}</span>
            </p>
          )}
          {company && (
            <p className="text-muted-foreground">
              <span className="text-xs">Empresa:</span> <span className="font-medium" data-testid={`product-company-${id}`}>{company}</span>
            </p>
          )}
        </div>
      )}

      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1" 
          onClick={onEdit}
          data-testid={`button-edit-${id}`}
        >
          <Pencil className="w-4 h-4 mr-2" />
          Editar
        </Button>
        <Button 
          variant="destructive" 
          size="sm" 
          className="flex-1" 
          onClick={onDelete}
          data-testid={`button-delete-${id}`}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Excluir
        </Button>
      </div>
    </Card>
  );
}
