
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Folder, FolderOpen, X, Check, Edit, Trash2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

// This is a placeholder component for future implementation
// Will be integrated with Supabase once album functionality is added to the database

type Album = {
  id: string;
  name: string;
  description?: string;
  itemCount: number;
};

type GalleryAlbumsProps = {
  onSelectAlbum?: (albumId: string | null) => void;
  selectedAlbumId?: string | null;
};

const GalleryAlbums = ({ onSelectAlbum, selectedAlbumId }: GalleryAlbumsProps) => {
  const [albums, setAlbums] = useState<Album[]>([
    { id: '1', name: 'All Images', description: 'All gallery images', itemCount: 0 },
    { id: '2', name: 'Climate Events', description: 'Documentation of climate events', itemCount: 0 },
    { id: '3', name: 'Community Actions', description: 'Community climate initiatives', itemCount: 0 },
  ]);
  const [isCreating, setIsCreating] = useState(false);
  const [newAlbumName, setNewAlbumName] = useState('');
  const [editingAlbum, setEditingAlbum] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const handleCreateAlbum = () => {
    if (!newAlbumName.trim()) return;
    
    const newAlbum = {
      id: Date.now().toString(),
      name: newAlbumName,
      itemCount: 0,
    };
    
    setAlbums([...albums, newAlbum]);
    setNewAlbumName('');
    setIsCreating(false);
  };

  const handleEditAlbum = (album: Album) => {
    setEditingAlbum(album.id);
    setEditName(album.name);
  };

  const saveEdit = (id: string) => {
    if (!editName.trim()) return;
    
    setAlbums(albums.map(album => 
      album.id === id ? { ...album, name: editName } : album
    ));
    
    setEditingAlbum(null);
    setEditName('');
  };

  const handleDeleteAlbum = (id: string) => {
    // In a real implementation, this would need confirmation and would delete from the database
    setAlbums(albums.filter(album => album.id !== id));
    
    // If the deleted album was selected, reset selection
    if (selectedAlbumId === id && onSelectAlbum) {
      onSelectAlbum(null);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>Albums</CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsCreating(true)}
            disabled={isCreating}
          >
            <Plus className="h-4 w-4 mr-1" /> New
          </Button>
        </div>
        <CardDescription>Organize gallery items into albums</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {isCreating && (
          <div className="flex items-center space-x-2 p-2 border rounded-md bg-muted/50">
            <Input
              placeholder="Album name"
              value={newAlbumName}
              onChange={(e) => setNewAlbumName(e.target.value)}
              className="h-8"
              autoFocus
            />
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => setIsCreating(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            <Button 
              size="sm" 
              onClick={handleCreateAlbum} 
              disabled={!newAlbumName.trim()}
              className="bg-ghana-green hover:bg-ghana-green/90 h-8"
            >
              <Check className="h-4 w-4" />
            </Button>
          </div>
        )}
        
        <div className="space-y-1">
          {albums.map(album => (
            <div 
              key={album.id}
              className={`flex justify-between items-center p-2 rounded-md hover:bg-muted/50 cursor-pointer ${
                selectedAlbumId === album.id ? 'bg-muted' : ''
              }`}
              onClick={() => onSelectAlbum && onSelectAlbum(album.id === '1' ? null : album.id)}
            >
              <div className="flex items-center space-x-2">
                {selectedAlbumId === album.id ? (
                  <FolderOpen className="h-4 w-4 text-ghana-green" />
                ) : (
                  <Folder className="h-4 w-4 text-muted-foreground" />
                )}
                
                {editingAlbum === album.id ? (
                  <div className="flex items-center space-x-1">
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="h-7 py-0 text-sm"
                      autoFocus
                      onClick={(e) => e.stopPropagation()}
                    />
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-7 w-7 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingAlbum(null);
                      }}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      className="h-7 w-7 p-0 bg-ghana-green hover:bg-ghana-green/90"
                      onClick={(e) => {
                        e.stopPropagation();
                        saveEdit(album.id);
                      }}
                    >
                      <Check className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <span className="text-sm truncate max-w-[150px]">{album.name}</span>
                )}
              </div>
              
              {album.id !== '1' && !editingAlbum && (
                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 hover:opacity-100">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditAlbum(album);
                    }}
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 p-0 text-red-500 hover:text-red-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteAlbum(album.id);
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        Album functionality is in preview
      </CardFooter>
    </Card>
  );
};

export default GalleryAlbums;
