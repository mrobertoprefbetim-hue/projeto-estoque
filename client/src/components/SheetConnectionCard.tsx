import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, CheckCircle2, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SheetConnectionCardProps {
  onConnect?: (sheetId: string) => void;
  isConnected?: boolean;
  currentSheetId?: string;
}

export function SheetConnectionCard({ onConnect, isConnected = false, currentSheetId }: SheetConnectionCardProps) {
  const [sheetId, setSheetId] = useState(currentSheetId || "");
  const [error, setError] = useState("");

  const handleConnect = () => {
    if (!sheetId.trim()) {
      setError("Por favor, insira o Sheet ID");
      return;
    }
    setError("");
    onConnect?.(sheetId);
  };

  return (
    <Card className="p-6" data-testid="card-sheet-connection">
      <div className="flex items-start gap-4 mb-4">
        <div className="p-3 rounded-md bg-primary/10 text-primary">
          <Sheet className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1">Conectar Google Sheets</h3>
          <p className="text-sm text-muted-foreground">
            Cole o ID da sua planilha do Google Sheets para sincronizar seus dados
          </p>
        </div>
        {isConnected && (
          <Badge variant="default" className="bg-chart-2">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Conectado
          </Badge>
        )}
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="sheetId">Sheet ID</Label>
          <Input
            id="sheetId"
            value={sheetId}
            onChange={(e) => setSheetId(e.target.value)}
            placeholder="Ex: 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
            className="font-mono text-sm"
            disabled={isConnected}
            data-testid="input-sheet-id"
          />
          {error && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {error}
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            Encontre o Sheet ID na URL da sua planilha: docs.google.com/spreadsheets/d/<span className="font-mono bg-muted px-1 rounded">SHEET_ID</span>/edit
          </p>
        </div>

        <Button 
          onClick={handleConnect} 
          disabled={isConnected}
          className="w-full"
          data-testid="button-connect-sheet"
        >
          {isConnected ? "Planilha Conectada" : "Conectar Planilha"}
        </Button>
      </div>
    </Card>
  );
}
