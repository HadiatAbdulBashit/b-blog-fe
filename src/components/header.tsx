import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import logo from "/fav-icon.png";
import { LogOut, Moon, Sun, User } from "lucide-react";
import { useTheme } from "./theme-provider";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useInitials } from "@/hooks/use-initials";
import AuthApi from "@/apis/AuthApi";

const Header = () => {
  const getInitials = useInitials();
  const navigate = useNavigate();
  const { setTheme } = useTheme();

  const { user, isAuthenticated } = useSelector((state: any) => state.auth);

  const onClickLogout = async () => {
    try {
      await AuthApi.logout();
      navigate("/");
    } catch (error) {
      // For Development
      // console.log(error);
    }
  };

  return (
    <header className='sticky top-0 bg-background z-10'>
      <div className='container mx-auto flex justify-between py-2 items-center'>
        <div className='flex gap-8 items-center'>
          <Link to={"/"} className='flex'>
            <img src={logo} alt='logo' className='max-h-8 h-auto' />
            <h1 className='text-2xl font-bold'>
              <span className='text-primary'>ig</span> Blog
            </h1>
          </Link>
          <nav>
            <ul className='flex gap-2'>
              <li>
                {/* For future implementation */}
                {/* <NavLink
                  to={"/"}
                  className={({ isActive }) => (isActive ? "border-b border-primary bg-primary/10 hover:grayscale-100" : "none") + " py-1"}
                >
                  <Button variant='ghost'>Home</Button>
                </NavLink> */}
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

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='size-10 rounded-full p-1'>
                  <Avatar className='size-8 overflow-hidden rounded-full'>
                    {/* Future Implementation */}
                    {/* <AvatarImage src={user.profileImage} alt={user.name} /> */}
                    <AvatarFallback className='rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white'>
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-56' align='end'>
                <DropdownMenuLabel className='p-0 font-normal'>
                  <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                    <Avatar className='h-8 w-8 overflow-hidden rounded-full'>
                      {/* Future Implementation */}
                      {/* <AvatarImage src={user.profileImage} alt={user.name} /> */}
                      <AvatarFallback className='rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white'>
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className='grid flex-1 text-left text-sm leading-tight'>
                      <span className='truncate font-medium'>{user.name}</span>
                      <span className='text-muted-foreground truncate text-xs'>{user.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link className='block w-full' to={"/profile"}>
                      <User className='mr-2' />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <button className='block w-full' onClick={() => onClickLogout()}>
                    <LogOut className='mr-2' />
                    Log out
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to={"/login"}>
                <Button variant={"outline"}>Login</Button>
              </Link>
              <Link to={"/register"}>
                <Button>Register</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
