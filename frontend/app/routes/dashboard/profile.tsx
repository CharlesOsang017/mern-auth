import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/provider/auth-context";
import { Mail } from "lucide-react";

const profile = () => {
  const { logout, user } = useAuth();

  return (
    <div className='h-screen  flex flex-col items-center justify-center'>
      <h3 className='text-2xl mb-5'>User Profile</h3>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle className='text-sm text-center text-muted-foreground'>
            This user profile is not editable
          </CardTitle>
          <div className='flex items-center gap-2'>
            <Avatar>
              <AvatarImage src={user?.profilePicture} />
              <AvatarFallback>
                {user?.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <CardDescription className='font-semibold'>
              {user?.username}
            </CardDescription>
          </div>

          <div className='flex items-center gap-2'>
            <Mail className='w-4 h-4' />
            <CardDescription>{user?.email}</CardDescription>
          </div>
        </CardHeader>
        <CardFooter className='flex flex-col gap-2'>
          <Button onClick={logout} variant={"outline"} className="w-full cursor-pointer">Logout</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default profile;
