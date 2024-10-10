import { z } from "zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { FormInput } from "@/components/form/form-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Password } from "@/components/ui/password";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";
import { useSignInMutation } from "@/features/auth/authQuery";
import { authAction } from "@/features/auth/authSlice";
import { ErrorType } from "@/types/common";
import { useAppDispatch } from "@/store/store";
import { Icons } from "@/components/icon";

const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Enter your email" })
    .email({ message: "Enter a valid email" }),
  password: z.string().min(1, { message: "Enter your password" }),
});

export type LoginFormType = z.infer<typeof loginFormSchema>;

export function LoginForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [signIn, { error, isError, isLoading }] = useSignInMutation();
  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values: LoginFormType) => {
    try {
      const res = await signIn(values).unwrap();

      toast.success("Signed in successfully");
      dispatch(authAction.loginSuccess(res));
      localStorage.setItem("user", JSON.stringify(res));
      navigate("/");
    } catch (error: unknown) {
      const err = error as ErrorType;
      toast.dismiss();
      toast.error(err?.data?.message || "Invalid Credentials");
    }
  };

  return (
    <Card className="min-w-[350px]">
      <CardHeader className="">
        <CardTitle className="text-center text-2xl">Login</CardTitle>
        <CardDescription className="text-center">
          Create an account?{" "}
          <Link to="/auth/sign-up">
            {" "}
            <span className="cursor-pointer font-bold text-slate-950 hover:underline dark:text-white">
              {" "}
              Sign Up
            </span>
          </Link>
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="p-5">
          <div className="mb-4">
            <FormInput
              form={form}
              placeholder="john@gmail.com"
              label="Email"
              name="email"
              type="email"
              isAuth
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-base font-medium text-[#71717a] dark:text-white">
                      Password
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Password placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {!isLoading ? (
            <Button
              type="submit"
              className="w-full px-[22px]"
              disabled={!form.formState.isDirty}
            >
              Submit
            </Button>
          ) : (
            <Button disabled className="w-full">
              <Icons.buttonLoader className="mr-1 h-5  animate-spin stroke-card " />
              Loading...
            </Button>
          )}

          {isError && (
            <p className="mt-5 flex items-center justify-center text-sm text-red-600">
              {(error as any)?.data?.message}
            </p>
          )}
        </form>
      </Form>
    </Card>
  );
}
