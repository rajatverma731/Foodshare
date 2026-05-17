import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  change?: string;
}

const StatCard = ({ icon: Icon, label, value, change }: StatCardProps) => (
  <Card>
    <CardContent className="flex items-center gap-4 p-5">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
        {change && <p className="text-xs text-primary">{change}</p>}
      </div>
    </CardContent>
  </Card>
);

export default StatCard;
