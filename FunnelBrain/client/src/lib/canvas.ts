import * as fabric from 'fabric';
import type { Canvas } from 'fabric/fabric-impl';

// Platform specific ad sizes in pixels
export const AD_SIZES = {
  facebook: {
    feed: { width: 1080, height: 1080 },
    story: { width: 1080, height: 1920 },
    right_column: { width: 1200, height: 628 }
  },
  instagram: {
    square: { width: 1080, height: 1080 },
    portrait: { width: 1080, height: 1350 },
    story: { width: 1080, height: 1920 }
  },
  linkedin: {
    single: { width: 1200, height: 627 },
    spotlight: { width: 300, height: 250 },
    carousel: { width: 1080, height: 1080 }
  },
  twitter: {
    single: { width: 1200, height: 675 },
    card: { width: 800, height: 418 },
    carousel: { width: 1080, height: 1080 }
  }
};

export interface AdSize {
  width: number;
  height: number;
}

export class CanvasManager {
  public readonly canvas: Canvas;
  private history: string[] = [];
  private currentHistoryIndex: number = -1;
  private maxHistorySteps: number = 50;

  constructor(canvas: Canvas) {
    this.canvas = canvas;
    this.saveState();

    this.canvas.on('object:modified', () => this.saveState());
    this.canvas.on('object:added', () => this.saveState());
    this.canvas.on('object:removed', () => this.saveState());
  }

  private saveState() {
    const json = JSON.stringify(this.canvas.toJSON());

    if (this.currentHistoryIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.currentHistoryIndex + 1);
    }

    this.history.push(json);
    this.currentHistoryIndex++;

    if (this.history.length > this.maxHistorySteps) {
      this.history.shift();
      this.currentHistoryIndex--;
    }
  }

  undo() {
    if (this.currentHistoryIndex > 0) {
      this.currentHistoryIndex--;
      this.loadState(this.history[this.currentHistoryIndex]);
    }
  }

  redo() {
    if (this.currentHistoryIndex < this.history.length - 1) {
      this.currentHistoryIndex++;
      this.loadState(this.history[this.currentHistoryIndex]);
    }
  }

  private loadState(json: string) {
    this.canvas.loadFromJSON(json, () => {
      this.canvas.renderAll();
    });
  }

  resizeCanvas(width: number, height: number) {
    this.canvas.setWidth(width);
    this.canvas.setHeight(height);
    this.canvas.renderAll();
  }

  addText(text: string, options = {}) {
    const textObj = new fabric.Text(text, {
      left: this.canvas.getWidth() / 2,
      top: this.canvas.getHeight() / 2,
      fontFamily: 'Arial',
      fontSize: 40,
      fill: '#000000',
      originX: 'center' as fabric.OriginX,
      originY: 'center' as fabric.OriginY,
      ...options
    });

    this.canvas.add(textObj);
    this.canvas.setActiveObject(textObj);
    this.canvas.renderAll();
  }

  async addImage(url: string, options = {}) {
    try {
      const img = await new Promise<fabric.Image>((resolve) => {
        fabric.Image.fromURL(url, (img) => resolve(img), { crossOrigin: 'anonymous' });
      });

      img.set({
        left: this.canvas.getWidth() / 2,
        top: this.canvas.getHeight() / 2,
        originX: 'center' as fabric.OriginX,
        originY: 'center' as fabric.OriginY,
        ...options
      });

      const scaleX = (this.canvas.getWidth() * 0.8) / (img.width ?? 1);
      const scaleY = (this.canvas.getHeight() * 0.8) / (img.height ?? 1);
      const scale = Math.min(scaleX, scaleY);

      img.scale(scale);

      this.canvas.add(img);
      this.canvas.setActiveObject(img);
      this.canvas.renderAll();
    } catch (error) {
      console.error('Error loading image:', error);
      throw error;
    }
  }

  addShape(type: 'rect' | 'circle' | 'triangle', options = {}) {
    const defaultOptions = {
      left: this.canvas.getWidth() / 2,
      top: this.canvas.getHeight() / 2,
      fill: '#0066ff',
      width: 100,
      height: 100,
      originX: 'center' as fabric.OriginX,
      originY: 'center' as fabric.OriginY,
      ...options
    };

    let shape: fabric.Object;

    switch (type) {
      case 'rect':
        shape = new fabric.Rect(defaultOptions);
        break;
      case 'circle':
        shape = new fabric.Circle({
          ...defaultOptions,
          radius: 50
        });
        break;
      case 'triangle':
        shape = new fabric.Triangle(defaultOptions);
        break;
      default:
        throw new Error('Unsupported shape type');
    }

    this.canvas.add(shape);
    this.canvas.setActiveObject(shape);
    this.canvas.renderAll();
  }

  exportToImage(format: 'png' | 'jpeg' = 'png', quality = 1): string {
    return this.canvas.toDataURL({
      format,
      quality
    });
  }

  clear() {
    this.canvas.clear();
    this.saveState();
  }

  deleteSelected() {
    const activeObjects = this.canvas.getActiveObjects();
    if (activeObjects.length > 0) {
      activeObjects.forEach(obj => {
        this.canvas.remove(obj);
      });
      this.canvas.discardActiveObject();
      this.canvas.renderAll();
    }
  }
}

export function getAdSize(platform: string, type: string): AdSize {
  const platformSizes = AD_SIZES[platform as keyof typeof AD_SIZES];
  if (!platformSizes) {
    throw new Error(`Unsupported platform: ${platform}`);
  }

  const size = platformSizes[type as keyof typeof platformSizes];
  if (!size) {
    throw new Error(`Unsupported ad type: ${type} for platform: ${platform}`);
  }

  return size;
}