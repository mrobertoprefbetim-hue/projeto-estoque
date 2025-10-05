import { ProductTable } from '../ProductTable';

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
  }
];

export default function ProductTableExample() {
  return (
    <div className="p-6">
      <ProductTable
        products={mockProducts}
        onEdit={(id) => console.log('Edit product:', id)}
        onDelete={(id) => console.log('Delete product:', id)}
      />
    </div>
  );
}
