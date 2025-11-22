import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const activities = [
  { action: "Stock In", item: "Coffee Beans - Arabica Roast", quantity: "+50", time: "2 hours ago", type: "success" },
  { action: "Transfer", item: "Bakery - Croissants (Kitchen → Counter)", quantity: "24", time: "5 hours ago", type: "info" },
  { action: "Stock Out", item: "Milk & Dairy - Whole Milk", quantity: "-30", time: "8 hours ago", type: "warning" },
  { action: "Low Stock Alert", item: "Beverage Syrups - Vanilla", quantity: "2 left", time: "1 day ago", type: "alert" },
];

const RecentActivityCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-foreground">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{activity.action}</p>
                <p className="text-xs text-muted-foreground">{activity.item}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className={cn(
                  "text-sm font-medium",
                  activity.type === "success" && "text-success",
                  activity.type === "warning" && "text-warning",
                  activity.type === "alert" && "text-destructive",
                  activity.type === "info" && "text-foreground"
                )}>
                  {activity.quantity}
                </span>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivityCard;
