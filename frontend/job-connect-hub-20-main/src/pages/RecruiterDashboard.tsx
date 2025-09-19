import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  PlusCircle, 
  Briefcase, 
  Users, 
  Eye, 
  Edit,
  Trash2,
  TrendingUp
} from 'lucide-react';

interface Job {
  id: string;
  title: string;
  location: string;
  salary: string;
  jobType: string;
  applicants: number;
  status: 'Active' | 'Paused' | 'Closed';
  postedDate: string;
}

// Mock data - replace with actual API calls
const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    location: 'San Francisco, CA',
    salary: '$120k - $150k',
    jobType: 'Full-time',
    applicants: 24,
    status: 'Active',
    postedDate: '2 days ago',
  },
  {
    id: '2',
    title: 'Backend Engineer',
    location: 'Remote',
    salary: '$100k - $130k',
    jobType: 'Remote',
    applicants: 18,
    status: 'Active',
    postedDate: '1 week ago',
  },
  {
    id: '3',
    title: 'DevOps Specialist',
    location: 'Austin, TX',
    salary: '$110k - $140k',
    jobType: 'Hybrid',
    applicants: 12,
    status: 'Paused',
    postedDate: '2 weeks ago',
  },
];

export default function RecruiterDashboard() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setJobs(mockJobs);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: Job['status']) => {
    switch (status) {
      case 'Active':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'Paused':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Closed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent" />
      </div>
    );
  }

  const totalApplicants = jobs.reduce((sum, job) => sum + job.applicants, 0);
  const activeJobs = jobs.filter(job => job.status === 'Active').length;

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
                  Manage your job postings and find great candidates
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">{activeJobs}</div>
                  <div className="text-primary-foreground/80 text-sm">Active Jobs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{totalApplicants}</div>
                  <div className="text-primary-foreground/80 text-sm">Total Applicants</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <Card className="bg-gradient-card shadow-soft border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Jobs</p>
                  <p className="text-2xl font-bold">{jobs.length}</p>
                </div>
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-soft border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Jobs</p>
                  <p className="text-2xl font-bold">{activeJobs}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-soft border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Applicants</p>
                  <p className="text-2xl font-bold">{totalApplicants}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-soft border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Applicants</p>
                  <p className="text-2xl font-bold">
                    {jobs.length > 0 ? Math.round(totalApplicants / jobs.length) : 0}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-between items-center mb-6"
        >
          <h2 className="text-2xl font-bold">Your Job Postings</h2>
          <Button asChild className="bg-gradient-primary hover:shadow-elegant">
            <Link to="/recruiter/post-job">
              <PlusCircle className="h-4 w-4 mr-2" />
              Post New Job
            </Link>
          </Button>
        </motion.div>

        {/* Job Listings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-4"
        >
          {jobs.length > 0 ? (
            jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="bg-gradient-card shadow-card hover:shadow-elegant transition-all duration-300 border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold">{job.title}</h3>
                          <Badge className={getStatusColor(job.status)}>
                            {job.status}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                          <span>{job.location}</span>
                          <span>{job.salary}</span>
                          <span>{job.jobType}</span>
                          <span>Posted {job.postedDate}</span>
                        </div>
                        
                        <div className="flex items-center space-x-4 mt-3">
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">{job.applicants} applicants</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <Card className="bg-gradient-card shadow-soft border-0 text-center p-12">
              <Briefcase className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No jobs posted yet</h3>
              <p className="text-muted-foreground mb-6">
                Start by posting your first job to attract great candidates
              </p>
              <Button asChild className="bg-gradient-primary hover:shadow-elegant">
                <Link to="/recruiter/post-job">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Post Your First Job
                </Link>
              </Button>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
}