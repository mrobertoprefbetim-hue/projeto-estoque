import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface Product {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  client?: string;
  company?: string;
}

interface ProductTableProps {
  products: Product[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  const getStockStatus = (quantity: number) => {
    if (quantity === 0) return { label: "Sem Estoque", variant: "destructive" as const, className: "" };
    if (quantity < 10) return { label: "Estoque Baixo", variant: "secondary" as const, className: "bg-chart-3 text-white" };
    return { label: "Em Estoque", variant: "default" as const, className: "bg-chart-2 text-white" };
  };

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Produto</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead className="text-right">Quantidade</TableHead>
            <TableHead className="text-right">Preço</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Empresa</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => {
            const status = getStockStatus(product.quantity);
            return (
              <TableRow key={product.id} className="hover-elevate" data-testid={`table-row-${product.id}`}>
                <TableCell className="font-medium" data-testid={`table-name-${product.id}`}>{product.name}</TableCell>
                <TableCell className="font-mono text-sm" data-testid={`table-sku-${product.id}`}>{product.sku}</TableCell>
                <TableCell className="text-right" data-testid={`table-quantity-${product.id}`}>{product.quantity}</TableCell>
                <TableCell className="text-right" data-testid={`table-price-${product.id}`}>R$ {product.price.toFixed(2)}</TableCell>
                <TableCell className="text-muted-foreground">{product.client || "-"}</TableCell>
                <TableCell className="text-muted-foreground">{product.company || "-"}</TableCell>
                <TableCell>
                  <Badge variant={status.variant} className={status.className}>{status.label}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit?.(product.id)}
                      data-testid={`button-table-edit-${product.id}`}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete?.(product.id)}
                      data-testid={`button-table-delete-${product.id}`}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
