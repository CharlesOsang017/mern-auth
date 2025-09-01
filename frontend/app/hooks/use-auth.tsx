import { postData } from "@/lib/fetch-utils";
import type { forgotPasswordFormData } from "@/routes/auth/forgot-password";
import type { resetPasswordFormData } from "@/routes/auth/reset-password";
import type { SignInFormData } from "@/routes/auth/sign-in";
import type { SignUpFormData } from "@/routes/auth/sign-up";
import { useMutation } from "@tanstack/react-query";

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (data: SignUpFormData) => postData("auth/register", data),
  });
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (data: SignInFormData) => postData("auth/login", data),
  });
};

export const resetPasswordRequestMutation = () => {
  return useMutation({
    mutationFn: (data: forgotPasswordFormData) => postData("auth/request-password-reset", data),
  });
};

export const resetPasswordMutation = ()=>{
  return useMutation({
    mutationFn: (data: {token: string, newPassword: string, confirmPassword: string})=> postData("auth/reset-password", data),
  })
}