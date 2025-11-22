import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { useBusiness } from "@/contexts/BusinessContext";
import StockMetricsCard from "@/components/features/StockMetricsCard";
import StockChartsCard from "@/components/features/StockChartsCard";
import RecentActivityCard from "@/components/features/RecentActivityCard";
import AddFeatureCard from "@/components/features/AddFeatureCard";

const Dashboard = () => {
  const { businessName } = useBusiness();

  return (
    <Layout hasAlerts={true}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Real-time inventory overview for {businessName || 'your business'}</p>
        </div>

        {/* Key Metrics - Always visible */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StockMetricsCard />
        </div>

        {/* Charts - Always visible */}
        <StockChartsCard />

        {/* Recent Activity - Always visible */}
        <RecentActivityCard />

        {/* Add Feature Card - Always visible */}
        <div className="grid grid-cols-1">
          <AddFeatureCard />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
