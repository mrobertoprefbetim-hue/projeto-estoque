import { SheetConnectionCard } from '../SheetConnectionCard';

export default function SheetConnectionCardExample() {
  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <SheetConnectionCard
        onConnect={(sheetId) => console.log('Connected to sheet:', sheetId)}
        isConnected={false}
      />
      
      <SheetConnectionCard
        isConnected={true}
        currentSheetId="1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
        onConnect={(sheetId) => console.log('Connected to sheet:', sheetId)}
      />
    </div>
  );
}
