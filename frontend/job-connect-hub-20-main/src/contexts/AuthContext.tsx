import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, profileAPI } from '@/lib/api';
import { toast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'ROLE_USER' | 'ROLE_RECRUITER';
}

interface Profile {
  id: number;
  name: string;
  location: string;
  skills: string[];
  yearsExperience: number;
  desiredSalary?: number;
  resumeLink?: string;
  userId: number;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    name: string;
    email: string;
    password: string;
    role: 'ROLE_USER' | 'ROLE_RECRUITER';
  }) => Promise<void>;
  logout: () => void;
  checkProfile: () => Promise<boolean>;
  setProfile: (profile: Profile) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfileState] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Start as true for initial auth check

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('jwt_token');
      const userData = localStorage.getItem('user_data');
      
      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('jwt_token');
          localStorage.removeItem('user_data');
          setUser(null); // Ensure user is null if parsing fails
        }
      }
      setIsLoading(false); // Initial auth check complete
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await authAPI.login(email, password);
      const { token, user : userData } = response.data;
      
      localStorage.setItem('jwt_token', token);
      localStorage.setItem('user_data', JSON.stringify(userData));
      setUser(userData);

      toast({
        title: "Login successful",
        description: "Welcome to SMART JOB!",
      });
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.response?.data?.message || "Invalid credentials",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: {
    name: string;
    email: string;
    password: string;
    role: 'ROLE_USER' | 'ROLE_RECRUITER';
  }) => {
    try {
      setIsLoading(true);
      await authAPI.register(userData);
      
      toast({
        title: "Registration successful",
        description: "Please log in with your credentials",
      });
      
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_data');
    setUser(null);
    setProfileState(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  const checkProfile = async (): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const response = await profileAPI.getProfile(user.id);
      setProfileState(response.data);
      return true;
    } catch (error: any) {
      if (error.response?.status === 404) {
        setProfileState(null); // Ensure profile is null if not found
        return false; // Profile doesn't exist
      }
      console.error('Error checking profile:', error);
      setProfileState(null); 
      return false;
    }
  };

  const setProfile = (profile: Profile) => {
    setProfileState(profile);
  };

  const value = {
    user,
    profile,
    isLoading,
    login,
    register,
    logout,
    checkProfile,
    setProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}