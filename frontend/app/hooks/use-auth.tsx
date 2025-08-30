import { postData } from "@/lib/fetch-utils";
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
