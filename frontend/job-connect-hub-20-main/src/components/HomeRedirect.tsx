import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import HomePage from '@/pages/HomePage';

export function HomeRedirect() {
  const { user, isLoading: isAuthLoading } = useAuth(); // Removed checkProfile from here
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthLoading) {
      return; // Wait for initial auth state to load
    }

    if (user) {
      // User is logged in, redirect to appropriate dashboard based on role
      if (user.role === 'ROLE_USER') {
        navigate('/dashboard', { replace: true });
      } else if (user.role === 'ROLE_RECRUITER') {
        navigate('/recruiter/dashboard', { replace: true });
      }
    }
    // If no user and not loading, HomePage will be rendered
  }, [user, isAuthLoading, navigate]);

  if (isAuthLoading) { // Only show spinner for initial auth loading
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent" />
      </div>
    );
  }

  // If not logged in and not loading, render the HomePage
  if (!user) {
    return <HomePage />;
  }

  // If user is logged in and not loading, useEffect should have handled navigation.
  // This return should ideally not be reached if navigation is successful.
  return null; 
}