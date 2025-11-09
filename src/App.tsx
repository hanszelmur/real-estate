import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { usePropertyStore } from './store/propertyStore';
import { useAppointmentStore } from './store/appointmentStore';
import { useReviewStore } from './store/reviewStore';
import { useNotificationStore } from './store/notificationStore';
import { ToastContainer } from './components/shared/Toast';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

// Auth pages
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';

// Customer pages
import { CustomerDashboardPage } from './pages/customer/CustomerDashboardPage';

function App() {
  const initializeAuth = useAuthStore(state => state.initializeAuth);
  const initializeProperties = usePropertyStore(state => state.initializeProperties);
  const initializeAppointments = useAppointmentStore(state => state.initializeAppointments);
  const initializeReviews = useReviewStore(state => state.initializeReviews);
  const initializeNotifications = useNotificationStore(state => state.initializeNotifications);

  useEffect(() => {
    // Initialize all stores with data from localStorage
    initializeAuth();
    initializeProperties();
    initializeAppointments();
    initializeReviews();
    initializeNotifications();
  }, []);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Customer routes */}
        <Route
          path="/customer/dashboard"
          element={
            <ProtectedRoute allowedRoles={['customer']}>
              <CustomerDashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
