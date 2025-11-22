import { useNavigate } from 'react-router-dom';
import { useBusiness, BusinessFeatures } from '@/contexts/BusinessContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const features: { id: keyof BusinessFeatures; name: string; description: string }[] = [
  { id: 'expiryTracking', name: 'Expiry Tracking', description: 'Monitor product expiration dates' },
  { id: 'damageLogging', name: 'Damage Logging', description: 'Track damaged inventory items' },
  { id: 'multiWarehouse', name: 'Multi-Warehouse', description: 'Manage multiple storage locations' },
  { id: 'qrGenerator', name: 'QR Generator', description: 'Generate QR codes for products' },
  { id: 'stockTransfer', name: 'Stock Transfer', description: 'Transfer items between warehouses' },
  { id: 'fastMovingAlerts', name: 'Fast-Moving Alerts', description: 'Track high-turnover items' },
  { id: 'lowStockAlerts', name: 'Low Stock Alerts', description: 'Get notified of low inventory' },
  { id: 'stockLedger', name: 'Stock Ledger', description: 'View detailed inventory history' },
  { id: 'serialNumberTracking', name: 'Serial Number Tracking', description: 'Track individual serial numbers' },
  { id: 'warrantyTracking', name: 'Warranty Tracking', description: 'Monitor product warranties' },
  { id: 'batchNumber', name: 'Batch Number', description: 'Track product batches' },
  { id: 'weightBasedItems', name: 'Weight-Based Items', description: 'Manage items sold by weight' },
];

const CustomFeatures = () => {
  const navigate = useNavigate();
  const { features: selectedFeatures, toggleFeature } = useBusiness();

  const handleContinue = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Customize Your Features
          </h1>
          <p className="text-muted-foreground">
            Select the features you need for your business
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Available Features</CardTitle>
            <CardDescription>
              Dashboard and stock ledger view are included by default
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className="flex items-start space-x-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <Switch
                    id={feature.id}
                    checked={selectedFeatures[feature.id]}
                    onCheckedChange={() => toggleFeature(feature.id)}
                  />
                  <div className="flex-1">
                    <Label
                      htmlFor={feature.id}
                      className="text-base font-medium cursor-pointer"
                    >
                      {feature.name}
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-end">
              <Button onClick={handleContinue} size="lg" className="rounded-lg">
                Continue to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomFeatures;
