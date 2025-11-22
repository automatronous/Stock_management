import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useBusiness } from '@/contexts/BusinessContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiresBusiness?: boolean;
}

const ProtectedRoute = ({ children, requiresBusiness = false }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const { businessType } = useBusiness();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (requiresBusiness && !businessType) {
    return <Navigate to="/business-type" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
