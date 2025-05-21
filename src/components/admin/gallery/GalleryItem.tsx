
import { useState } from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, ImageIcon, Crop, RotateCcw, ZoomIn } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type GalleryItemProps = {
  item: {
    id: string;
    title: string;
    description?: string;
    image_url: string;
    created_at: string;
  };
  onEdit: (item: any) => void;
  onDelete: (item: any) => void;
  onViewDetail?: (item: any) => void;
};

const GalleryItem = ({ item, onEdit, onDelete, onViewDetail }: GalleryItemProps) => {
  const [imageLoaded, setImageLoaded] = useState(true);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <TableRow key={item.id}>
      <TableCell>
        <div className="h-16 w-20 rounded overflow-hidden">
          {item.image_url && imageLoaded ? (
            <img 
              src={item.image_url} 
              alt={item.title} 
              className="h-full w-full object-cover" 
              onError={() => setImageLoaded(false)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <ImageIcon className="h-6 w-6 text-muted-foreground" />
            </div>
          )}
        </div>
      </TableCell>
      <TableCell className="font-medium">{item.title}</TableCell>
      <TableCell className="max-w-[300px] truncate">
        {item.description || "-"}
      </TableCell>
      <TableCell>
        {formatDate(item.created_at)}
      </TableCell>
      <TableCell>
        <div className="flex space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => onEdit(item)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => onDelete(item)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          {onViewDetail && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => onViewDetail(item)}
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View Details</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default GalleryItem;
