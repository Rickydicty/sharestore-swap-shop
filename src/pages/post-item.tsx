
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { TextInput, TextareaInput, SelectInput, FileInput } from "@/components/form-inputs";
import { SelectItem } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { categories } from "@/lib/mockData";
import { useStore } from "@/lib/store";

const CONDITIONS = ["New", "Like New", "Good", "Fair", "Poor"] as const;

export default function PostItemPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addItem } = useStore();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState<string>("");
  const [location, setLocation] = useState("");
  const [lookingFor, setLookingFor] = useState("");
  const [images, setImages] = useState<string[]>([]);
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  
  // Handle image upload (mock)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    // Maximum 5 images
    if (files.length + images.length > 5) {
      toast({
        title: "Too many images",
        description: "You can upload a maximum of 5 images",
        variant: "destructive",
      });
      return;
    }
    
    // For demo purposes, we'll use placeholder URLs
    // In a real app, you would upload these to a server and get back URLs
    const newImages = Array.from(files).map(
      (_, index) => `https://source.unsplash.com/random/800x800?sig=${Math.random()}`
    );
    
    setImages([...images, ...newImages]);
  };
  
  // Validate form before submission
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) newErrors.title = "Title is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!category) newErrors.category = "Category is required";
    if (!condition) newErrors.condition = "Condition is required";
    if (!location.trim()) newErrors.location = "Location is required";
    if (!lookingFor.trim()) newErrors.lookingFor = "This field is required";
    if (images.length === 0) newErrors.images = "At least one image is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Add item to store
    addItem({
      title,
      description,
      category,
      condition: condition as any,
      location,
      lookingFor,
      images,
    });
    
    // Show success toast
    toast({
      title: "Item Listed Successfully",
      description: "Your item has been listed on the marketplace.",
    });
    
    // Redirect to marketplace
    setTimeout(() => {
      navigate("/marketplace");
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8 px-4">
        <div className="container max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">List an Item</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <TextInput
              label="Title"
              name="title"
              required
              placeholder="e.g., MacBook Pro 2022, Mountain Bike, etc."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={errors.title}
            />
            
            <TextareaInput
              label="Description"
              name="description"
              required
              placeholder="Describe your item in detail. Include brand, model, age, any defects, etc."
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              error={errors.description}
            />
            
            <div className="grid sm:grid-cols-2 gap-4">
              <SelectInput
                label="Category"
                name="category"
                required
                placeholder="Select a category"
                value={category}
                onValueChange={setCategory}
                error={errors.category}
              >
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectInput>
              
              <SelectInput
                label="Condition"
                name="condition"
                required
                placeholder="Select condition"
                value={condition}
                onValueChange={setCondition}
                error={errors.condition}
              >
                {CONDITIONS.map((cond) => (
                  <SelectItem key={cond} value={cond}>
                    {cond}
                  </SelectItem>
                ))}
              </SelectInput>
            </div>
            
            <TextInput
              label="Location"
              name="location"
              required
              placeholder="e.g., New York, NY"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              error={errors.location}
            />
            
            <TextareaInput
              label="What are you looking for?"
              name="lookingFor"
              required
              placeholder="Describe what you'd like to receive in exchange"
              value={lookingFor}
              onChange={(e) => setLookingFor(e.target.value)}
              error={errors.lookingFor}
            />
            
            <FileInput
              label="Upload Images"
              name="images"
              required
              accept="image/*"
              multiple
              onChange={handleImageChange}
              preview={images}
              error={errors.images}
            />
            
            <div className="flex justify-end pt-6">
              <Button
                type="submit"
                className="bg-primary text-white hover-glow"
                disabled={isLoading}
              >
                {isLoading ? "Listing Item..." : "List Item"}
              </Button>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
