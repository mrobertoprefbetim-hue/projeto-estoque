import { Button } from "@/components/ui/button";
import { Package, Menu, X } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  onMenuClick?: () => void;
  showMenuButton?: boolean;
}

export function Header({ onMenuClick, showMenuButton = false }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-3">
          {showMenuButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                onMenuClick?.();
              }}
              className="md:hidden"
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          )}
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-md bg-primary text-primary-foreground">
              <Package className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold" data-testid="app-title">StockPro</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" data-testid="button-logout">
            Sair
          </Button>
        </div>
      </div>
    </header>
  );
}
