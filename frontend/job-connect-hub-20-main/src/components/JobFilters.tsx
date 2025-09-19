import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter, X } from 'lucide-react';

interface FilterState {
  search: string;
  location: string;
  skills: string[];
  jobType: string[];
  salaryRange: [number, number];
  experienceLevel: string;
}

interface JobFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClearFilters: () => void;
}

const skillOptions = [
  'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 
  'Java', 'Spring Boot', 'SQL', 'AWS', 'Docker', 'Git', 'MongoDB'
];

const jobTypeOptions = [
  'Full-time', 'Part-time', 'Contract', 'Remote', 'Hybrid'
];

const experienceLevels = [
  'Entry Level', 'Mid Level', 'Senior Level', 'Lead/Principal'
];

export function JobFilters({ filters, onFiltersChange, onClearFilters }: JobFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const updateFilters = (updates: Partial<FilterState>) => {
    onFiltersChange({ ...filters, ...updates });
  };

  const handleSkillToggle = (skill: string) => {
    const updatedSkills = filters.skills.includes(skill)
      ? filters.skills.filter(s => s !== skill)
      : [...filters.skills, skill];
    updateFilters({ skills: updatedSkills });
  };

  const handleJobTypeToggle = (type: string) => {
    const updatedTypes = filters.jobType.includes(type)
      ? filters.jobType.filter(t => t !== type)
      : [...filters.jobType, type];
    updateFilters({ jobType: updatedTypes });
  };

  const hasActiveFilters = filters.search || filters.location || 
    filters.skills.length > 0 || filters.jobType.length > 0 || 
    filters.experienceLevel;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-card shadow-soft border-0">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-primary" />
              <span>Filter Jobs</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClearFilters}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? 'Less' : 'More'} Filters
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Search */}
          <div className="space-y-2">
            <Label htmlFor="search">Search Jobs</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Job title, company, or keywords..."
                value={filters.search}
                onChange={(e) => updateFilters({ search: e.target.value })}
                className="pl-10"
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="City, state, or remote"
              value={filters.location}
              onChange={(e) => updateFilters({ location: e.target.value })}
            />
          </div>

          {/* Job Type - Always visible */}
          <div className="space-y-3">
            <Label>Job Type</Label>
            <div className="grid grid-cols-2 gap-2">
              {jobTypeOptions.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`jobType-${type}`}
                    checked={filters.jobType.includes(type)}
                    onCheckedChange={() => handleJobTypeToggle(type)}
                  />
                  <Label
                    htmlFor={`jobType-${type}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Expandable Filters */}
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 border-t pt-4"
            >
              {/* Skills */}
              <div className="space-y-3">
                <Label>Skills</Label>
                <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                  {skillOptions.map((skill) => (
                    <div key={skill} className="flex items-center space-x-2">
                      <Checkbox
                        id={`skill-${skill}`}
                        checked={filters.skills.includes(skill)}
                        onCheckedChange={() => handleSkillToggle(skill)}
                      />
                      <Label
                        htmlFor={`skill-${skill}`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {skill}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience Level */}
              <div className="space-y-2">
                <Label>Experience Level</Label>
                <Select
                  value={filters.experienceLevel}
                  onValueChange={(value) => updateFilters({ experienceLevel: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any Level</SelectItem>
                    {experienceLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Salary Range */}
              <div className="space-y-3">
                <Label>Salary Range</Label>
                <div className="px-2">
                  <Slider
                    value={filters.salaryRange}
                    onValueChange={(value) => updateFilters({ salaryRange: value as [number, number] })}
                    max={200000}
                    min={30000}
                    step={5000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>${filters.salaryRange[0].toLocaleString()}</span>
                    <span>${filters.salaryRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}