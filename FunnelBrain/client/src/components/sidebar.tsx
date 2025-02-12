import { HomeIcon, LayoutDashboard, Brain, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  setActiveTab: (tab: string) => void;
  activeTab: string;
}

export function Sidebar({ className, setActiveTab, activeTab }: SidebarProps) {
  const { logoutMutation } = useAuth();

  const items = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: HomeIcon,
    },
    {
      id: "creator",
      label: "Ad Creator",
      icon: LayoutDashboard,
    },
    {
      id: "strategy",
      label: "AI Strategy",
      icon: Brain,
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
    },
  ];

  return (
    <div className={cn("pb-12 w-64", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold">FunnelBrain AI</h2>
        </div>
        <div className="space-y-1">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors",
                activeTab === item.id 
                  ? "bg-accent text-accent-foreground" 
                  : "hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
          <button
            onClick={() => logoutMutation.mutate()}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
