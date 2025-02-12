import { useEffect, useRef, useState } from "react";
import * as fabric from 'fabric';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CanvasManager, getAdSize } from "@/lib/canvas";
import { AD_TEMPLATES, type AdTemplate, applyTemplate } from "@/lib/templates";
import type { Canvas as FabricCanvas } from 'fabric/fabric-impl';

export function CanvasEditor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasManager, setCanvasManager] = useState<CanvasManager | null>(null);
  const [platform, setPlatform] = useState("facebook");
  const [adType, setAdType] = useState("feed");
  const [templates, setTemplates] = useState<AdTemplate[]>([]);

  useEffect(() => {
    if (canvasRef.current && !canvasManager) {
      const size = getAdSize(platform, adType);
      const fabricCanvas = new fabric.Canvas(canvasRef.current, {
        width: size.width,
        height: size.height,
        backgroundColor: '#ffffff'
      });

      const manager = new CanvasManager(fabricCanvas as FabricCanvas);
      setCanvasManager(manager);
    }
  }, [canvasRef, canvasManager]);

  useEffect(() => {
    if (canvasManager) {
      const size = getAdSize(platform, adType);
      canvasManager.resizeCanvas(size.width, size.height);
    }
  }, [platform, adType]);

  useEffect(() => {
    // Filter templates based on selected platform and ad type
    const filtered = AD_TEMPLATES.filter(
      template => template.platform === platform && template.adType === adType
    );
    setTemplates(filtered);
  }, [platform, adType]);

  const addText = () => {
    if (!canvasManager) return;
    canvasManager.addText('Add your text here');
  };

  const addShape = () => {
    if (!canvasManager) return;
    canvasManager.addShape('rect');
  };

  const handleExport = () => {
    if (!canvasManager) return;
    const dataUrl = canvasManager.exportToImage();
    const link = document.createElement('a');
    link.download = `ad-creative-${platform}-${adType}.png`;
    link.href = dataUrl;
    link.click();
  };

  const handleTemplateSelect = async (template: AdTemplate) => {
    if (!canvasManager) return;
    await applyTemplate(canvasManager.canvas, template);
  };

  return (
    <div className="p-4">
      <Card className="p-4">
        <div className="flex gap-4 mb-4">
          <div className="flex flex-col gap-2">
            <Label>Platform</Label>
            <Select value={platform} onValueChange={setPlatform}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="twitter">Twitter</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Ad Type</Label>
            <Select value={adType} onValueChange={setAdType}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select ad type" />
              </SelectTrigger>
              <SelectContent>
                {platform === 'facebook' && (
                  <>
                    <SelectItem value="feed">Feed</SelectItem>
                    <SelectItem value="story">Story</SelectItem>
                    <SelectItem value="right_column">Right Column</SelectItem>
                  </>
                )}
                {platform === 'instagram' && (
                  <>
                    <SelectItem value="square">Square</SelectItem>
                    <SelectItem value="portrait">Portrait</SelectItem>
                    <SelectItem value="story">Story</SelectItem>
                  </>
                )}
                {platform === 'linkedin' && (
                  <>
                    <SelectItem value="single">Single Image</SelectItem>
                    <SelectItem value="spotlight">Spotlight</SelectItem>
                    <SelectItem value="carousel">Carousel</SelectItem>
                  </>
                )}
                {platform === 'twitter' && (
                  <>
                    <SelectItem value="single">Single Image</SelectItem>
                    <SelectItem value="card">Card</SelectItem>
                    <SelectItem value="carousel">Carousel</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end gap-2">
            <Button onClick={addText}>Add Text</Button>
            <Button onClick={addShape}>Add Shape</Button>
            <Button variant="secondary" onClick={handleExport}>Export</Button>
          </div>
        </div>

        <div className="grid grid-cols-[300px_1fr] gap-4">
          <Card className="p-4">
            <Label className="mb-2 block">Templates</Label>
            <ScrollArea className="h-[500px]">
              <div className="space-y-2">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => handleTemplateSelect(template)}
                    className="w-full p-4 text-left hover:bg-accent rounded-lg transition-colors"
                  >
                    <h3 className="font-medium">{template.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {template.description}
                    </p>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </Card>

          <div className="border rounded-lg overflow-hidden">
            <canvas ref={canvasRef} />
          </div>
        </div>
      </Card>
    </div>
  );
}