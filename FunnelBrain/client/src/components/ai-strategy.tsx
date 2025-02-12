import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function AIStrategy() {
  const [loading, setLoading] = useState(false);
  const [strategy, setStrategy] = useState("");

  const generateStrategy = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock AI response for now
    setTimeout(() => {
      setStrategy(`
Strategy Recommendations:

1. Audience Targeting:
- Focus on professionals aged 25-45
- Target based on job titles and industry verticals
- Use lookalike audiences from existing customers

2. Ad Format Mix:
- Single image ads for awareness
- Carousel ads for product features
- Video ads for testimonials

3. Budget Allocation:
- 40% awareness campaigns
- 40% conversion campaigns
- 20% retargeting

4. Testing Plan:
- A/B test headlines weekly
- Rotate creative elements monthly
- Test new audiences bi-weekly
      `);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>AI Strategy Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={generateStrategy} className="space-y-4">
            <div>
              <Label>Target Audience</Label>
              <Input placeholder="e.g. B2B Software Companies" />
            </div>
            <div>
              <Label>Campaign Goals</Label>
              <Input placeholder="e.g. Lead Generation" />
            </div>
            <div>
              <Label>Budget Range</Label>
              <Input placeholder="e.g. $5000/month" />
            </div>
            <Button disabled={loading}>
              {loading ? "Generating..." : "Generate Strategy"}
            </Button>
          </form>
          
          {strategy && (
            <div className="mt-4">
              <Label>Generated Strategy</Label>
              <Textarea 
                value={strategy}
                readOnly
                className="h-[300px] font-mono"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
