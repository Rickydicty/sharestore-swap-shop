
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Item } from "@/lib/types";
import { MapPin } from "lucide-react";

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  return (
    <Link to={`/item/${item.id}`}>
      <Card className="overflow-hidden h-full card-hover">
        <div className="aspect-square w-full overflow-hidden">
          <img 
            src={item.images[0]} 
            alt={item.title} 
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105" 
          />
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start gap-2 mb-2">
            <h3 className="font-semibold text-lg line-clamp-1">{item.title}</h3>
            <Badge variant="outline">{item.condition}</Badge>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="line-clamp-1">{item.location}</span>
          </div>
          <Badge variant="secondary" className="text-xs">{item.category}</Badge>
        </CardFooter>
      </Card>
    </Link>
  );
}
