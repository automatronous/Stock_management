import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Warehouse, Plus, MapPin } from "lucide-react";
import Layout from "@/components/Layout";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const initialWarehouses = [
  { id: 1, name: "Main Warehouse", location: "Churchgate", capacity: 10000, used: 7500 },
  { id: 2, name: "North Storage", location: "Goregaon", capacity: 5000, used: 3200 },
  { id: 3, name: "West Hub", location: "Malad", capacity: 8000, used: 6400 },
];

const Warehouses = () => {
  const [warehouses, setWarehouses] = useState(initialWarehouses);
  const [isOpen, setIsOpen] = useState(false);
  const [newWarehouse, setNewWarehouse] = useState({
    name: "",
    location: "",
    capacity: "",
  });

  const handleAddWarehouse = () => {
    if (newWarehouse.name && newWarehouse.location && newWarehouse.capacity) {
      setWarehouses([
        ...warehouses,
        {
          id: warehouses.length + 1,
          name: newWarehouse.name,
          location: newWarehouse.location,
          capacity: parseInt(newWarehouse.capacity),
          used: 0,
        },
      ]);
      setNewWarehouse({ name: "", location: "", capacity: "" });
      setIsOpen(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Warehouses</h1>
            <p className="text-muted-foreground mt-1">Manage your storage locations</p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Warehouse
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Warehouse</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Warehouse Name</Label>
                  <Input
                    id="name"
                    value={newWarehouse.name}
                    onChange={(e) => setNewWarehouse({ ...newWarehouse, name: e.target.value })}
                    placeholder="Enter warehouse name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={newWarehouse.location}
                    onChange={(e) => setNewWarehouse({ ...newWarehouse, location: e.target.value })}
                    placeholder="Enter location"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacity (units)</Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={newWarehouse.capacity}
                    onChange={(e) => setNewWarehouse({ ...newWarehouse, capacity: e.target.value })}
                    placeholder="Enter capacity"
                  />
                </div>
                <Button onClick={handleAddWarehouse} className="w-full">
                  Add Warehouse
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {warehouses.map((warehouse) => {
            const usagePercent = (warehouse.used / warehouse.capacity) * 100;
            return (
              <Card key={warehouse.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Warehouse className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">{warehouse.name}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {warehouse.location}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Capacity Used</span>
                      <span className="font-medium">
                        {warehouse.used.toLocaleString()} / {warehouse.capacity.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={usagePercent} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      {usagePercent.toFixed(1)}% capacity used
                    </p>
                  </div>

                  <div className="flex justify-between text-sm pt-2 border-t border-border">
                    <span className="text-muted-foreground">Available Space</span>
                    <span className="font-medium text-success">
                      {(warehouse.capacity - warehouse.used).toLocaleString()} units
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Warehouses;
