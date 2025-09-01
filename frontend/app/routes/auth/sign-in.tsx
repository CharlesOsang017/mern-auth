import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signInSchema, signUpSchema } from "@/lib/schemas";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import { Eye, Loader } from "lucide-react";
import { useLoginMutation } from "@/hooks/use-auth";
import { toast } from "sonner";
import { useAuth } from "@/provider/auth-context";

export type SignInFormData = z.infer<typeof signInSchema>;

const SignIn = () => {
  const navigate = useNavigate();
  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { mutate, isPending } = useLoginMutation();
  const { login } = useAuth();

  const handleOnSubmit = (values: SignInFormData) => {
    mutate(values, {
      onSuccess: (data) => {
        login(data);
        toast.success("Logged in successfully");
        form.reset();
        // navigate("/");
      },
      onError: (error: any) => {
        const errorMessage =
          error?.response?.data?.message || "something went wrong";
        toast.error(errorMessage);
      },
    });
  };
  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-muted/40 p-4'>
      <Card className='max-w-md w-full shadow-xl'>
        <CardHeader className='text-center'>
          <CardTitle className='text-2xl'>Sign In</CardTitle>
          <CardDescription className='text-muted-foreground text-sm'>
            Sign in to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleOnSubmit)}
              className='space-y-4'
            >
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder='username' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex items-center justify-between'>
                      <FormLabel>Password</FormLabel>
                      <Link
                        to='/forgot-password'
                        className='text-sm text-blue-700'
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isPending} className='w-full cursor-pointer'>
                {isPending ? (
                  <Loader className='mr-2 animate-spin' />
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p className='text-muted-foreground text-sm'>
            Don't have an account?{" "}
            <Link to='/sign-up' className='text-blue-700 hover:underline'>
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;
