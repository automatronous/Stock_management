import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  QrCode, 
  Warehouse, 
  Package, 
  ArrowLeftRight, 
  BookOpen, 
  Bell,
  Menu,
  X,
  LogOut
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useBusiness } from "@/contexts/BusinessContext";

interface LayoutProps {
  children: React.ReactNode;
  hasAlerts?: boolean;
}

const Layout = ({ children, hasAlerts = false }: LayoutProps) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { signOut } = useAuth();
  const { businessName } = useBusiness();
  
  const displayName = businessName || 'Vyavastha';

  const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "QR Generator", href: "/qr-generator", icon: QrCode },
    { name: "Warehouses", href: "/warehouses", icon: Warehouse },
    { name: "Stock Operations", href: "/stock-operations", icon: Package },
    { name: "Transfer", href: "/transfer", icon: ArrowLeftRight },
    { name: "Stock Ledger", href: "/ledger", icon: BookOpen },
    { name: "Alerts", href: "/alerts", icon: Bell, hasAlert: hasAlerts },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 border-r border-border bg-card">
        <div className="flex flex-col gap-2 h-auto border-b border-border px-6 py-4">
          <h1 className="text-xl font-bold text-foreground">{displayName}</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={signOut}
            className="gap-2 justify-start"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors relative",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
                {item.hasAlert && (
                  <span className="absolute right-3 h-2 w-2 rounded-full bg-destructive animate-pulse-alert" />
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <aside className="lg:hidden fixed inset-0 z-40 bg-card border-r border-border">
          <div className="flex flex-col gap-2 h-auto border-b border-border px-6 py-4">
            <h1 className="text-xl font-bold text-foreground">{displayName}</h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={signOut}
              className="gap-2 justify-start"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
          <nav className="px-4 py-6 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors relative",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                  {item.hasAlert && (
                    <span className="absolute right-3 h-2 w-2 rounded-full bg-destructive animate-pulse-alert" />
                  )}
                </Link>
              );
            })}
          </nav>
        </aside>
      )}

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
