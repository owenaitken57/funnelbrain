import * as fabric from 'fabric';
import type { Canvas } from 'fabric/fabric-impl';

export interface AdTemplate {
  id: string;
  name: string;
  description: string;
  platform: string;
  adType: string;
  thumbnail: string;
  elements: TemplateElement[];
}

interface TemplateElement {
  type: 'text' | 'rect' | 'circle' | 'image';
  props: Record<string, any>;
}

export const AD_TEMPLATES: AdTemplate[] = [
  {
    id: 'fb-minimal-product',
    name: 'Minimal Product',
    description: 'Clean, modern product showcase with minimal text',
    platform: 'facebook',
    adType: 'feed',
    thumbnail: '/templates/fb-minimal-product.png',
    elements: [
      {
        type: 'rect',
        props: {
          width: 1080,
          height: 1080,
          fill: '#f8f9fa',
          selectable: false
        }
      },
      {
        type: 'text',
        props: {
          text: 'Your Product Name',
          fontSize: 48,
          fontFamily: 'Arial',
          fill: '#1a1a1a',
          top: 100,
          left: 540,
          originX: 'center',
          originY: 'center'
        }
      },
      {
        type: 'text',
        props: {
          text: 'Starting at $99',
          fontSize: 32,
          fontFamily: 'Arial',
          fill: '#666666',
          top: 980,
          left: 540,
          originX: 'center',
          originY: 'center'
        }
      }
    ]
  },
  {
    id: 'ig-story-promotion',
    name: 'Story Promotion',
    description: 'Engaging story template with bold text and CTA',
    platform: 'instagram',
    adType: 'story',
    thumbnail: '/templates/ig-story-promotion.png',
    elements: [
      {
        type: 'rect',
        props: {
          width: 1080,
          height: 1920,
          fill: 'linear-gradient(45deg, #FF6B6B 30%, #4ECDC4 90%)',
          selectable: false
        }
      },
      {
        type: 'text',
        props: {
          text: 'FLASH SALE',
          fontSize: 80,
          fontFamily: 'Arial Black',
          fill: '#ffffff',
          top: 400,
          left: 540,
          originX: 'center',
          originY: 'center'
        }
      },
      {
        type: 'text',
        props: {
          text: 'Swipe Up to Shop',
          fontSize: 36,
          fontFamily: 'Arial',
          fill: '#ffffff',
          top: 1700,
          left: 540,
          originX: 'center',
          originY: 'center'
        }
      }
    ]
  },
  {
    id: 'linkedin-professional',
    name: 'Professional Brand',
    description: 'Corporate-style template for professional audiences',
    platform: 'linkedin',
    adType: 'single',
    thumbnail: '/templates/linkedin-professional.png',
    elements: [
      {
        type: 'rect',
        props: {
          width: 1200,
          height: 627,
          fill: '#ffffff',
          selectable: false
        }
      },
      {
        type: 'rect',
        props: {
          width: 1200,
          height: 100,
          top: 0,
          left: 0,
          fill: '#0a66c2',
          selectable: false
        }
      },
      {
        type: 'text',
        props: {
          text: 'Grow Your Business',
          fontSize: 48,
          fontFamily: 'Arial',
          fill: '#2c2c2c',
          top: 300,
          left: 600,
          originX: 'center',
          originY: 'center'
        }
      }
    ]
  }
];

export async function applyTemplate(canvas: Canvas, template: AdTemplate) {
  // Clear existing canvas
  canvas.clear();

  // Add each element from the template
  for (const element of template.elements) {
    switch (element.type) {
      case 'text': {
        const text = new fabric.Text(element.props.text, {
          ...element.props,
          originX: element.props.originX as fabric.OriginX,
          originY: element.props.originY as fabric.OriginY,
        });
        canvas.add(text);
        break;
      }
      case 'rect': {
        const rect = new fabric.Rect({
          ...element.props,
          originX: element.props.originX as fabric.OriginX,
          originY: element.props.originY as fabric.OriginY,
        });
        canvas.add(rect);
        break;
      }
      case 'circle': {
        const circle = new fabric.Circle({
          ...element.props,
          originX: element.props.originX as fabric.OriginX,
          originY: element.props.originY as fabric.OriginY,
        });
        canvas.add(circle);
        break;
      }
      case 'image': {
        const img = await new Promise<fabric.Image>((resolve) => {
          fabric.Image.fromURL(element.props.src, (img) => {
            img.set({
              ...element.props,
              originX: element.props.originX as fabric.OriginX,
              originY: element.props.originY as fabric.OriginY,
            });
            resolve(img);
          }, { crossOrigin: 'anonymous' });
        });
        canvas.add(img);
        break;
      }
    }
  }

  canvas.renderAll();
}