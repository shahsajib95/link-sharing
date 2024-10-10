import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from "@/features/auth/authQuery";
import { Card } from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";
import { Icons } from "@/components/icon";
import { authAction } from "@/features/auth/authSlice";
import { Label } from "@/components/ui/label";
import { Camera, Image } from "lucide-react";
const profileFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Enter your name" })
    .email({ message: "Enter a valid email" }),
  firstName: z
    .string()
    .min(1, { message: "Enter your name" })
    .regex(/^[A-Za-z\s]+$/, { message: "Name should not contain numbers" }),
  lastName: z
    .string()
    .min(1, { message: "Enter your name" })
    .regex(/^[A-Za-z\s]+$/, { message: "Name should not contain numbers" }),
});

export type ProfileFromType = z.infer<typeof profileFormSchema>;

const Profile = () => {
  const { links } = useAppSelector((state) => state.auth);
  const { user } = useAppSelector((state) => state.auth.user);

  const {
    data,
    isLoading: userLaoding,
    isError: getUserError,
  } = useGetSingleUserQuery({
    id: user?._id,
  });

  const form = useForm<ProfileFromType>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        firstName: data?.firstName,
        lastName: data?.lastName,
        email: data?.email,
      });
    }
  }, [data, form]);

  const [updateUser, { isError, data: userUpdated, isLoading }] =
    useUpdateUserMutation();

  const storedUser = localStorage.getItem("user");
  const isUser = storedUser ? JSON.parse(storedUser) : null; // Handle null or undefined case

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userUpdated) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          user: userUpdated,
          token: isUser?.token,
        }),
      );

      toast.success("Data Updated Successfully!");
    }
    if (getUserError) {
      toast.error("An Error Occured!");
    }
    if (isError) {
      toast.error("An Error Occured!");
    }
  }, [getUserError, userUpdated, isError]);

  const onSubmit = async (value: ProfileFromType) => {
    const formData = new FormData();
    formData.append("firstName", value.firstName);
    formData.append("lastName", value.lastName);
    formData.append("email", value.email);
    file && formData.append("avatar", file);

    updateUser({
      data: formData,
      id: user?._id,
    });
  };

  const [file, setFile] = useState<File | undefined | null>(null);

  useEffect(() => {
    // Destructure the form values you want to watch
    const firstName = form.watch("firstName");
    const lastName = form.watch("lastName");
    const email = form.watch("email");

    dispatch(
      authAction.getName({
        firstName: firstName || user?.firstName,
        lastName: lastName || user?.lastName,
        email: email || user?.email,
        avatar: { src: file || avatar, type: file ? "file" : "link" },
      }),
    );

    // Add the specific values as dependencies to trigger on change
  }, [
    form.watch("firstName"),
    form.watch("lastName"),
    form.watch("email"),
    file,
  ]);

  useEffect(() => {
    if (links?.length == 0 || !links) {
      dispatch(authAction.getLinks(user?.links || []));
    } else {
      dispatch(authAction.getLinks(links || []));
    }
  }, [user]);

  const avatar = user?.avatar
    ? `${import.meta.env.VITE_API_FILE}${user?.avatar}`
    : "";
  console.log("avatar", avatar);

  if (userLaoding)
    return (
      <div className="flex justify-center">
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-7 min-w-max	 rounded-xl" />
          <Skeleton className="h-7 min-w-max	 rounded-xl" />
          <Skeleton className="h-7 min-w-max	 rounded-xl" />
        </div>
      </div>
    );
  return (
    <Card className="col-span-4 border-none p-5 shadow-none">
      <h2 className="font-bold text-gray-800">Profile Details</h2>
      <small className="text-gray-500">
        Add your details to create a personal touch to your profile.
      </small>
      <div className="my-3 mt-8 rounded-xl bg-gray-50 p-3 text-xs">
        <div className="grid items-center gap-6 md:grid-cols-12 lg:grid-cols-12">
          <div className="col-span-4 text-gray-500 md:col-span-4">
            Profile Picture
          </div>
          <div className="col-span-3 md:col-span-4">
            <Label htmlFor="profileAvatar">
              {file ? (
                <div className="group relative w-56">
                  {/* Image */}
                  <img
                    src={URL.createObjectURL(file)}
                    alt="profileImage"
                    className="rounded-xl border h-48 w-48 object-fill"
                  />

                  <div className="absolute inset-0  h-48 w-48 flex items-center justify-center rounded-xl bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Camera className="text-white" size="40" />
                  </div>
                </div>
              ) : (
                <div className="group relative w-56">
                  {avatar ? (
                    <img
                      src={avatar || "/images/no-image.png"}
                      alt="profileImage"
                      className="rounded-xl border h-48 w-48 object-fill	"
                    />
                  ) : (
                    <div className="h-48 w-48 w-full rounded-xl border bg-violet-100 flex items-center justify-center">
                      <div className="flex flex-col items-center text-primary">
                        <Image size="40" />
                        <br></br>
                        <span className="text-xs">Change Image</span>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 h-48 w-48 flex items-center justify-center rounded-xl bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="flex flex-col items-center text-white">
                      <Image size="40" />
                      <br></br>
                      <span className="text-xs">Change Image</span>
                    </div>
                  </div>
                </div>
              )}
            </Label>
            <input
              type="file"
              id="profileAvatar"
              className="hidden"
              accept=".jpg,.bmp,.png"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFile(e?.target?.files?.[0])
              }
            />
          </div>
          <div className="col-span-4 ms-5 text-gray-500">
            Image must be below 1024px X 1024px <br></br> Use PNG, JPG or BMP
            format
          </div>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <div className="my-5 rounded-xl bg-gray-50 p-3 text-xs">
            <div className="grid items-center md:grid-cols-6  lg:grid-cols-6">
              <span className="col-span-2 text-xs text-gray-500">
                First Name*
              </span>{" "}
              <div className="col-span-4">
                <FormInput
                  form={form}
                  placeholder="First name"
                  label=""
                  name="firstName"
                  type="text"
                />
              </div>
            </div>
            <div className="grid items-center md:grid-cols-6 lg:grid-cols-6">
              <span className="col-span-2 text-xs text-gray-500">
                Last Name*
              </span>{" "}
              <div className="col-span-4">
                <FormInput
                  form={form}
                  placeholder="Last Name"
                  label=""
                  name="lastName"
                  type="text"
                />
              </div>
            </div>
            <div className="grid items-center md:grid-cols-6  lg:grid-cols-6">
              <span className="col-span-2 text-xs text-gray-500">Email</span>{" "}
              <div className="col-span-4">
                <FormInput
                  form={form}
                  placeholder="Email"
                  label=""
                  name="email"
                  type="text"
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-end border-t-2 border-gray-100 ">
            {!isLoading ? (
              <Button className="ms:w-auto my-4 w-full lg:w-auto">Save</Button>
            ) : (
              <Button disabled className="my-4">
                <Icons.buttonLoader className="w-full animate-spin stroke-card md:w-auto lg:w-auto" />
                Loading...
              </Button>
            )}
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default Profile;
