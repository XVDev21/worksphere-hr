import React from 'react';
import { 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Users, 
  Star,
  Target,
  ArrowUpRight,
  MessageSquare
} from 'lucide-react';
import { Card } from '../UI';

export const MyPerformanceModal: React.FC = () => {
  const performanceData = {
    rating: 4.2,
    tasksCompleted: 145,
    attendanceRate: 98.5,
    punctualityScore: 95.0,
    peerFeedback: 4.5,
    goals: [
      { id: 'g1', title: 'Complete Q1 Project Deliverables', progress: 85 },
      { id: 'g2', title: 'Improve Team Communication', progress: 60 },
      { id: 'g3', title: 'Learn Advanced React Patterns', progress: 40 },
    ],
    reviews: [
      { id: 'rev1', reviewer: 'Sarah Johnson', role: 'Team Lead', date: '2026-03-15', feedback: 'Excellent work on the new dashboard features. The UI is very intuitive and the code is clean.' },
      { id: 'rev2', reviewer: 'Michael Chen', role: 'Senior Developer', date: '2026-02-28', feedback: 'Great collaborator. Always willing to help others and shares knowledge effectively.' },
    ]
  };

  return (
    <div className="space-y-8 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
      {/* Performance Summary */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
            <TrendingUp size={16} />
            <span>Performance Summary</span>
          </div>
          <div className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold">
            <Star size={14} fill="currentColor" />
            <span>{performanceData.rating} / 5.0</span>
          </div>
        </div>
        <div className="p-6 bg-muted/30 rounded-xl border border-border">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium">Overall Progress</p>
            <p className="text-sm font-bold text-primary">84%</p>
          </div>
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: '84%' }} />
          </div>
          <p className="text-xs text-muted-foreground mt-4 italic">
            "Your performance has improved by 12% compared to the previous quarter."
          </p>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 flex flex-col items-center text-center gap-2">
          <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
            <CheckCircle2 size={20} />
          </div>
          <p className="text-xl font-bold">{performanceData.tasksCompleted}</p>
          <p className="text-[10px] text-muted-foreground uppercase font-bold">Tasks Done</p>
        </Card>
        <Card className="p-4 flex flex-col items-center text-center gap-2">
          <div className="p-2 bg-green-500/10 text-green-500 rounded-lg">
            <Users size={20} />
          </div>
          <p className="text-xl font-bold">{performanceData.attendanceRate}%</p>
          <p className="text-[10px] text-muted-foreground uppercase font-bold">Attendance</p>
        </Card>
        <Card className="p-4 flex flex-col items-center text-center gap-2">
          <div className="p-2 bg-orange-500/10 text-orange-500 rounded-lg">
            <Clock size={20} />
          </div>
          <p className="text-xl font-bold">{performanceData.punctualityScore}%</p>
          <p className="text-[10px] text-muted-foreground uppercase font-bold">Punctuality</p>
        </Card>
        <Card className="p-4 flex flex-col items-center text-center gap-2">
          <div className="p-2 bg-purple-500/10 text-purple-500 rounded-lg">
            <Star size={20} />
          </div>
          <p className="text-xl font-bold">{performanceData.peerFeedback}</p>
          <p className="text-[10px] text-muted-foreground uppercase font-bold">Peer Score</p>
        </Card>
      </section>

      {/* Goals Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
          <Target size={16} />
          <span>Current Goals</span>
        </div>
        <div className="space-y-3">
          {performanceData.goals.map((goal) => (
            <div key={goal.id} className="p-4 bg-card border border-border rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-bold">{goal.title}</p>
                <p className="text-xs font-bold text-primary">{goal.progress}%</p>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${goal.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Reviews Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
          <MessageSquare size={16} />
          <span>Recent Reviews</span>
        </div>
        <div className="space-y-4">
          {performanceData.reviews.map((review) => (
            <div key={review.id} className="p-4 bg-muted/20 rounded-xl border border-border/50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                    {review.reviewer.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{review.reviewer}</p>
                    <p className="text-[10px] text-muted-foreground">{review.role}</p>
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground">{review.date}</p>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                "{review.feedback}"
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
