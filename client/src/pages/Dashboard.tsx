import { useState } from "react";
import { MetricCard } from "@/components/MetricCard";
import { ProductCard } from "@/components/ProductCard";
import { ProductTable } from "@/components/ProductTable";
import { AddProductDialog } from "@/components/AddProductDialog";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, DollarSign, AlertTriangle, Clock, LayoutGrid, LayoutList } from "lucide-react";

// todo: remove mock functionality
const mockProducts = [
  {
    id: "1",
    name: "Notebook Dell Inspiron",
    sku: "NB-DELL-001",
    quantity: 25,
    price: 3499.90,
    client: "João Silva",
    company: "TechCorp Ltda"
  },
  {
    id: "2",
    name: "Mouse Logitech MX Master",
    sku: "MS-LOG-002",
    quantity: 8,
    price: 459.90,
    client: "Maria Santos",
    company: ""
  },
  {
    id: "3",
    name: "Teclado Mecânico RGB",
    sku: "KB-MEC-003",
    quantity: 0,
    price: 589.90,
    client: "",
    company: "Office Supplies Inc"
  },
  {
    id: "4",
    name: "Monitor LG UltraWide",
    sku: "MON-LG-004",
    quantity: 15,
    price: 2199.90,
    client: "Carlos Oliveira",
    company: "Design Studio"
  },
  {
    id: "5",
    name: "Webcam Logitech C920",
    sku: "WC-LOG-005",
    quantity: 3,
    price: 499.90,
    client: "Ana Costa",
    company: ""
  }
];

export default function Dashboard() {
  const [products] = useState(mockProducts); // todo: remove mock functionality
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // todo: remove mock functionality - Calculate metrics from real data
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
  const lowStock = products.filter(p => p.quantity > 0 && p.quantity < 10).length;
  const outOfStock = products.filter(p => p.quantity === 0).length;

  const handleAddProduct = (product: any) => {
    console.log('Add product:', product);
  };

  const handleEditProduct = (id: string) => {
    console.log('Edit product:', id);
  };

  const handleDeleteProduct = (id: string) => {
    console.log('Delete product:', id);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-6 md:py-8 max-w-7xl">
        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          <MetricCard
            title="Total de Produtos"
            value={totalProducts}
            icon={Package}
            trend={{ value: "12% vs mês anterior", isPositive: true }}
            color="primary"
          />
          <MetricCard
            title="Valor do Estoque"
            value={`R$ ${totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
            icon={DollarSign}
            trend={{ value: "8% vs mês anterior", isPositive: true }}
            color="success"
          />
          <MetricCard
            title="Estoque Baixo"
            value={lowStock}
            icon={AlertTriangle}
            trend={{ value: `${outOfStock} sem estoque`, isPositive: false }}
            color="warning"
          />
          <MetricCard
            title="Atualizações Hoje"
            value="24"
            icon={Clock}
            color="primary"
          />
        </div>

        {/* Products Section */}
        <div className="bg-card rounded-lg border border-card-border p-4 md:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold">Produtos</h2>
            <div className="flex items-center gap-3 flex-wrap">
              <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "grid" | "table")} className="hidden md:block">
                <TabsList>
                  <TabsTrigger value="grid" data-testid="button-view-grid">
                    <LayoutGrid className="w-4 h-4 mr-2" />
                    Cards
                  </TabsTrigger>
                  <TabsTrigger value="table" data-testid="button-view-table">
                    <LayoutList className="w-4 h-4 mr-2" />
                    Tabela
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <AddProductDialog onAdd={handleAddProduct} />
            </div>
          </div>

          {products.length === 0 ? (
            <EmptyState
              icon={Package}
              title="Nenhum produto cadastrado"
              description="Você ainda não adicionou produtos ao seu estoque. Comece adicionando seu primeiro produto para começar a gerenciar seu inventário."
              actionLabel="Adicionar Primeiro Produto"
              onAction={() => console.log('Add product')}
            />
          ) : (
            <>
              {/* Mobile always shows cards */}
              <div className="md:hidden">
                <div className="grid grid-cols-1 gap-4">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      {...product}
                      onEdit={() => handleEditProduct(product.id)}
                      onDelete={() => handleDeleteProduct(product.id)}
                    />
                  ))}
                </div>
              </div>

              {/* Desktop shows selected view */}
              <div className="hidden md:block">
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                    {products.map((product) => (
                      <ProductCard
                        key={product.id}
                        {...product}
                        onEdit={() => handleEditProduct(product.id)}
                        onDelete={() => handleDeleteProduct(product.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <ProductTable
                    products={products}
                    onEdit={handleEditProduct}
                    onDelete={handleDeleteProduct}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
