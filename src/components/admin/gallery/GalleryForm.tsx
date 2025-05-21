
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Spinner } from '@/components/ui/spinner';
import { ImageIcon } from 'lucide-react';

type GalleryFormProps = {
  initialData?: {
    id?: string;
    title: string;
    description?: string;
    image_url?: string;
  };
  onSubmit: (data: { title: string; description: string; image: File | null; imagePreview: string | null }) => void;
  isSubmitting: boolean;
  onCancel?: () => void;
  submitLabel: string;
};

const GalleryForm = ({ initialData, onSubmit, isSubmitting, onCancel, submitLabel }: GalleryFormProps) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image_url || null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setImage(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, image, imagePreview });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid w-full gap-1.5">
        <label htmlFor="title" className="text-sm font-medium">Title</label>
        <Input
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter image title"
          required
        />
      </div>
      
      <div className="grid w-full gap-1.5">
        <label htmlFor="description" className="text-sm font-medium">Description (optional)</label>
        <Textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter image description"
          className="min-h-[100px]"
        />
      </div>
      
      <div className="grid w-full gap-1.5">
        <label htmlFor="image" className="text-sm font-medium">
          {initialData?.image_url ? 'Image (optional)' : 'Image'}
        </label>
        <div className="flex flex-col items-center gap-4">
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="cursor-pointer"
            {...(!initialData?.image_url && { required: true })}
          />
          
          {imagePreview && (
            <div className="mt-2 rounded-md overflow-hidden w-full max-h-[200px] flex items-center justify-center">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="max-w-full max-h-[200px] object-contain" 
              />
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-end space-x-2 pt-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        
        <Button 
          type="submit" 
          className="bg-ghana-green hover:bg-ghana-green/90"
          disabled={isSubmitting || !title}
        >
          {isSubmitting ? <Spinner size="sm" className="mr-2" /> : null}
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default GalleryForm;
