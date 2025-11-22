import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { BusinessProvider } from "./contexts/BusinessContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Auth from "./pages/Auth";
import BusinessTypeSelection from "./pages/BusinessTypeSelection";
import SetBusinessName from "./pages/SetBusinessName";
import CustomFeatures from "./pages/CustomFeatures";
import Dashboard from "./pages/Dashboard";
import QRGenerator from "./pages/QRGenerator";
import Warehouses from "./pages/Warehouses";
import StockOperations from "./pages/StockOperations";
import Transfer from "./pages/Transfer";
import Ledger from "./pages/Ledger";
import Alerts from "./pages/Alerts";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BusinessProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route
                path="/business-type"
                element={
                  <ProtectedRoute>
                    <BusinessTypeSelection />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/set-business-name"
                element={
                  <ProtectedRoute>
                    <SetBusinessName />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/custom-features"
                element={
                  <ProtectedRoute>
                    <CustomFeatures />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/"
                element={
                  <ProtectedRoute requiresBusiness>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/qr-generator"
                element={
                  <ProtectedRoute requiresBusiness>
                    <QRGenerator />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/warehouses"
                element={
                  <ProtectedRoute requiresBusiness>
                    <Warehouses />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/stock-operations"
                element={
                  <ProtectedRoute requiresBusiness>
                    <StockOperations />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/transfer"
                element={
                  <ProtectedRoute requiresBusiness>
                    <Transfer />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/ledger"
                element={
                  <ProtectedRoute requiresBusiness>
                    <Ledger />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/alerts"
                element={
                  <ProtectedRoute requiresBusiness>
                    <Alerts />
                  </ProtectedRoute>
                }
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </BusinessProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
