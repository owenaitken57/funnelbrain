import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { CanvasEditor } from "@/components/canvas-editor";
import { AnalyticsDashboard } from "@/components/analytics-dashboard";
import { AIStrategy } from "@/components/ai-strategy";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <AnalyticsDashboard />;
      case "creator":
        return <CanvasEditor />;
      case "strategy":
        return <AIStrategy />;
      case "settings":
        return <div className="p-4">Settings page (coming soon)</div>;
      default:
        return <AnalyticsDashboard />;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar 
        className="border-r" 
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      />
      <main className="flex-1 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
}
