import { Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const AddFeatureCard = () => {
  const navigate = useNavigate();

  return (
    <Card 
      className="cursor-pointer hover:bg-muted/50 transition-colors border-dashed"
      onClick={() => navigate('/custom-features')}
    >
      <CardContent className="flex flex-col items-center justify-center h-full min-h-[200px] p-6">
        <div className="bg-primary/10 p-4 rounded-full mb-4">
          <Plus className="h-8 w-8 text-primary" />
        </div>
        <p className="text-foreground font-medium">Add Feature</p>
        <p className="text-sm text-muted-foreground text-center mt-2">
          Enable more features for your business
        </p>
      </CardContent>
    </Card>
  );
};

export default AddFeatureCard;
