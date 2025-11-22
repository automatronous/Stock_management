import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode, Download } from "lucide-react";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";

const QRGenerator = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    brand: "",
    subcategory: "",
    attributes: "",
  });
  const [qrGenerated, setQrGenerated] = useState(false);

  const handleGenerate = () => {
    if (!formData.brand || !formData.subcategory) {
      toast({
        title: "Missing Information",
        description: "Please fill in brand and sub-category fields.",
        variant: "destructive",
      });
      return;
    }

    setQrGenerated(true);
    toast({
      title: "QR Code Generated",
      description: "Product information logged successfully.",
    });
  };

  const handlePrint = () => {
    toast({
      title: "Printing QR Code",
      description: "Sending to printer and logging to Excel...",
    });
  };

  return (
    <Layout>
      <div className="max-w-4xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">QR Code Generator</h1>
          <p className="text-muted-foreground mt-1">Generate QR codes for your inventory items</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">Product Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="brand">Brand *</Label>
                <Input
                  id="brand"
                  placeholder="Enter brand name"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subcategory">Sub-category *</Label>
                <Input
                  id="subcategory"
                  placeholder="Enter sub-category"
                  value={formData.subcategory}
                  onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="attributes">Attributes</Label>
                <Input
                  id="attributes"
                  placeholder="Enter product attributes"
                  value={formData.attributes}
                  onChange={(e) => setFormData({ ...formData, attributes: e.target.value })}
                />
              </div>

              <Button onClick={handleGenerate} className="w-full">
                <QrCode className="mr-2 h-4 w-4" />
                Generate QR Code
              </Button>
            </CardContent>
          </Card>

          {/* QR Code Display */}
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">Generated QR Code</CardTitle>
            </CardHeader>
            <CardContent>
              {qrGenerated ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-center p-8 bg-secondary rounded-lg">
                    <div className="w-48 h-48 bg-primary rounded-lg flex items-center justify-center">
                      <QrCode className="w-32 h-32 text-primary-foreground" />
                    </div>
                  </div>
                  
                  <div className="space-y-2 p-4 bg-secondary rounded-lg">
                    <p className="text-sm"><span className="font-medium">Brand:</span> {formData.brand}</p>
                    <p className="text-sm"><span className="font-medium">Sub-category:</span> {formData.subcategory}</p>
                    {formData.attributes && (
                      <p className="text-sm"><span className="font-medium">Attributes:</span> {formData.attributes}</p>
                    )}
                  </div>

                  <Button onClick={handlePrint} className="w-full" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Print & Log to Excel
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 border-2 border-dashed border-border rounded-lg">
                  <div className="text-center">
                    <QrCode className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      Fill in the details and generate a QR code
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default QRGenerator;
