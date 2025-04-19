
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Layers, 
  Repeat, 
  Bookmark, 
  Bell, 
  User, 
  Settings,
  Package
} from "lucide-react";
import { useStore } from "@/lib/store";
import { Badge } from "@/components/ui/badge";

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  badge?: number;
}

function SidebarLink({ href, icon, children, badge }: SidebarLinkProps) {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        isActive 
          ? "bg-primary text-primary-foreground" 
          : "hover:bg-muted"
      )}
    >
      {icon}
      <span>{children}</span>
      {badge ? (
        <Badge variant="secondary" className="ml-auto">
          {badge}
        </Badge>
      ) : null}
    </Link>
  );
}

export function DashboardSidebar() {
  const { currentUser, notifications } = useStore();
  
  const unreadNotifications = notifications.filter(
    notification => !notification.read && notification.userId === currentUser.id
  ).length;

  return (
    <div className="w-64 h-[calc(100vh-4rem)] flex-shrink-0 border-r hidden md:block">
      <div className="flex flex-col h-full p-4">
        <div className="flex items-center gap-2 px-3 py-2">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-medium line-clamp-1">{currentUser.name}</p>
            <p className="text-xs text-muted-foreground line-clamp-1">{currentUser.email}</p>
          </div>
        </div>
        
        <nav className="flex-1 pt-6 space-y-1">
          <SidebarLink href="/dashboard" icon={<Layers className="h-4 w-4" />}>
            Dashboard
          </SidebarLink>
          <SidebarLink href="/dashboard/listings" icon={<Package className="h-4 w-4" />}>
            My Listings
          </SidebarLink>
          <SidebarLink href="/dashboard/offers" icon={<Repeat className="h-4 w-4" />}>
            My Offers
          </SidebarLink>
          <SidebarLink href="/dashboard/saved" icon={<Bookmark className="h-4 w-4" />}>
            Saved Items
          </SidebarLink>
          <SidebarLink 
            href="/dashboard/notifications" 
            icon={<Bell className="h-4 w-4" />}
            badge={unreadNotifications}
          >
            Notifications
          </SidebarLink>
        </nav>
        
        <div className="pt-6 space-y-1 border-t">
          <SidebarLink href="/dashboard/profile" icon={<User className="h-4 w-4" />}>
            Profile
          </SidebarLink>
          <SidebarLink href="/dashboard/settings" icon={<Settings className="h-4 w-4" />}>
            Settings
          </SidebarLink>
        </div>
      </div>
    </div>
  );
}

export function MobileDashboardNav() {
  const { currentUser, notifications } = useStore();
  
  const unreadNotifications = notifications.filter(
    notification => !notification.read && notification.userId === currentUser.id
  ).length;

  return (
    <div className="flex items-center justify-between p-4 border-b md:hidden">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full overflow-hidden">
          <img 
            src={currentUser.avatar} 
            alt={currentUser.name}
            className="w-full h-full object-cover"
          />
        </div>
        <span className="font-medium">{currentUser.name}</span>
      </div>
      
      <div className="flex gap-1">
        <Link
          to="/dashboard/notifications"
          className={cn(
            "flex items-center justify-center w-8 h-8 rounded-full",
            unreadNotifications > 0 ? "text-primary" : "text-muted-foreground"
          )}
        >
          <Bell className="h-5 w-5" />
          {unreadNotifications > 0 && (
            <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[10px]">
              {unreadNotifications}
            </Badge>
          )}
        </Link>
      </div>
    </div>
  );
}
