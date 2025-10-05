import { useState } from "react";
import { SheetConnectionCard } from "@/components/SheetConnectionCard";
import { Button } from "@/components/ui/button";
import { Package, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";

export default function Setup() {
  const [, setLocation] = useLocation();
  const [isConnected, setIsConnected] = useState(false);
  const [sheetId, setSheetId] = useState("");

  const handleConnect = (id: string) => {
    console.log('Connecting to sheet:', id);
    setSheetId(id);
    setIsConnected(true);
  };

  const handleContinue = () => {
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center gap-2">
          <div className="p-2 rounded-md bg-primary text-primary-foreground">
            <Package className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold">StockPro</h1>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Bem-vindo ao StockPro</h2>
          <p className="text-muted-foreground text-lg">
            Configure sua conexão com o Google Sheets para começar a gerenciar seu estoque
          </p>
        </div>

        <div className="space-y-6">
          <SheetConnectionCard
            onConnect={handleConnect}
            isConnected={isConnected}
            currentSheetId={sheetId}
          />

          {isConnected && (
            <div className="flex justify-center">
              <Button size="lg" onClick={handleContinue} data-testid="button-continue">
                Continuar para o Dashboard
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          )}

          <div className="bg-card rounded-lg border border-card-border p-6">
            <h3 className="font-semibold mb-3">Como funciona?</h3>
            <ol className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="font-semibold text-foreground">1.</span>
                <span>Crie uma planilha vazia no Google Sheets</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-foreground">2.</span>
                <span>Copie o ID da planilha da URL (a parte entre /d/ e /edit)</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-foreground">3.</span>
                <span>Cole o ID acima e clique em "Conectar Planilha"</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-foreground">4.</span>
                <span>Pronto! Seus dados serão sincronizados automaticamente</span>
              </li>
            </ol>
          </div>
        </div>
      </main>
    </div>
  );
}
