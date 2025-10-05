import { AddProductDialog } from '../AddProductDialog';

export default function AddProductDialogExample() {
  return (
    <div className="p-6 flex justify-center">
      <AddProductDialog
        onAdd={(product) => console.log('Product added:', product)}
      />
    </div>
  );
}
