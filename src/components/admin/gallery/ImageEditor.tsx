
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Crop, RotateCcw, RotateCw, ZoomIn, ZoomOut, Check, X } from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

type ImageEditorProps = {
  imageUrl: string;
  onSave: (editedImageBlob: Blob) => void;
  onCancel: () => void;
};

const ImageEditor = ({ imageUrl, onSave, onCancel }: ImageEditorProps) => {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  
  useEffect(() => {
    // Load image
    imageRef.current = new Image();
    imageRef.current.crossOrigin = 'anonymous';
    imageRef.current.src = imageUrl;
    
    imageRef.current.onload = () => {
      drawImage();
    };
  }, [imageUrl]);
  
  const drawImage = () => {
    if (!canvasRef.current || !imageRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions to match image
    const img = imageRef.current;
    canvas.width = img.width;
    canvas.height = img.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Save context state
    ctx.save();
    
    // Move to center, rotate, scale, and move back
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(zoom, zoom);
    ctx.translate(-img.width / 2, -img.height / 2);
    
    // Draw image
    ctx.drawImage(img, 0, 0);
    
    // Restore context state
    ctx.restore();
  };
  
  useEffect(() => {
    drawImage();
  }, [zoom, rotation]);
  
  const handleRotateLeft = () => {
    setRotation(prev => (prev - 90) % 360);
  };
  
  const handleRotateRight = () => {
    setRotation(prev => (prev + 90) % 360);
  };
  
  const handleZoomChange = (value: number[]) => {
    setZoom(value[0]);
  };
  
  const handleSave = () => {
    if (!canvasRef.current) return;
    
    canvasRef.current.toBlob((blob) => {
      if (blob) {
        onSave(blob);
      }
    }, 'image/jpeg', 0.95);
  };
  
  return (
    <div className="flex flex-col space-y-4">
      <Tabs defaultValue="adjust" className="w-full">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="adjust">Adjust</TabsTrigger>
          <TabsTrigger value="crop">Crop (Coming Soon)</TabsTrigger>
        </TabsList>
        <TabsContent value="adjust" className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-md">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Zoom</span>
              <div className="flex items-center space-x-2">
                <ZoomOut className="h-4 w-4 text-gray-500" />
                <Slider 
                  className="w-32" 
                  value={[zoom]} 
                  min={0.5} 
                  max={2} 
                  step={0.1} 
                  onValueChange={handleZoomChange} 
                />
                <ZoomIn className="h-4 w-4 text-gray-500" />
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Rotation</span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRotateLeft}
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <span className="text-sm w-8 text-center">{rotation}°</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRotateRight}
                >
                  <RotateCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="crop">
          <div className="flex items-center justify-center p-4 bg-gray-100 text-gray-500 rounded-md h-32">
            <p>Crop functionality coming soon</p>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="relative w-full bg-checkerboard overflow-hidden rounded-md flex items-center justify-center">
        <canvas 
          ref={canvasRef} 
          className="max-h-[300px] max-w-full"
        />
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button
          variant="outline"
          onClick={onCancel}
        >
          <X className="h-4 w-4 mr-2" /> Cancel
        </Button>
        <Button
          onClick={handleSave}
          className="bg-ghana-green hover:bg-ghana-green/90"
        >
          <Check className="h-4 w-4 mr-2" /> Apply Changes
        </Button>
      </div>
      <style jsx global>{`
        .bg-checkerboard {
          background-image: linear-gradient(45deg, #f0f0f0 25%, transparent 25%),
            linear-gradient(-45deg, #f0f0f0 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #f0f0f0 75%),
            linear-gradient(-45deg, transparent 75%, #f0f0f0 75%);
          background-size: 20px 20px;
          background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
        }
      `}</style>
    </div>
  );
};

export default ImageEditor;
