import { AlertTriangle, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Alert = {
  id: string;
  title: string;
  location: string;
  date: string;
  severity: 'High' | 'Medium' | 'Low';
  description: string;
};

const mockAlerts: Alert[] = [
  {
    id: '1',
    title: 'Dengue Outbreak',
    location: 'Odisha, India',
    date: '2 hours ago',
    severity: 'High',
    description:
      'A significant increase in Dengue cases has been reported. Residents are advised to take preventive measures against mosquito breeding.',
  },
  {
    id: '2',
    title: 'Malaria Cases Reported',
    location: 'Mumbai, Maharashtra',
    date: '1 day ago',
    severity: 'Medium',
    description:
      'A cluster of Malaria cases has been identified. Please use mosquito nets and repellents. Seek medical advice if symptoms appear.',
  },
  {
    id: '3',
    title: 'Flu Season Advisory',
    location: 'Nationwide',
    date: '3 days ago',
    severity: 'Low',
    description:
      'Annual flu season is approaching. Vaccination is recommended for all age groups, especially for vulnerable populations.',
  },
    {
    id: '4',
    title: 'Cholera Warning',
    location: 'Kolkata, West Bengal',
    date: '5 days ago',
    severity: 'High',
    description:
      'Contaminated water sources have led to a cholera warning. Boil drinking water and maintain high levels of hygiene.',
  },
];

const severityStyles = {
    High: {
        variant: 'destructive',
        icon: <AlertTriangle className="h-5 w-5 text-destructive" />,
    },
    Medium: {
        variant: 'secondary',
        icon: <AlertTriangle className="h-5 w-5 text-yellow-600" />,
    },
    Low: {
        variant: 'outline',
        icon: <Info className="h-5 w-5 text-blue-600" />,
    },
} as const;

export default function AlertsPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="font-headline text-3xl font-bold">Outbreak Alerts</h1>
        <p className="text-muted-foreground">
          Stay informed about public health advisories in your area.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {mockAlerts.map((alert) => (
          <Card key={alert.id} className="shadow-lg transition-transform hover:scale-[1.02]">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1.5">
                   <CardTitle className="flex items-center gap-2 text-xl">
                    {severityStyles[alert.severity].icon}
                    {alert.title}
                  </CardTitle>
                   <p className="text-sm text-muted-foreground">{alert.location}</p>
                </div>
                <Badge variant={severityStyles[alert.severity].variant}>{alert.severity}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-foreground">{alert.description}</p>
              <p className="text-xs text-muted-foreground">{alert.date}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
