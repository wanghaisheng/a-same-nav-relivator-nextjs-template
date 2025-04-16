import Link from "next/link";
import { Clock, Star, MessageSquare, Download, Activity } from "lucide-react";
import { Button } from '../../primitives/button';

export interface NewsItem {
  id: string;
  title: string;
  link: string;
  date: string;
}

export interface ActivityItem {
  id: string;
  type: "review" | "feature" | "download" | "update" | "other";
  description: string;
  timestamp: string;
  user?: {
    name: string;
    avatar?: string;
  };
}

export interface NewsAndActivitiesProps {
  itemName: string;
  news: NewsItem[];
  activities: ActivityItem[];
  className?: string;
}

export function NewsAndActivities({
  itemName,
  news,
  activities,
  className = "",
}: NewsAndActivitiesProps) {
  // Helper function to render activity icon based on type
  const renderActivityIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "review":
        return <Star className="h-4 w-4 text-yellow-500" />;
      case "feature":
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case "download":
        return <Download className="h-4 w-4 text-green-500" />;
      case "update":
        return <Activity className="h-4 w-4 text-purple-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <h2 className="text-2xl font-bold">{itemName} News & Activities</h2>
      {/* Recent News Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recent News</h3>
        {news.length > 0 ? (
          <div className="space-y-3">
            {news.map((n) => (
              <div key={n.id} className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <Link href={n.link} className="hover:underline text-primary">
                  {n.title}
                </Link>
                <span className="ml-auto text-xs text-muted-foreground">{n.date}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-muted-foreground text-sm">暂无新闻</div>
        )}
      </div>
      {/* Recent Activities Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recent Activities</h3>
        {activities.length > 0 ? (
          <div className="space-y-3">
            {activities.map((a) => (
              <div key={a.id} className="flex items-center gap-3">
                {renderActivityIcon(a.type)}
                <span>{a.description}</span>
                {a.user && (
                  <span className="ml-2 text-xs text-muted-foreground">by {a.user.name}</span>
                )}
                <span className="ml-auto text-xs text-muted-foreground">{a.timestamp}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-muted-foreground text-sm">暂无活动</div>
        )}
      </div>
    </div>
  );
}
