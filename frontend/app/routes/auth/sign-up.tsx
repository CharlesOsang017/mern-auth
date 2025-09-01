import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signUpSchema } from "@/lib/schemas";
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
import { Eye, EyeOff, Loader } from "lucide-react";
import { useRegisterMutation } from "@/hooks/use-auth";
import { toast } from "sonner";
import { useState } from "react";

export type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const navigate = useNavigate();
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate: register, isPending } = useRegisterMutation();

  const handleOnSubmit = (data: SignUpFormData) => {
    register(data, {
      onSuccess: () => {
        toast.success("Account created successfully");
        form.reset();
        navigate("/sign-in");
      },
      onError: (error: any) => {
        const errorMessage =
          error?.response?.data?.message || "something went wrong";
        toast.error(errorMessage);
        console.log(error.message);
      },
    });
  };
  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-muted/40 p-4'>
      <Card className='max-w-md w-full shadow-xl'>
        <CardHeader className='text-center'>
          <CardTitle className='text-2xl'>Sign Up</CardTitle>
          <CardDescription className='text-muted-foreground text-sm'>
            Create an account to continue
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
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type='email' placeholder='email' {...field} />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder='password'
                          {...field}
                        />
                        {showPassword ? (
                          <Eye
                            className='absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer'
                            size={20}
                            onClick={() =>
                              setShowPassword((prevState) => !prevState)
                            }
                          />
                        ) : (
                          <EyeOff
                            onClick={() =>
                              setShowPassword((prevState) => !prevState)
                            }
                            className='absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer'
                            size={20}
                          />
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder='password'
                          {...field}
                        />
                        {showConfirmPassword ? (
                          <Eye
                            className='absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer'
                            size={20}
                            onClick={() =>
                              setShowConfirmPassword((prevState) => !prevState)
                            }
                          />
                        ) : (
                          <EyeOff
                            onClick={() =>
                              setShowConfirmPassword((prevState) => !prevState)
                            }
                            className='absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer'
                            size={20}
                          />
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isPending} className='w-full cursor-pointer'>
                {isPending ? <Loader className='animate-spin' /> : "Sign Up"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p className='text-muted-foreground text-sm'>
            Already have an account?{" "}
            <Link to='/sign-in' className='text-blue-700 hover:underline'>
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
