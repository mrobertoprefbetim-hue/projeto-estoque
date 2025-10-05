import { ProductCard } from '../ProductCard';

export default function ProductCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
      <ProductCard
        id="1"
        name="Notebook Dell Inspiron"
        sku="NB-DELL-001"
        quantity={25}
        price={3499.90}
        client="João Silva"
        company="TechCorp Ltda"
        onEdit={() => console.log('Edit product 1')}
        onDelete={() => console.log('Delete product 1')}
      />
      <ProductCard
        id="2"
        name="Mouse Logitech MX Master"
        sku="MS-LOG-002"
        quantity={8}
        price={459.90}
        client="Maria Santos"
        onEdit={() => console.log('Edit product 2')}
        onDelete={() => console.log('Delete product 2')}
      />
      <ProductCard
        id="3"
        name="Teclado Mecânico RGB"
        sku="KB-MEC-003"
        quantity={0}
        price={589.90}
        company="Office Supplies Inc"
        onEdit={() => console.log('Edit product 3')}
        onDelete={() => console.log('Delete product 3')}
      />
    </div>
  );
}
