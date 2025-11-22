import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftRight, TrendingUp } from "lucide-react";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";

const transferHistory = [
  { id: 1, product: "Coffee Beans - Arabica Roast", from: "Churchgate (Main Warehouse)", to: "Goregaon (North Storage)", quantity: 25, status: "in-transit" },
  { id: 2, product: "Bakery - Croissant", from: "Malad (West Hub)", to: "Churchgate (Main Warehouse)", quantity: 24, status: "completed" },
  { id: 3, product: "Milk & Dairy - Whole Milk", from: "Goregaon (North Storage)", to: "Malad (West Hub)", quantity: 50, status: "in-transit" },
];

const Transfer = () => {
  const { toast } = useToast();
  const [transferData, setTransferData] = useState({
    product: "",
    from: "",
    to: "",
    quantity: "",
  });

  const handleTransfer = () => {
    if (transferData.product && transferData.from && transferData.to && transferData.quantity) {
      if (transferData.from === transferData.to) {
        toast({
          title: "Invalid Transfer",
          description: "Source and destination warehouses cannot be the same.",
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Transfer Initiated",
        description: `${transferData.quantity} units of ${transferData.product} from ${transferData.from} to ${transferData.to}`,
      });
      setTransferData({ product: "", from: "", to: "", quantity: "" });
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Stock Transfer</h1>
          <p className="text-muted-foreground mt-1">Transfer stock between warehouses</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Transfer Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">New Transfer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product">Product</Label>
                <Select value={transferData.product} onValueChange={(value) => setTransferData({ ...transferData, product: value })}>
                  <SelectTrigger id="product">
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="coffee-beans-arabica">Coffee Beans - Arabica Roast</SelectItem>
                    <SelectItem value="milk-whole">Milk & Dairy - Whole Milk</SelectItem>
                    <SelectItem value="bakery-croissant">Bakery - Croissant</SelectItem>
                    <SelectItem value="beverage-syrup-vanilla">Beverage Syrups - Vanilla</SelectItem>
                    <SelectItem value="snacks-chips">Snacks - Chips</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="from">From</Label>
                  <Select value={transferData.from} onValueChange={(value) => setTransferData({ ...transferData, from: value })}>
                    <SelectTrigger id="from">
                      <SelectValue placeholder="Source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="main">Churchgate (Main Warehouse)</SelectItem>
                      <SelectItem value="north">Goregaon (North Storage)</SelectItem>
                      <SelectItem value="west">Malad (West Hub)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="to">To</Label>
                  <Select value={transferData.to} onValueChange={(value) => setTransferData({ ...transferData, to: value })}>
                    <SelectTrigger id="to">
                      <SelectValue placeholder="Destination" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="main">Churchgate (Main Warehouse)</SelectItem>
                      <SelectItem value="north">Goregaon (North Storage)</SelectItem>
                      <SelectItem value="west">Malad (West Hub)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="Enter quantity"
                  value={transferData.quantity}
                  onChange={(e) => setTransferData({ ...transferData, quantity: e.target.value })}
                />
              </div>

              <Button onClick={handleTransfer} className="w-full">
                <ArrowLeftRight className="mr-2 h-4 w-4" />
                Initiate Transfer
              </Button>
            </CardContent>
          </Card>

          {/* Transfer History */}
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">Transfer History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transferHistory.map((transfer) => (
                  <div key={transfer.id} className="p-4 border border-border rounded-lg space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{transfer.product}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {transfer.from} → {transfer.to}
                        </p>
                      </div>
                      <Badge variant={transfer.status === "completed" ? "default" : "secondary"}>
                        {transfer.status === "completed" ? "Completed" : "In Transit"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <span className="text-sm text-muted-foreground">Quantity</span>
                      <span className="text-sm font-medium">{transfer.quantity} units</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Transfer;
