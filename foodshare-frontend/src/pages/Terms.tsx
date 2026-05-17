import Layout from "@/components/Layout";
import { ShieldCheck, Scale, FileText, HeartHandshake } from "lucide-react";
import { useEffect } from "react";

const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="bg-background min-h-screen py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-poppins text-foreground mb-4">
              Terms & Policies
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Please read our guidelines carefully. Our priority is ensuring a safe, transparent, and legally sound environment for sharing food.
            </p>
          </div>

          <div className="space-y-16">
            {/* Terms and Conditions */}
            <section className="bg-card rounded-3xl p-8 md:p-12 shadow-sm border border-border">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                  <Scale className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold font-poppins">1. Terms & Conditions</h2>
              </div>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2 font-poppins">Introduction</h3>
                  <p>FoodShare is a platform that connects food donors with individuals and organizations to reduce food waste and help communities.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2 font-poppins">User Eligibility</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Users must provide accurate information when registering.</li>
                    <li>Users must be legally allowed to donate or receive food in their respective jurisdictions.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2 font-poppins">Donations</h3>
                  <p>Donors are solely responsible for the quality and safety of the food they list. The donation of expired, spoiled, or unsafe food is strictly prohibited. The platform acts only as a bridge to connect users and does not take possession of any food items.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2 font-poppins">Prohibited Content</h3>
                  <p>The following are strictly banned on our platform:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Fake or deceptive listings.</li>
                    <li>Harmful, spoiled, or contaminated food.</li>
                    <li>Any illegal activity or exchange of prohibited goods.</li>
                    <li>Spam or promotional content unrelated to food sharing.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2 font-poppins">Account Suspension</h3>
                  <p>We reserve the right to remove or suspend accounts that violate these rules or pose a threat to the community.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2 font-poppins">Limitation of Liability</h3>
                  <p>FoodShare is a facilitation platform. We are not directly responsible for food quality, delivery issues, or any health-related problems arising from donations. Users interact and consume food at their own risk.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2 font-poppins">Changes to Terms</h3>
                  <p>We reserve the right to update or modify these terms at any time. Continued use of the platform implies acceptance of any new terms.</p>
                </div>
              </div>
            </section>

            {/* Privacy Policy */}
            <section className="bg-card rounded-3xl p-8 md:p-12 shadow-sm border border-border">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                  <FileText className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold font-poppins">2. Privacy Policy</h2>
              </div>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2 font-poppins">Information Collected</h3>
                  <p>We collect necessary information to facilitate safe sharing, including: Name, Email Address, Phone Number, Location data, and details regarding food donations.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2 font-poppins">How Data is Used</h3>
                  <p>Your data is used strictly to improve our services, seamlessly connect donors with recipients, and conduct safety verifications.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2 font-poppins">Data Protection</h3>
                  <p>User data is rigorously protected. We do not and will never sell your personal information to third-party data brokers.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2 font-poppins">Cookies</h3>
                  <p>Our site utilizes cookies and session storage to maintain your login state, remember preferences, and ensure the platform runs smoothly.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2 font-poppins">Third-Party Services</h3>
                  <p>We may use trusted third-party services (such as Cloudinary for image hosting, or standard maps APIs for location routing) strictly for platform functionality.</p>
                </div>
              </div>
            </section>

            {/* Food Safety Policy */}
            <section className="bg-orange-50/50 dark:bg-orange-950/20 rounded-3xl p-8 md:p-12 shadow-sm border border-orange-200 dark:border-orange-900/50">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 rounded-xl">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold font-poppins text-orange-950 dark:text-orange-100">3. Food Safety Policy</h2>
              </div>
              <div className="space-y-6 text-orange-900/80 dark:text-orange-200/80 leading-relaxed">
                <p className="font-medium text-orange-900 dark:text-orange-100">Food safety is our highest priority. All users must strictly adhere to these guidelines.</p>
                
                <div>
                  <h3 className="text-xl font-semibold text-orange-950 dark:text-orange-100 mb-2 font-poppins">Allowed Food</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Freshly prepared food (properly stored).</li>
                    <li>Packaged food with intact seals.</li>
                    <li>Fresh vegetables and fruits.</li>
                    <li>Bakery items.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-orange-950 dark:text-orange-100 mb-2 font-poppins">Prohibited Food</h3>
                  <ul className="list-disc pl-5 space-y-1 text-red-700 dark:text-red-400">
                    <li>Spoiled or rotting food.</li>
                    <li>Expired food items.</li>
                    <li>Contaminated food or food that has been dropped/mishandled.</li>
                    <li>Partially eaten food leftovers from plates.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-orange-950 dark:text-orange-100 mb-2 font-poppins">Storage Requirements</h3>
                  <p>All food must be hygienically stored at the appropriate temperature (refrigerated if necessary) and safely packaged for transport.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-orange-950 dark:text-orange-100 mb-2 font-poppins">Expiry Information</h3>
                  <p>Donors must provide accurate expiry dates, preparation times, and expected pickup timing windows to ensure food does not spoil while waiting.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-orange-950 dark:text-orange-100 mb-2 font-poppins">Recipient Responsibility</h3>
                  <p>Recipients should always visually and physically inspect food before consuming it. When in doubt, throw it out.</p>
                </div>
              </div>
            </section>

            {/* Community Guidelines */}
            <section className="bg-card rounded-3xl p-8 md:p-12 shadow-sm border border-border">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-pink-100 text-pink-600 rounded-xl">
                  <HeartHandshake className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold font-poppins">4. Community Guidelines</h2>
              </div>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2 font-poppins">Respectful Behavior</h3>
                  <p>Treat everyone with kindness. No abuse, harassment, or discrimination will be tolerated.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2 font-poppins">Honest Listings</h3>
                  <p>Always provide real images and accurate details regarding portion size and food condition.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2 font-poppins">Timely Pickup</h3>
                  <p>Recipients should respect the donor's time and collect requested food promptly within the agreed window.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2 font-poppins">Report Abuse</h3>
                  <p>If you see a listing that looks suspicious or a user violating these guidelines, please use the report function immediately.</p>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
