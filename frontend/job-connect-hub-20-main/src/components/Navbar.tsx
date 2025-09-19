import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Briefcase, 
  User, 
  PlusCircle, 
  LogOut, 
  Home,
  ChevronDown
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Navbar() {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleProfileClick = () => {
    if (user?.role === 'ROLE_USER') {
      if (profile) {
        navigate('/profile');
      } else {
        navigate('/profile/create');
      }
    } else {
      navigate('/recruiter/dashboard'); 
    }
  };

  if (!user) {
    return (
      <nav className="border-b bg-card shadow-soft">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Briefcase className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-primary">JobMatch</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  const isRecruiter = user.role === 'ROLE_RECRUITER';

  // Safely determine the display name and initial
  const getDisplayName = () => {
    if (!user?.name) return 'Job Taker';
    if (typeof user.name === 'string') return user.name;
    // Handle case where user.name might be an object like { id: ..., name: '...' }
    if (typeof (user.name as any)?.name === 'string') return (user.name as any).name;
    return 'Job Taker';
  };

  const displayName = getDisplayName();
  const displayInitial = (displayName[0] || 'J').toUpperCase();

  return (
    <nav className="border-b bg-card shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Briefcase className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-primary">JobMatch</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link 
              to={isRecruiter ? "/recruiter/dashboard" : "/dashboard"}
              className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            
            {isRecruiter ? (
              <Link 
                to="/recruiter/jobs"
                className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                <Briefcase className="h-4 w-4" />
                <span>My Jobs</span>
              </Link>
            ) : (
              <Link 
                to="/jobs"
                className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                <Briefcase className="h-4 w-4" />
                <span>All Jobs</span>
              </Link>
            )}
            
            {isRecruiter && (
              <Button variant="outline" size="sm" asChild>
                <Link to="/recruiter/post-job">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Post Job
                </Link>
              </Button>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-foreground">
                      {displayInitial}
                    </span>
                  </div>
                  <span className="text-sm font-medium">{displayName}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={handleProfileClick} className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}