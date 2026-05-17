import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Target, Users, Globe } from "lucide-react";

const About = () => (
  <Layout>
    <div className="container mx-auto px-4 py-12">
      {/* Hero */}
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold">About <span className="text-gradient">FoodShare</span></h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          We believe no food should go to waste while people go hungry. FoodShare connects surplus food with those who need it most.
        </p>
      </div>

      {/* Mission */}
      <div className="mb-16 grid gap-8 md:grid-cols-2">
        <div className="flex flex-col justify-center">
          <h2 className="mb-4 text-3xl font-bold">Our Mission</h2>
          <p className="mb-4 text-muted-foreground">
            FoodShare was born from a simple idea: leftover food from restaurants, events, and homes shouldn't end up in landfills when families and communities are in need.
          </p>
          <p className="text-muted-foreground">
            We've built a platform that makes food donation effortless, connecting donors directly with verified recipients in their local area.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: Heart, title: "12,500+", desc: "Meals Shared" },
            { icon: Target, title: "3,200 kg", desc: "Waste Prevented" },
            { icon: Users, title: "850+", desc: "Active Members" },
            { icon: Globe, title: "45+", desc: "Communities" },
          ].map((s) => (
            <Card key={s.desc}>
              <CardContent className="flex flex-col items-center p-6 text-center">
                <s.icon className="mb-2 h-8 w-8 text-primary" />
                <span className="text-2xl font-bold">{s.title}</span>
                <span className="text-sm text-muted-foreground">{s.desc}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Values */}
      <div className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold">Our Values</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: "Zero Waste", desc: "Every piece of food has value. We work to ensure nothing goes to waste." },
            { title: "Community First", desc: "We build connections between neighbors, businesses, and organizations." },
            { title: "Transparency", desc: "Every donation is tracked, every impact is measured and shared." },
          ].map((v) => (
            <Card key={v.title} className="border-none bg-muted/50">
              <CardContent className="p-6">
                <h3 className="mb-2 text-lg font-semibold">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div>
        <h2 className="mb-8 text-center text-3xl font-bold">Frequently Asked Questions</h2>
        <div className="mx-auto max-w-2xl space-y-4">
          {[
            { q: "How does FoodShare work?", a: "Donors list surplus food with details and location. Recipients browse listings and send requests. Once approved, they arrange pickup." },
            { q: "Is the food safe to consume?", a: "All listings include expiry dates and descriptions. We encourage donors to follow food safety guidelines." },
            { q: "Is FoodShare free?", a: "Yes! FoodShare is completely free for both donors and recipients." },
            { q: "Can organizations use FoodShare?", a: "Absolutely. Restaurants, caterers, farms, and any organization can sign up as donors." },
          ].map((faq) => (
            <Card key={faq.q}>
              <CardContent className="p-5">
                <h4 className="mb-1 font-semibold">{faq.q}</h4>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  </Layout>
);

export default About;
