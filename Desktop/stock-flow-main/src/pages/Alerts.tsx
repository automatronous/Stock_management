import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Package, Calendar, Send } from "lucide-react";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";

const alerts = [
  { 
    id: 1, 
    type: "low-stock", 
    product: "Tools - Hammer", 
    warehouse: "North Storage", 
    current: 5, 
    threshold: 20, 
    severity: "critical",
    timestamp: "2 hours ago"
  },
  { 
    id: 2, 
    type: "low-stock", 
    product: "Food - Snacks", 
    warehouse: "West Hub", 
    current: 12, 
    threshold: 30, 
    severity: "warning",
    timestamp: "5 hours ago"
  },
  { 
    id: 3, 
    type: "expiry", 
    product: "Food - Fresh Produce", 
    warehouse: "Main Warehouse", 
    expiryDate: "2024-02-15", 
    severity: "critical",
    timestamp: "1 day ago"
  },
  { 
    id: 4, 
    type: "damage", 
    product: "Electronics - Phone", 
    warehouse: "North Storage", 
    damaged: 8, 
    severity: "warning",
    timestamp: "2 days ago"
  },
];

const Alerts = () => {
  const { toast } = useToast();

  const handleSendWhatsApp = (alert: typeof alerts[0]) => {
    toast({
      title: "WhatsApp Notification Sent",
      description: `Alert sent for ${alert.product}`,
    });
  };

  return (
    <Layout hasAlerts={true}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Alerts</h1>
          <p className="text-muted-foreground mt-1">Critical notifications requiring attention</p>
        </div>

        {/* Alert Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-destructive/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Critical Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">
                {alerts.filter(a => a.severity === "critical").length}
              </div>
            </CardContent>
          </Card>

          <Card className="border-warning/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Warnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">
                {alerts.filter(a => a.severity === "warning").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{alerts.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Alert List */}
        <div className="space-y-4">
          {alerts.map((alert) => (
            <Card 
              key={alert.id}
              className={cn(
                "border-2 transition-all",
                alert.severity === "critical" && "border-destructive/50 shadow-lg shadow-destructive/10",
                alert.severity === "warning" && "border-warning/50"
              )}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-4 flex-1">
                    <div className={cn(
                      "p-3 rounded-lg",
                      alert.severity === "critical" && "bg-destructive/10",
                      alert.severity === "warning" && "bg-warning/10"
                    )}>
                      {alert.type === "low-stock" && <Package className={cn(
                        "h-6 w-6",
                        alert.severity === "critical" && "text-destructive",
                        alert.severity === "warning" && "text-warning"
                      )} />}
                      {alert.type === "expiry" && <Calendar className={cn(
                        "h-6 w-6",
                        alert.severity === "critical" && "text-destructive",
                        alert.severity === "warning" && "text-warning"
                      )} />}
                      {alert.type === "damage" && <AlertTriangle className={cn(
                        "h-6 w-6",
                        alert.severity === "critical" && "text-destructive",
                        alert.severity === "warning" && "text-warning"
                      )} />}
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{alert.product}</h3>
                        <Badge variant={alert.severity === "critical" ? "destructive" : "secondary"}>
                          {alert.severity === "critical" ? "Critical" : "Warning"}
                        </Badge>
                      </div>

                      <p className="text-sm text-muted-foreground">
                        {alert.warehouse}
                      </p>

                      {alert.type === "low-stock" && (
                        <p className="text-sm text-foreground">
                          Current stock: <span className="font-medium">{alert.current} units</span> (Threshold: {alert.threshold})
                        </p>
                      )}
                      {alert.type === "expiry" && (
                        <p className="text-sm text-foreground">
                          Expiry date: <span className="font-medium">{alert.expiryDate}</span>
                        </p>
                      )}
                      {alert.type === "damage" && (
                        <p className="text-sm text-foreground">
                          Damaged items: <span className="font-medium">{alert.damaged} units</span>
                        </p>
                      )}

                      <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                    </div>
                  </div>

                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleSendWhatsApp(alert)}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default Alerts;
