import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  DollarSign, 
  Clock, 
  Building, 
  ExternalLink,
  Bookmark,
  BookmarkCheck
} from 'lucide-react';
import { useState } from 'react';

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

interface JobCardProps {
  job: Job;
  onApply: (jobId: string) => void;
  showMatchPercentage?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function JobCard({ job, onApply, showMatchPercentage = false, className = "", style }: JobCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(!isSaved);
    // TODO: Implement save job functionality
  };

  const skillsToShow = job.skillsRequired.slice(0, 3);
  const remainingSkills = job.skillsRequired.length - skillsToShow.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={className}
      style={style}
    >
      <Card className="h-full bg-gradient-card shadow-card hover:shadow-elegant transition-all duration-300 border-0">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-foreground mb-1 line-clamp-1">
                {job.title}
              </h3>
              <div className="flex items-center text-muted-foreground mb-2">
                <Building className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">{job.company}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {showMatchPercentage && job.matchPercentage && (
                <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">
                  {job.matchPercentage}% match
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSave}
                className="p-2 h-8 w-8"
              >
                {isSaved ? (
                  <BookmarkCheck className="h-4 w-4 text-accent" />
                ) : (
                  <Bookmark className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-3 pb-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{job.postedDate}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm">
              <DollarSign className="h-4 w-4 mr-1 text-accent" />
              <span className="font-medium text-accent">{job.salary}</span>
            </div>
            <Badge variant="outline" className="text-xs">
              {job.jobType}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {job.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {skillsToShow.map((skill) => (
              <Badge 
                key={skill} 
                variant="secondary" 
                className="text-xs bg-primary/10 text-primary hover:bg-primary/20"
              >
                {skill}
              </Badge>
            ))}
            {remainingSkills > 0 && (
              <Badge variant="secondary" className="text-xs bg-muted">
                +{remainingSkills} more
              </Badge>
            )}
          </div>
        </CardContent>

        <CardFooter className="pt-0">
          <div className="flex space-x-2 w-full">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View Details
            </Button>
            <Button 
              onClick={() => onApply(job.id)}
              size="sm" 
              className="flex-1 bg-gradient-primary hover:shadow-soft"
            >
              Apply Now
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}