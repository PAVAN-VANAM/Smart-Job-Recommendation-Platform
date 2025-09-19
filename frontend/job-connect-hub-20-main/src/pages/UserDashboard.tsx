import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { jobsAPI } from '@/lib/api';
import { toast } from '@/hooks/use-toast';
import { JobCard } from '@/components/JobCard';
import { JobFilters } from '@/components/JobFilters';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  Sparkles, 
  Briefcase, 
  User, 
  TrendingUp,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  jobType: string;
  skillsRequired: string[];
  description: string;
  postedDate: string;
  matchPercentage?: number;
}

interface FilterState {
  search: string;
  location: string;
  skills: string[];
  jobType: string[];
  salaryRange: [number, number];
  experienceLevel: string;
}

const initialFilters: FilterState = {
  search: '',
  location: '',
  skills: [],
  jobType: [],
  salaryRange: [50000, 150000],
  experienceLevel: '',
};

// Mock data - replace with actual API calls
const mockRecommendedJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    salary: '$120k - $150k',
    jobType: 'Full-time',
    skillsRequired: ['React', 'TypeScript', 'Node.js', 'AWS'],
    description: 'We are looking for a senior frontend developer to join our dynamic team...',
    postedDate: '2 days ago',
    matchPercentage: 95,
  },
  {
    id: '2',
    title: 'Full Stack Engineer',
    company: 'StartupXYZ',
    location: 'Remote',
    salary: '$100k - $130k',
    jobType: 'Remote',
    skillsRequired: ['JavaScript', 'Python', 'React', 'Docker'],
    description: 'Join our fast-growing startup as a full stack engineer...',
    postedDate: '1 week ago',
    matchPercentage: 87,
  },
];

const mockAllJobs: Job[] = [
  ...mockRecommendedJobs,
  {
    id: '3',
    title: 'Backend Developer',
    company: 'Enterprise Solutions',
    location: 'New York, NY',
    salary: '$90k - $120k',
    jobType: 'Full-time',
    skillsRequired: ['Java', 'Spring Boot', 'SQL', 'AWS'],
    description: 'Looking for an experienced backend developer...',
    postedDate: '3 days ago',
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    company: 'Cloud First',
    location: 'Austin, TX',
    salary: '$110k - $140k',
    jobType: 'Hybrid',
    skillsRequired: ['Docker', 'Kubernetes', 'AWS', 'Python'],
    description: 'Join our DevOps team to build scalable infrastructure...',
    postedDate: '5 days ago',
  },
];

export default function UserDashboard() {
  const { user, profile, checkProfile } = useAuth();
  const navigate = useNavigate();
  const [recommendedJobs, setRecommendedJobs] = useState<Job[]>([]);
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [isLoading, setIsLoading] = useState(true);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState('');

  useEffect(() => {
    const initializeDashboard = async () => {
      if (!user) return;

      // Check if user has a profile
      const hasProfile = await checkProfile();
      if (!hasProfile) {
        navigate('/profile/create');
        return;
      }

      // Load jobs
      await loadJobs();
    };

    initializeDashboard();
  }, [user, checkProfile, navigate]);

  const loadJobs = async () => {
    try {
      setIsLoading(true);
      
      // For now, use mock data
      // In real implementation, uncomment below:
      // const [recommendedResponse, allJobsResponse] = await Promise.all([
      //   jobsAPI.getRecommendations(user!.id, filters),
      //   jobsAPI.getAllJobs(filters)
      // ]);
      // setRecommendedJobs(recommendedResponse.data);
      // setAllJobs(allJobsResponse.data);
      
      setRecommendedJobs(mockRecommendedJobs);
      setAllJobs(mockAllJobs);
    } catch (error) {
      toast({
        title: "Error loading jobs",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = (jobId: string) => {
    const job = [...recommendedJobs, ...allJobs].find(j => j.id === jobId);
    if (job) {
      setSelectedJobTitle(job.title);
      setShowApplicationModal(true);
    }
  };

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    // In real implementation, debounce this call
    loadJobs();
  };

  const clearFilters = () => {
    setFilters(initialFilters);
    loadJobs();
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="bg-gradient-hero rounded-2xl p-8 text-primary-foreground">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Welcome back, {user?.name}! 👋
                </h1>
                <p className="text-primary-foreground/80 text-lg">
                  Discover your next career opportunity
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">{recommendedJobs.length}</div>
                  <div className="text-primary-foreground/80 text-sm">Recommended</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{allJobs.length}</div>
                  <div className="text-primary-foreground/80 text-sm">Total Jobs</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <Card className="bg-gradient-card shadow-soft border-0 hover:shadow-card transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Profile</h3>
                  <p className="text-sm text-muted-foreground">Update your profile</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground ml-auto" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-soft border-0 hover:shadow-card transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-accent/10 rounded-full">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold">Analytics</h3>
                  <p className="text-sm text-muted-foreground">View job insights</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground ml-auto" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-soft border-0 hover:shadow-card transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Applications</h3>
                  <p className="text-sm text-muted-foreground">Track your applications</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground ml-auto" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters */}
        <JobFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onClearFilters={clearFilters}
        />

        {/* Job Listings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8"
        >
          <Tabs defaultValue="recommended" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="recommended" className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4" />
                <span>Recommended ({recommendedJobs.length})</span>
              </TabsTrigger>
              <TabsTrigger value="all" className="flex items-center space-x-2">
                <Briefcase className="h-4 w-4" />
                <span>All Jobs ({allJobs.length})</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="recommended" className="space-y-6">
              {recommendedJobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendedJobs.map((job, index) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      onApply={handleApply}
                      showMatchPercentage={true}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    />
                  ))}
                </div>
              ) : (
                <Card className="bg-gradient-card shadow-soft border-0 text-center p-8">
                  <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No recommendations yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Complete your profile to get personalized job recommendations
                  </p>
                  <Button onClick={() => navigate('/profile')}>
                    Complete Profile
                  </Button>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="all" className="space-y-6">
              {allJobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allJobs.map((job, index) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      onApply={handleApply}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    />
                  ))}
                </div>
              ) : (
                <Card className="bg-gradient-card shadow-soft border-0 text-center p-8">
                  <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters to see more results
                  </p>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Application Modal */}
        <Dialog open={showApplicationModal} onOpenChange={setShowApplicationModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <CheckCircle className="h-6 w-6 text-accent" />
                <span>Application Submitted!</span>
              </DialogTitle>
              <DialogDescription>
                Your application for <strong>{selectedJobTitle}</strong> has been submitted successfully.
                You'll receive updates via email.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => setShowApplicationModal(false)}>
                Close
              </Button>
              <Button onClick={() => navigate('/applications')}>
                View Applications
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}