import { useState } from 'react';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { Phone, Mail, MapPin, AlertCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Contact = () => {
  const [formData, setFormData] = useState({
    helpTopic: '',
    fullName: '',
    emailAddress: '',
    mobileNumber: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, helpTopic: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.helpTopic || !formData.fullName || !formData.emailAddress || !formData.message) {
      toast.error('Please fill in all required fields.');
      return;
    }

    try {
      setIsSubmitting(true);
      await api.submitContact(formData);
      toast.success('Thank you for reaching out! We will get back to you soon.');
      setFormData({
        helpTopic: '',
        fullName: '',
        emailAddress: '',
        mobileNumber: '',
        message: ''
      });
    } catch (error) {
      toast.error('Failed to submit contact form. Please try again later.');
      console.error('Contact submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 overflow-hidden bg-muted">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop")' }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            We would love to hear from you!
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-card border rounded-xl p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Select onValueChange={handleSelectChange} value={formData.helpTopic}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="How can we help you? *" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Donation Inquiry">Donation Inquiry</SelectItem>
                      <SelectItem value="Need Food Assistance">Need Food Assistance</SelectItem>
                      <SelectItem value="Report an Issue">Report an Issue</SelectItem>
                      <SelectItem value="Partnership">Partnership</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Input
                    name="fullName"
                    placeholder="Full Name *"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Input
                    type="email"
                    name="emailAddress"
                    placeholder="Email Address *"
                    value={formData.emailAddress}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Input
                    type="tel"
                    name="mobileNumber"
                    placeholder="Mobile Number (optional)"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Textarea
                    name="message"
                    placeholder="Type text *"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                </Button>
              </form>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <div className="bg-card border rounded-xl p-6 shadow-sm flex flex-col items-start hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold">Contact Me</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Have a direct concern or want to reach out immediately? Feel free to call us.
              </p>
              <a href="tel:+917310915168" className="text-primary font-medium hover:underline text-lg">
                +91 73109 15168
              </a>
            </div>

            <div className="bg-card border rounded-xl p-6 shadow-sm flex flex-col items-start hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold">Report a Food Issue</h3>
              </div>
              <p className="text-muted-foreground mb-4 text-sm">
                We are committed to ensuring the safety and quality of all food shared on our platform. Let us know if you encounter any problems.
              </p>
              <button className="text-primary text-sm font-medium hover:underline">
                Report here
              </button>
            </div>
            
            <div className="bg-card border rounded-xl p-6 shadow-sm flex flex-col items-start hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold">Email Support</h3>
              </div>
              <p className="text-muted-foreground mb-4 text-sm">
                For non-urgent inquiries, drop us an email and our team will get back to you within 24 hours.
              </p>
              <a href="mailto:support.foodshare@gmail.com" className="text-primary text-sm font-medium hover:underline">
                support.foodshare@gmail.com
              </a>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Contact;
