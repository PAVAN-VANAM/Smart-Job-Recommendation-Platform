import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { profileAPI } from '@/lib/api';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { User, MapPin, Briefcase, Link as LinkIcon, X } from 'lucide-react';
import { useState } from 'react';

const profileSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  location: z.string().min(2, 'Location is required'),
  experienceYears: z.number().min(0, 'Experience years must be 0 or more').max(50, 'Experience years must be less than 50'),
  resumeLink: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
});

type ProfileForm = z.infer<typeof profileSchema>;

const skillOptions = [
  'JavaScript', 'TypeScript', 'React', 'Vue.js', 'Angular', 'Node.js', 
  'Python', 'Java', 'Spring Boot', 'SQL', 'MongoDB', 'PostgreSQL',
  'AWS', 'Docker', 'Kubernetes', 'Git', 'REST APIs', 'GraphQL',
  'HTML', 'CSS', 'Tailwind CSS', 'SASS', 'Redux', 'Next.js'
];

export default function CreateProfile() {
  const { user, setProfile } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');

  const form = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user?.name || '',
      location: '',
      experienceYears: 0,
      resumeLink: '',
    },
  });

  const onSubmit = async (data: ProfileForm) => {
    if (selectedSkills.length === 0) {
      toast({
        title: "Skills required",
        description: "Please add at least one skill",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const profileData = {
        ...data,
        skills: selectedSkills.join(', '),
        userId: user!.id,
      };

      const response = await profileAPI.createProfile(profileData);
      setProfile(response.data);

      toast({
        title: "Profile created successfully!",
        description: "You can now view personalized job recommendations",
      });

      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Error creating profile",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addSkill = (skill: string) => {
    if (skill && !selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSelectedSkills(selectedSkills.filter(skill => skill !== skillToRemove));
  };

  const handleSkillInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      addSkill(skillInput.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary-foreground mb-2">
              Complete Your Profile
            </h1>
            <p className="text-primary-foreground/80 text-lg">
              Help us find the perfect job matches for you
            </p>
          </div>

          <Card className="shadow-card bg-card/95 backdrop-blur border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-6 w-6 text-primary" />
                <span>Professional Information</span>
              </CardTitle>
              <CardDescription>
                This information will help us recommend relevant job opportunities
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
                            {...field}
                            className="transition-all focus:shadow-soft"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span>Location</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., San Francisco, CA or Remote"
                            {...field}
                            className="transition-all focus:shadow-soft"
                          />
                        </FormControl>
                        <FormDescription>
                          Where you're located or willing to work
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="experienceYears"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center space-x-2">
                          <Briefcase className="h-4 w-4" />
                          <span>Years of Experience</span>
                        </FormLabel>
                        <FormControl>
                          <Select
                            value={field.value.toString()}
                            onValueChange={(value) => field.onChange(parseInt(value))}
                          >
                            <SelectTrigger className="transition-all focus:shadow-soft">
                              <SelectValue placeholder="Select your experience level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">0 - Entry Level</SelectItem>
                              <SelectItem value="1">1 year</SelectItem>
                              <SelectItem value="2">2 years</SelectItem>
                              <SelectItem value="3">3 years</SelectItem>
                              <SelectItem value="5">5 years</SelectItem>
                              <SelectItem value="7">7+ years</SelectItem>
                              <SelectItem value="10">10+ years</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Skills Section */}
                  <div className="space-y-3">
                    <FormLabel>Skills</FormLabel>
                    <div className="space-y-3">
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Type a skill and press Enter"
                          value={skillInput}
                          onChange={(e) => setSkillInput(e.target.value)}
                          onKeyDown={handleSkillInputKeyDown}
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => addSkill(skillInput.trim())}
                          disabled={!skillInput.trim()}
                        >
                          Add
                        </Button>
                      </div>

                      {/* Suggested Skills */}
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Popular skills:</p>
                        <div className="flex flex-wrap gap-2">
                          {skillOptions.slice(0, 8).map((skill) => (
                            <Button
                              key={skill}
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => addSkill(skill)}
                              disabled={selectedSkills.includes(skill)}
                              className="text-xs"
                            >
                              {skill}
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* Selected Skills */}
                      {selectedSkills.length > 0 && (
                        <div>
                          <p className="text-sm font-medium mb-2">Your skills:</p>
                          <div className="flex flex-wrap gap-2">
                            {selectedSkills.map((skill) => (
                              <Badge
                                key={skill}
                                variant="secondary"
                                className="bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer"
                                onClick={() => removeSkill(skill)}
                              >
                                {skill}
                                <X className="h-3 w-3 ml-1" />
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="resumeLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center space-x-2">
                          <LinkIcon className="h-4 w-4" />
                          <span>Resume Link (Optional)</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://drive.google.com/your-resume"
                            {...field}
                            className="transition-all focus:shadow-soft"
                          />
                        </FormControl>
                        <FormDescription>
                          Link to your resume or portfolio (Google Drive, Dropbox, etc.)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex space-x-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate('/dashboard')}
                      className="flex-1"
                    >
                      Skip for Now
                    </Button>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 bg-gradient-primary hover:shadow-elegant"
                    >
                      {isLoading ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-r-transparent" />
                      ) : (
                        'Create Profile'
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}