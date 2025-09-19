import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, MapPin, Briefcase, DollarSign, Edit, PlusCircle } from 'lucide-react';

export default function UserProfile() {
  const { user, profile, isLoading, checkProfile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) {
        navigate('/login', { replace: true });
        return;
      }
      // Only check profile if it hasn't been loaded yet
      if (profile === null) {
        const hasProfile = await checkProfile();
        if (!hasProfile) {
          // If no profile found after checking, redirect to create profile
          navigate('/profile/create', { replace: true });
        }
      }
    };

    loadProfile();
  }, [user, profile, checkProfile, navigate]);

  if (isLoading || profile === undefined) { // profile could be undefined initially before checkProfile runs
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent" />
      </div>
    );
  }

  if (!user) {
    // Should be caught by useEffect, but as a fallback
    return null; 
  }

  if (!profile) {
    // This case should also be handled by useEffect redirecting to /profile/create
    // but as a safeguard, we can show a message or redirect again.
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Card className="shadow-card bg-card/95 backdrop-blur border-0 p-8 text-center">
          <User className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Profile Not Found</h3>
          <p className="text-muted-foreground mb-4">
            It looks like you haven't created your profile yet.
          </p>
          <Button onClick={() => navigate('/profile/create')}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Create Profile
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                My Profile
              </h1>
              <p className="text-muted-foreground text-lg">
                View and manage your professional details
              </p>
            </div>
            <Button variant="outline" onClick={() => navigate('/profile/edit')}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>

          <Card className="shadow-card bg-card/95 backdrop-blur border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-6 w-6 text-primary" />
                <span>Personal & Professional Details</span>
              </CardTitle>
              <CardDescription>
                This information is used for job matching and applications.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-2">Name</h4>
                <p className="text-muted-foreground">{profile.name}</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-2 flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Location</span>
                </h4>
                <p className="text-muted-foreground">{profile.location}</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-2 flex items-center space-x-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <span>Years of Experience</span>
                </h4>
                <p className="text-muted-foreground">{profile.yearsExperience} years</p>
              </div>

              {profile.desiredSalary !== undefined && profile.desiredSalary !== null && (
                <div>
                  <h4 className="text-lg font-semibold mb-2 flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    <span>Desired Salary (Annual)</span>
                  </h4>
                  <p className="text-muted-foreground">${profile.desiredSalary.toLocaleString()}</p>
                </div>
              )}

              <div>
                <h4 className="text-lg font-semibold mb-2">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {profile.skills && profile.skills.length > 0 ? (
                    profile.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                        {typeof skill === 'string' ? skill : skill.name}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-muted-foreground">No skills added yet.</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}