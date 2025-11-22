import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBusiness } from '@/contexts/BusinessContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const SetBusinessName = () => {
  const navigate = useNavigate();
  const { setBusinessName } = useBusiness();
  const [name, setName] = useState('');

  const handleContinue = () => {
    if (name.trim()) {
      setBusinessName(name.trim());
    }
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-8">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Name Your Business</CardTitle>
          <CardDescription>
            What would you like to call your business?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="businessName">Business Name</Label>
            <Input
              id="businessName"
              placeholder="e.g., Ukiyo Bakery"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-lg"
            />
          </div>
          <Button
            onClick={handleContinue}
            className="w-full rounded-lg"
          >
            Continue to Dashboard
          </Button>
          <Button
            onClick={handleContinue}
            variant="ghost"
            className="w-full"
          >
            Skip for now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SetBusinessName;
