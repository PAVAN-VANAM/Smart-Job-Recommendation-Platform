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
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
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
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium">{user.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Link>
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