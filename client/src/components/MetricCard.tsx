import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  color?: "primary" | "success" | "warning" | "destructive";
}

export function MetricCard({ title, value, icon: Icon, trend, color = "primary" }: MetricCardProps) {
  const colorClasses = {
    primary: "text-primary bg-primary/10",
    success: "text-chart-2 bg-chart-2/10",
    warning: "text-chart-3 bg-chart-3/10",
    destructive: "text-destructive bg-destructive/10"
  };

  return (
    <Card className="p-6" data-testid={`metric-card-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-sm text-muted-foreground mb-2">{title}</p>
          <p className="text-3xl font-bold mb-1" data-testid={`metric-value-${title.toLowerCase().replace(/\s+/g, '-')}`}>{value}</p>
          {trend && (
            <p className={`text-xs ${trend.isPositive ? 'text-chart-2' : 'text-destructive'}`}>
              {trend.isPositive ? '↑' : '↓'} {trend.value}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-md ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </Card>
  );
}
