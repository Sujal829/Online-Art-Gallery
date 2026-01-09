import React, { useState, useMemo } from 'react';
import {  motion  } from 'framer-motion';
import {  Plus, Edit2, Trash2, Package, DollarSign  } from 'lucide-react';
import Navbar from '@/components/Navbar';
import {  useAuth  } from '@/context/AuthContext';
import productsData from '@/data/products.json';
import {  Button  } from '@/components/ui/button';
import {  Input  } from '@/components/ui/input';
import {  Label  } from '@/components/ui/label';
import {  Textarea  } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue } from '@/components/ui/select';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter } from '@/components/ui/dialog';
import {  useToast  } from '@/hooks/use-toast';

const ArtistDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [products, setProducts] = useState(
    productsData.products.filter((p) => p.artistId === user?.id)
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'Paintings',
    price: '',
    discount: '',
    image: '',
    description: '',
  });

  const totalValue = useMemo(() => {
    return products.reduce((sum, p) => sum + (p.price - (p.price * p.discount) / 100), 0);
  }, [products]);

  const resetForm = () => {
    setFormData({
      title: '',
      category: 'Paintings',
      price: '',
      discount: '',
      image: '',
      description: '',
    });
    setEditingProduct(null);
  };

  const handleOpenAddModal = () => {
    resetForm();
    setShowAddModal(true);
  };

  const handleEdit = (product) => {
    setFormData({
      title: product.title,
      category: product.category,
      price: product.price.toString(),
      discount: product.discount.toString(),
      image: product.image,
      description: product.description,
    });
    setEditingProduct(product);
    setShowAddModal(true);
  };

  const handleDelete = (productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    toast({
      title: 'Artwork deleted',
      description: 'The artwork has been removed from your portfolio',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.price || !formData.image) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    if (editingProduct) {
      // Update existing product
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                ...formData,
                price: parseFloat(formData.price),
                discount: parseFloat(formData.discount) || 0,
              }
            : p
        )
      );
      toast({
        title: 'Artwork updated',
        description: 'Your changes have been saved',
      });
    } else {
      // Add new product
      const newProduct = {
        id: Date.now(),
        title: formData.title,
        category: formData.category,
        artistId: user.id,
        artistName: user.name,
        price: parseFloat(formData.price),
        discount: parseFloat(formData.discount) || 0,
        image: formData.image,
        description: formData.description,
      };
      setProducts((prev) => [...prev, newProduct]);
      toast({
        title: 'Artwork added',
        description: 'Your new artwork is now live in the gallery',
      });
    }

    setShowAddModal(false);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-8">
        {/* Artist Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-lg p-6 shadow-card mb-8"
        >
          <div className="flex items-start gap-6">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="h-20 w-20 rounded-full object-cover ring-4 ring-accent/20"
            />
            <div className="flex-1">
              <h1 className="font-heading text-2xl font-semibold">{user?.name}</h1>
              <p className="text-muted-foreground">{user?.email}</p>
              {user?.bio && (
                <p className="text-sm mt-2">{user.bio}</p>
              )}
            </div>
            <div className="flex gap-4">
              <div className="text-center">
                <Package className="h-6 w-6 mx-auto text-accent mb-1" />
                <p className="font-heading text-xl font-semibold">{products.length}</p>
                <p className="text-xs text-muted-foreground">Artworks</p>
              </div>
              <div className="text-center">
                <DollarSign className="h-6 w-6 mx-auto text-gallery-success mb-1" />
                <p className="font-heading text-xl font-semibold">Rs:-{totalValue.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Portfolio Value</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-xl font-semibold">My Artworks</h2>
          <Button onClick={handleOpenAddModal}>
            <Plus className="h-4 w-4 mr-2" />
            Add Artwork
          </Button>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-lg">
            <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No artworks yet. Add your first piece!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-lg overflow-hidden shadow-card"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    {product.category}
                  </p>
                  <h3 className="font-heading text-lg font-medium mt-1">{product.title}</h3>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="font-heading font-semibold">
                      Rs:-{(product.price - (product.price * product.discount) / 100).toLocaleString()}
                    </span>
                    {product.discount > 0 && (
                      <span className="text-sm text-muted-foreground line-through">
                        Rs:-{product.price.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleEdit(product)}
                    >
                      <Edit2 className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-heading">
              {editingProduct ? 'Edit Artwork' : 'Add New Artwork'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter artwork title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Paintings">Paintings</SelectItem>
                  <SelectItem value="Sketches">Sketches</SelectItem>
                  <SelectItem value="Digital Art">Digital Art</SelectItem>
                  <SelectItem value="Sculptures">Sculptures</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price (Rs:-) *</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discount">Discount (%)</Label>
                <Input
                  id="discount"
                  type="number"
                  value={formData.discount}
                  onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image URL *</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your artwork..."
                rows={3}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editingProduct ? 'Save Changes' : 'Add Artwork'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ArtistDashboard;
