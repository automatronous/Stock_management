import { useNavigate } from 'react-router-dom';
import { useBusiness } from '@/contexts/BusinessContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, ShoppingBag, ShoppingCart, Pill, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const businessTypes = [
  {
    id: 'bakery' as const,
    name: 'Bakery',
    icon: Package,
    description: 'Track expiry, batches, and fast-moving items',
  },
  {
    id: 'kirana' as const,
    name: 'Kirana Store',
    icon: ShoppingCart,
    description: 'Manage weight-based items and multi-warehouse',
  },
  {
    id: 'shoes' as const,
    name: 'Shoes Shop',
    icon: ShoppingBag,
    description: 'Track stock, QR codes, and manage transfers',
  },
  {
    id: 'pharma' as const,
    name: 'Pharma',
    icon: Pill,
    description: 'Monitor expiry, batches, and serial numbers',
  },
  {
    id: 'custom' as const,
    name: 'Custom',
    icon: Settings,
    description: 'Choose your own features',
  },
];

const BusinessTypeSelection = () => {
  const navigate = useNavigate();
  const { setBusinessType } = useBusiness();
  const { signOut } = useAuth();

  const handleSelect = (type: typeof businessTypes[number]['id']) => {
    setBusinessType(type);
    if (type === 'custom') {
      navigate('/custom-features');
    } else {
      navigate('/set-business-name');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              What business are you running?
            </h1>
            <p className="text-muted-foreground">
              Select your business type to get started with optimized features
            </p>
          </div>
          <Button variant="ghost" onClick={signOut}>
            Sign Out
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businessTypes.map((business) => {
            const Icon = business.icon;
            return (
              <Card
                key={business.id}
                className="cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg group"
                onClick={() => handleSelect(business.id)}
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto bg-primary/10 group-hover:bg-primary/20 transition-colors w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{business.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-sm">
                    {business.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BusinessTypeSelection;
