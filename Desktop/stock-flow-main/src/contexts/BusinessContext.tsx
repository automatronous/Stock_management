import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type BusinessType = 'bakery' | 'kirana' | 'shoes' | 'pharma' | 'custom' | null;

export interface BusinessFeatures {
  expiryTracking: boolean;
  damageLogging: boolean;
  multiWarehouse: boolean;
  qrGenerator: boolean;
  stockTransfer: boolean;
  fastMovingAlerts: boolean;
  lowStockAlerts: boolean;
  stockLedger: boolean;
  serialNumberTracking: boolean;
  warrantyTracking: boolean;
  batchNumber: boolean;
  weightBasedItems: boolean;
}

interface BusinessContextType {
  businessType: BusinessType;
  businessName: string;
  features: BusinessFeatures;
  setBusinessType: (type: BusinessType) => void;
  setBusinessName: (name: string) => void;
  setFeatures: (features: BusinessFeatures) => void;
  toggleFeature: (feature: keyof BusinessFeatures) => void;
}

const defaultFeatures: BusinessFeatures = {
  expiryTracking: false,
  damageLogging: false,
  multiWarehouse: false,
  qrGenerator: false,
  stockTransfer: false,
  fastMovingAlerts: false,
  lowStockAlerts: false,
  stockLedger: false,
  serialNumberTracking: false,
  warrantyTracking: false,
  batchNumber: false,
  weightBasedItems: false,
};

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

export const BusinessProvider = ({ children }: { children: ReactNode }) => {
  const [businessType, setBusinessTypeState] = useState<BusinessType>(null);
  const [businessName, setBusinessNameState] = useState<string>('');
  const [features, setFeaturesState] = useState<BusinessFeatures>(defaultFeatures);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('vyavastha_business');
    if (stored) {
      const data = JSON.parse(stored);
      setBusinessTypeState(data.businessType);
      setBusinessNameState(data.businessName);
      setFeaturesState(data.features);
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (businessType) {
      localStorage.setItem('vyavastha_business', JSON.stringify({
        businessType,
        businessName,
        features
      }));
    }
  }, [businessType, businessName, features]);

  const setBusinessType = (type: BusinessType) => {
    setBusinessTypeState(type);
    
    // Set default features based on business type
    if (type === 'bakery') {
      setFeaturesState({
        ...defaultFeatures,
        expiryTracking: true,
        fastMovingAlerts: true,
        lowStockAlerts: true,
        batchNumber: true,
        qrGenerator: true,
      });
    } else if (type === 'kirana') {
      setFeaturesState({
        ...defaultFeatures,
        weightBasedItems: true,
        lowStockAlerts: true,
        fastMovingAlerts: true,
        multiWarehouse: true,
        stockLedger: true,
      });
    } else if (type === 'shoes') {
      setFeaturesState({
        ...defaultFeatures,
        stockLedger: true,
        qrGenerator: true,
        multiWarehouse: true,
        damageLogging: true,
        stockTransfer: true,
      });
    } else if (type === 'pharma') {
      setFeaturesState({
        ...defaultFeatures,
        expiryTracking: true,
        batchNumber: true,
        damageLogging: true,
        lowStockAlerts: true,
        serialNumberTracking: true,
      });
    }
  };

  const setBusinessName = (name: string) => {
    setBusinessNameState(name);
  };

  const setFeatures = (newFeatures: BusinessFeatures) => {
    setFeaturesState(newFeatures);
  };

  const toggleFeature = (feature: keyof BusinessFeatures) => {
    setFeaturesState(prev => ({
      ...prev,
      [feature]: !prev[feature]
    }));
  };

  return (
    <BusinessContext.Provider
      value={{
        businessType,
        businessName,
        features,
        setBusinessType,
        setBusinessName,
        setFeatures,
        toggleFeature,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};

export const useBusiness = () => {
  const context = useContext(BusinessContext);
  if (context === undefined) {
    throw new Error('useBusiness must be used within a BusinessProvider');
  }
  return context;
};
