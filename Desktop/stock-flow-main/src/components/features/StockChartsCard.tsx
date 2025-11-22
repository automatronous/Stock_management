import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const stockData = [
  { name: "Coffee Beans", value: 245 },
  { name: "Milk & Dairy", value: 189 },
  { name: "Bakery Items", value: 312 },
  { name: "Syrups", value: 156 },
  { name: "Snacks", value: 98 },
];

const trendData = [
  { month: "Jan", stock: 400 },
  { month: "Feb", stock: 380 },
  { month: "Mar", stock: 420 },
  { month: "Apr", stock: 450 },
  { month: "May", stock: 470 },
  { month: "Jun", stock: 490 },
];

const StockChartsCard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-foreground">Stock by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={stockData}
              margin={{ top: 20, right: 20, left: 20, bottom: 48 }} // reserve space for labels
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                interval={0}        // render every tick (don't auto-skip)
                height={60}         // space for multi-line / rotated labels
                tick={{ fontSize: 14 }}
                tickMargin={12}     // <- ADDED: spacing below labels so they don't touch
              />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
              <Bar dataKey="value" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-foreground">Stock Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={trendData}
              margin={{ top: 20, right: 20, left: 20, bottom: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
              <Line 
                type="monotone" 
                dataKey="stock" 
                stroke="hsl(var(--accent))" 
                strokeWidth={2}
                dot={{ fill: "hsl(var(--accent))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default StockChartsCard;
