
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-6 md:py-10 border-t">
      <div className="container flex flex-col items-center justify-center gap-4 md:gap-6 text-center">
        <p className="text-sm text-muted-foreground">
          Built with <Heart className="inline-block w-4 h-4 text-primary" /> by Abdul Rauf Jatoi | Idea by Mehmood Shar, CEO of iCreativez Technologies
        </p>
        <Link 
          to="https://rauf-psi.vercel.app" 
          target="_blank" 
          rel="noreferrer"
          className="text-sm font-medium underline underline-offset-4 text-primary hover:text-primary/80 transition-colors"
        >
          Visit Creator
        </Link>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} ShareStore. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
