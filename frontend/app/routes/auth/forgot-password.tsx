import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Form,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { resetPasswordRequestMutation } from "@/hooks/use-auth";
import { forgotPasswordSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, CheckCircle, Loader } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { toast } from "sonner";
import z from "zod";

export type forgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
const ForgotPassword = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const form = useForm<forgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const { mutate, isPending } = resetPasswordRequestMutation();
  const onSubmit = async (data: forgotPasswordFormData) => {
    mutate(data, {
      onSuccess: () => {
        setIsSuccess(true);
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
    <div className='h-screen flex items-center justify-center'>
      <div className='flex flex-col w-full max-w-md'>
        <h1 className='text-center text-2xl'>Forgot Password</h1>
        <p className='text-md text-muted-foreground text-center'>
          Enter your email to reset your password
        </p>
        <Card className='mt-4'>
          <CardHeader>
            <Link to={"/sign-in"} className='flex items-center gap-2'>
              <ArrowLeft size={16} /> <span>Back to sign in</span>
            </Link>
          </CardHeader>
          <CardContent>
            {isSuccess ? (
              <div className='flex flex-col items-center justify-center'>
                <CheckCircle className='w-10 h-10 text-green-500' />
                <h1 className='text-xl font-bold'>Password reset email sent</h1>
                <p className='text-muted-foreground'>
                  Check your email for a link to reset your password
                </p>
              </div>
            ) : (
              <>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-4'
                  >
                    <FormField
                      control={form.control}
                      name='email'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type='email'
                              {...field}
                              placeholder='Enter your email'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type='submit'
                      className='w-full cursor-pointer'
                      disabled={isPending}
                    >
                      {isPending ? (
                        <Loader className='w-4 h-4 animate-spin' />
                      ) : (
                        "Reset Password"
                      )}
                    </Button>
                  </form>
                </Form>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
