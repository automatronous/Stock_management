import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Warehouse, TrendingUp, AlertTriangle } from 'lucide-react';

const StockMetricsCard = () => {
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Items</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">1,234</div>
          <p className="text-xs text-success">+12% from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Active Warehouses</CardTitle>
          <Warehouse className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">8</div>
          <p className="text-xs text-muted-foreground">Across 3 locations</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Fast Moving Items</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">67</div>
          <p className="text-xs text-success">High turnover rate</p>
        </CardContent>
      </Card>

      <Card className="border-destructive/50">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Low Stock Alerts</CardTitle>
          <AlertTriangle className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-destructive">23</div>
          <p className="text-xs text-destructive">Requires attention</p>
        </CardContent>
      </Card>
    </>
  );
};

export default StockMetricsCard;
