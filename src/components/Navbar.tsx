import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@radix-ui/react-navigation-menu';
import { Button } from './ui/button';
import { User } from '@/types/user';
import { useRouter } from 'next/navigation';

interface Props {
  authUser: User;
  onSignOut: () => void;
}

const Navbar = ({ authUser, onSignOut }: Props) => {
  const router = useRouter();
  const handleLogout = () => {
    if (confirm('Yakin ingin logout?')) {
      alert('Logout berhasil');
      onSignOut();
      router.push('/');
    }
  };

  return (
    <NavigationMenu className="w-full fixed top-0 left-0 py-6 px-10 bg-neutral-800">
      <NavigationMenuList className="flex items-center justify-between">
        <div>
          <NavigationMenuItem className="font-bold text-xl text-white">
            Forum App
          </NavigationMenuItem>
        </div>

        <div className="flex items-center gap-4 text-white">
          <NavigationMenuItem>
            <NavigationMenuLink href="/">Home</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/leaderboards">
              Leaderboards
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem className="flex items-center">
            <h4 className="mr-5">Hai, {authUser.name}</h4>
            <Button
              className="bg-blue-500 cursor-pointer hover:bg-blue-600"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </NavigationMenuItem>
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navbar;
