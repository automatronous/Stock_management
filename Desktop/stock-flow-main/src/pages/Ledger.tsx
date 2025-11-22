import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search } from "lucide-react";
import Layout from "@/components/Layout";

const ledgerData = [
  { id: 1, product: "Coffee Beans – Arabica", category: "Coffee", warehouse: "Main – Churchgate", stock: 245, status: "in-stock" },
  { id: 2, product: "Milk & Dairy – Whole Milk", category: "Dairy", warehouse: "North – Goregaon", stock: 189, status: "in-stock" },
  { id: 3, product: "Bakery – Croissants", category: "Bakery", warehouse: "West – Malad", stock: 12, status: "low" },
  { id: 4, product: "Beverage Syrups – Vanilla", category: "Syrups", warehouse: "Main – Churchgate", stock: 156, status: "in-stock" },
  { id: 5, product: "Snacks – Chips", category: "Snacks", warehouse: "North – Goregaon", stock: 5, status: "critical" },
  { id: 6, product: "Coffee Powder – Espresso Blend", category: "Coffee", warehouse: "West – Malad", stock: 98, status: "in-stock" },
];

const Ledger = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredData = ledgerData.filter((item) => {
    const matchesSearch = item.product.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Stock Ledger</h1>
          <p className="text-muted-foreground mt-1">View and filter your inventory</p>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Coffee">Coffee</SelectItem>
                  <SelectItem value="Dairy">Dairy</SelectItem>
                  <SelectItem value="Bakery">Bakery</SelectItem>
                  <SelectItem value="Syrups">Syrups</SelectItem>
                  <SelectItem value="Snacks">Snacks</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Ledger Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Inventory Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Warehouse</TableHead>
                    <TableHead className="text-right">Stock</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.product}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.warehouse}</TableCell>
                      <TableCell className="text-right">{item.stock}</TableCell>
                      <TableCell>
                        <span
                          className={cn(
                            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                            item.status === "in-stock" && "bg-success/10 text-success",
                            item.status === "low" && "bg-warning/10 text-warning",
                            item.status === "critical" && "bg-destructive/10 text-destructive"
                          )}
                        >
                          {item.status === "in-stock" && "In Stock"}
                          {item.status === "low" && "Low Stock"}
                          {item.status === "critical" && "Critical"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default Ledger;
