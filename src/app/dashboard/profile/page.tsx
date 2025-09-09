
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Activity, Calendar, Heart, Shield, User } from 'lucide-react';

const userProfile = {
  name: 'Alex Doe',
  email: 'alex.doe@example.com',
  avatarUrl: '/avatars/01.png',
  healthHistory: [
    { id: 1, condition: 'Seasonal Flu', date: '2023-10-15', resolved: true },
    { id: 2, condition: 'Dengue Fever', date: '2022-08-20', resolved: true },
    { id: 3, condition: 'Common Cold', date: '2024-01-10', resolved: false },
  ],
  currentConditions: [{ id: 1, condition: 'Common Cold', severity: 'Mild' }],
  vaccineReminders: [
    { id: 1, vaccine: 'Flu Shot (Annual)', dueDate: '2024-10-01' },
    { id: 2, vaccine: 'Tetanus Booster', dueDate: '2028-05-20' },
  ],
};

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src={userProfile.avatarUrl} alt={userProfile.name} />
          <AvatarFallback>
            <User className="h-12 w-12" />
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="font-headline text-4xl font-bold">{userProfile.name}</h1>
          <p className="text-lg text-muted-foreground">{userProfile.email}</p>
        </div>
      </div>

      <Separator />

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Activity className="h-5 w-5 text-primary" />
              Current Conditions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {userProfile.currentConditions.length > 0 ? (
              <ul className="space-y-2">
                {userProfile.currentConditions.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <span>{item.condition}</span>
                    <Badge variant="secondary">{item.severity}</Badge>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No current conditions reported.</p>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Heart className="h-5 w-5 text-primary" />
              Health History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {userProfile.healthHistory.map((item) => (
                <li key={item.id} className="flex items-center justify-between">
                  <div>
                    <p>{item.condition}</p>
                    <p className="text-sm text-muted-foreground">{item.date}</p>
                  </div>
                  <Badge variant={item.resolved ? 'outline' : 'destructive'}>
                    {item.resolved ? 'Resolved' : 'Active'}
                  </Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Shield className="h-5 w-5 text-primary" />
              Vaccine Reminders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {userProfile.vaccineReminders.map((item) => (
                <li key={item.id} className="flex items-start justify-between">
                  <span>{item.vaccine}</span>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{item.dueDate}</span>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
