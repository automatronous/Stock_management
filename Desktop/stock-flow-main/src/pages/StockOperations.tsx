import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PackagePlus, PackageMinus } from "lucide-react";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";

const StockOperations = () => {
  const { toast } = useToast();
  const [stockInData, setStockInData] = useState({
    product: "",
    quantity: "",
    warehouse: "",
  });
  const [stockOutData, setStockOutData] = useState({
    product: "",
    quantity: "",
    warehouse: "",
  });

  const handleStockIn = () => {
    if (stockInData.product && stockInData.quantity && stockInData.warehouse) {
      toast({
        title: "Stock Added",
        description: `${stockInData.quantity} units added to ${stockInData.warehouse}`,
      });
      setStockInData({ product: "", quantity: "", warehouse: "" });
    }
  };

  const handleStockOut = () => {
    if (stockOutData.product && stockOutData.quantity && stockOutData.warehouse) {
      toast({
        title: "Stock Removed",
        description: `${stockOutData.quantity} units removed from ${stockOutData.warehouse}`,
      });
      setStockOutData({ product: "", quantity: "", warehouse: "" });
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Stock Operations</h1>
          <p className="text-muted-foreground mt-1">Manage stock in and out operations</p>
        </div>

        <Tabs defaultValue="stock-in" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="stock-in">
              <PackagePlus className="mr-2 h-4 w-4" />
              Stock In
            </TabsTrigger>
            <TabsTrigger value="stock-out">
              <PackageMinus className="mr-2 h-4 w-4" />
              Stock Out
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stock-in">
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Add Stock</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="product-in">Product</Label>
                  <Select value={stockInData.product} onValueChange={(value) => setStockInData({ ...stockInData, product: value })}>
                    <SelectTrigger id="product-in">
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

                <div className="space-y-2">
                  <Label htmlFor="warehouse-in">Warehouse</Label>
                  <Select value={stockInData.warehouse} onValueChange={(value) => setStockInData({ ...stockInData, warehouse: value })}>
                    <SelectTrigger id="warehouse-in">
                      <SelectValue placeholder="Select warehouse" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="main">Main Warehouse</SelectItem>
                      <SelectItem value="north">North Storage</SelectItem>
                      <SelectItem value="west">West Hub</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity-in">Quantity</Label>
                  <Input
                    id="quantity-in"
                    type="number"
                    placeholder="Enter quantity"
                    value={stockInData.quantity}
                    onChange={(e) => setStockInData({ ...stockInData, quantity: e.target.value })}
                  />
                </div>

                <Button onClick={handleStockIn} className="w-full">
                  <PackagePlus className="mr-2 h-4 w-4" />
                  Add Stock
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stock-out">
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Remove Stock</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="product-out">Product</Label>
                  <Select value={stockOutData.product} onValueChange={(value) => setStockOutData({ ...stockOutData, product: value })}>
                    <SelectTrigger id="product-out">
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

                <div className="space-y-2">
                  <Label htmlFor="warehouse-out">Warehouse</Label>
                  <Select value={stockOutData.warehouse} onValueChange={(value) => setStockOutData({ ...stockOutData, warehouse: value })}>
                    <SelectTrigger id="warehouse-out">
                      <SelectValue placeholder="Select warehouse" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="main">Main Warehouse</SelectItem>
                      <SelectItem value="north">North Storage</SelectItem>
                      <SelectItem value="west">West Hub</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity-out">Quantity</Label>
                  <Input
                    id="quantity-out"
                    type="number"
                    placeholder="Enter quantity"
                    value={stockOutData.quantity}
                    onChange={(e) => setStockOutData({ ...stockOutData, quantity: e.target.value })}
                  />
                </div>

                <Button onClick={handleStockOut} className="w-full" variant="destructive">
                  <PackageMinus className="mr-2 h-4 w-4" />
                  Remove Stock
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default StockOperations;
