import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import logo from "/fav-icon.png";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

const Header = () => {
  const { setTheme } = useTheme();

  return (
    <header className='sticky top-0 bg-background z-10'>
      <div className='container mx-auto flex justify-between py-2 items-center'>
        <div className='flex gap-8 items-center'>
          <a href={"/"} className='flex'>
            <img src={logo} alt='logo' className='max-h-8 h-auto' />
            <h1 className='text-2xl font-bold'>
              <span className='text-primary'>ig</span> Blog
            </h1>
          </a>
          <nav>
            <ul className='flex gap-2'>
              <li>
                <a href={"/"} className={"border-b border-primary bg-primary/10 hover:grayscale-100" + " py-1"}>
                  <Button variant='ghost'>Home</Button>
                </a>
              </li>
              <li>
                <a href={"/search"} className={"border-b border-primary bg-primary/10 hover:grayscale-100" + " py-1"}>
                  <Button variant='ghost'>Search</Button>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className='justify-self-end flex gap-2 items-center relative'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='icon'>
                <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
                <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
                <span className='sr-only'>Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <a href={"/login"}>
            <Button variant={"outline"}>Login</Button>
          </a>
          <a href={"/register"}>
            <Button>Register</Button>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
