import { MetricCard } from '../MetricCard';
import { Package, DollarSign, AlertTriangle, Clock } from 'lucide-react';

export default function MetricCardExample() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      <MetricCard
        title="Total de Produtos"
        value="156"
        icon={Package}
        trend={{ value: "12% vs mês anterior", isPositive: true }}
        color="primary"
      />
      <MetricCard
        title="Valor do Estoque"
        value="R$ 45.320"
        icon={DollarSign}
        trend={{ value: "8% vs mês anterior", isPositive: true }}
        color="success"
      />
      <MetricCard
        title="Estoque Baixo"
        value="8"
        icon={AlertTriangle}
        trend={{ value: "3 produtos críticos", isPositive: false }}
        color="warning"
      />
      <MetricCard
        title="Atualizações Hoje"
        value="24"
        icon={Clock}
        color="primary"
      />
    </div>
  );
}
