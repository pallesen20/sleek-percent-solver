import React from 'react';
import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Header = () => {
  return (
    <header className="w-full bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <NavigationMenu className="w-full max-w-full">
          <NavigationMenuList className="flex justify-center space-x-8">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/"
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-white hover:text-white hover:bg-white/10 bg-transparent"
                  )}
                >
                  Percentage Calculator
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/word-counter"
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-white hover:text-white hover:bg-white/10 bg-transparent"
                  )}
                >
                  Word Counter
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-white hover:text-white hover:bg-white/10 bg-transparent">
                Conversion
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-48 p-2">
                  <NavigationMenuLink asChild>
                    <Link
                      to="/length-converter"
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="text-sm font-medium leading-none">
                        Length Converter
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Convert between different length units
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};

export default Header;