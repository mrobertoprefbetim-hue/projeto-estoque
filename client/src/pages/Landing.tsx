import { Button } from "@/components/ui/button";
import { Package, CheckCircle2, Sheet, BarChart3 } from "lucide-react";

export default function Landing() {
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-md bg-primary text-primary-foreground">
              <Package className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold">StockPro</h1>
          </div>
          <Button onClick={handleLogin} data-testid="button-login">
            Entrar
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 md:py-20 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Controle de Estoque Inteligente
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Gerencie seu inventário de forma eficiente conectando sua planilha do Google Sheets. 
            Dashboard completo com métricas em tempo real.
          </p>
          <Button size="lg" onClick={handleLogin} data-testid="button-get-started">
            Começar Agora
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary mb-4">
              <Sheet className="w-8 h-8" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Integração com Google Sheets</h3>
            <p className="text-muted-foreground">
              Conecte sua planilha existente e sincronize seus dados automaticamente
            </p>
          </div>
          
          <div className="text-center">
            <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary mb-4">
              <BarChart3 className="w-8 h-8" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Dashboard em Tempo Real</h3>
            <p className="text-muted-foreground">
              Visualize métricas importantes e acompanhe seu estoque em tempo real
            </p>
          </div>
          
          <div className="text-center">
            <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Fácil de Usar</h3>
            <p className="text-muted-foreground">
              Interface intuitiva e responsiva, funciona perfeitamente em mobile
            </p>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-card-border p-8">
          <h3 className="text-2xl font-bold mb-6 text-center">Como Funciona</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold mb-3">
                1
              </div>
              <h4 className="font-semibold mb-2">Faça Login</h4>
              <p className="text-sm text-muted-foreground">
                Acesse com sua conta Google, GitHub ou email
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold mb-3">
                2
              </div>
              <h4 className="font-semibold mb-2">Conecte sua Planilha</h4>
              <p className="text-sm text-muted-foreground">
                Cole o ID da sua planilha do Google Sheets
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold mb-3">
                3
              </div>
              <h4 className="font-semibold mb-2">Gerencie Produtos</h4>
              <p className="text-sm text-muted-foreground">
                Adicione, edite e remova produtos do seu estoque
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold mb-3">
                4
              </div>
              <h4 className="font-semibold mb-2">Acompanhe Métricas</h4>
              <p className="text-sm text-muted-foreground">
                Visualize estatísticas e tome decisões informadas
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
