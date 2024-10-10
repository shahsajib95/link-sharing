import { Icons } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  SelectContent,
  SelectItem,
  Select,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from "@/features/auth/authQuery";
import { authAction } from "@/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { GetIcon, platformTypes } from "@/utils/link";
import { Equal, Link } from "lucide-react";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import toast from "react-hot-toast";

export default function Linkform() {
  const dispatch = useAppDispatch();
  const { user, links } = useAppSelector((state) => state.auth);

  const {
    data,
    isLoading: userLaoding,
    isError: getUserError,
  } = useGetSingleUserQuery(
    {
      id: user?.user?._id,
    },
    { refetchOnMountOrArgChange: true },
  );

  const [userLinks, setUserLinks] = useState<any>([
    { link: "", platform: "", sequence: 1, error: "" },
  ]);

  useEffect(() => {
    if (links?.length == 0 || !links) {
      setUserLinks(data?.links);
    } else {
      setUserLinks(links);
    }
  }, [data]);

  const handlePlatform = (index: number, value: string) => {
    const oldLinks = [...userLinks];
    const updatedPlatform = { ...oldLinks[index], platform: value };
    oldLinks[index] = updatedPlatform;
    setUserLinks(oldLinks);
  };

  const handleLink = (index: number, value: string) => {
    const oldLinks = [...userLinks];
    const updatedLink = { ...oldLinks[index], link: value };
    oldLinks[index] = updatedLink;
    setUserLinks(oldLinks);
  };

  useEffect(() => {
    const avatar = user?.user?.avatar
      ? `${import.meta.env.VITE_API_FILE}${user?.user?.avatar}`
      : "";

    dispatch(
      authAction.getName({
        firstName: user?.user?.firstName,
        lastName: user?.user?.lastName,
        email: user?.user?.email,
        avatar: { src: avatar, type: "link" },
      }),
    );
  }, [user]);

  useEffect(() => {
    dispatch(authAction.getLinks(userLinks));
  }, [userLinks]);

  const handleOnDragEnd = (result: any) => {
    const { destination, source } = result;

    // If the item is dropped outside of a droppable area or dropped in the same position
    if (!destination || destination.index === source.index) return;

    // Create a copy of the current userLinks array
    const items = Array.from(userLinks);

    // Remove the dragged item from its original position
    const [reorderedItem] = items.splice(source.index, 1);

    // Insert the dragged item into its new position
    items.splice(destination.index, 0, reorderedItem);

    // Update the state with the reordered items
    setUserLinks(items); // Update the state directly
  };

  const [updateUser, { isError, data: userUpdated, isLoading }] =
    useUpdateUserMutation();

  useEffect(() => {
    if (userUpdated) {
      dispatch(authAction.getLinks(userUpdated?.links));
      toast.success("Data Updated Successfully!");
      // localStorage.setItem(
      //   "user",
      //   JSON.stringify({
      //     user: { ...auth?.user?.user, links: userLinks },
      //     token: auth?.user?.token,
      //   }),
      // );
    }

    if (isError) {
      toast.error("An Error Occured!");
    }
  }, [userUpdated, isError]);

  const handleSave = () => {
    const isValidUrl = (url: string) => {
      try {
        new URL(url);
        return true; // The URL is valid
      } catch {
        return false; // The URL is not valid
      }
    };

    // Validate userLinks
    const updatedLinks = userLinks.map((linkObj: any) => {
      let errorMessage = "";

      if (!linkObj.link) {
        errorMessage = "Link cannot be empty.";
      } else if (!isValidUrl(linkObj.link)) {
        errorMessage = "Please enter a valid URL.";
      } else if (!linkObj.platform) {
        errorMessage = "Platform must be selected.";
      }

      // Return updated object with error message if applicable
      return { ...linkObj, error: errorMessage };
    });

    // Check if there are any error messages
    const hasErrors = updatedLinks.some((link: any) => link.error);

    if (hasErrors) {
      setUserLinks(updatedLinks); // Update state with error messages
      return; // Exit the function if there are errors
    }

    updateUser({
      data: {
        links: userLinks,
      },
      id: user?.user?._id,
    });
  };

  const addNewLink = () => {
    const nextSequence =
      userLinks.length > 0
        ? Math.max(...userLinks.map((link: any) => link.sequence)) + 1
        : 1; // Start with 1 if no links exist

    if (userLinks?.length == 5) return toast.error("Can't add more than 5!");
    setUserLinks([
      ...userLinks,
      {
        link: "",
        platform: "",
        sequence: nextSequence,
        error: "",
      },
    ]);
  };

  useEffect(() => {
    if (getUserError) {
      toast.error("An Error Occured!");
    }
  }, [getUserError]);

  console.log("userLinks", userLinks);

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
    <div>
      <Button
        variant="outline"
        className="my-4 mt-8 w-full border-primary text-primary"
        onClick={addNewLink}
      >
        + Add a new Link
      </Button>

      {userLinks?.length == 0 ? (
        <p className="p-5 text-center text-xs text-gray-500">
          No Links to show!
        </p>
      ) : (
        <>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="draggable" direction="vertical">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {userLinks?.map((link: any, index: number) => {
                    return (
                      <Draggable
                        key={index} // Use a unique key here, replace with link.id if available
                        draggableId={`${index}-${link?.sequence}`} // Ensure unique draggableId
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="my-3 mb-5 w-full rounded-xl bg-gray-50 p-3 text-gray-600"
                          >
                            <div>
                              <div className="mb-2 flex justify-between text-sm">
                                <div className="flex">
                                  <Equal />{" "}
                                  <span className="ms-1 font-semibold">
                                    Link #{index + 1}
                                  </span>
                                </div>
                                <p
                                  className="cursor-pointer font-light"
                                  onClick={() => {
                                    const removeLink = userLinks.filter(
                                      (_: any, indx: number) => indx !== index,
                                    );
                                    setUserLinks(removeLink);
                                  }}
                                >
                                  Remove
                                </p>
                              </div>
                              {link?.error && (
                                <p className="text-xs text-red-500">
                                  {link.error}*
                                </p>
                              )}
                              <div>
                                <Label className="text-xs">Platform</Label>
                                <Select
                                  onValueChange={(e) =>
                                    handlePlatform(index, e)
                                  }
                                  defaultValue={link?.platform}
                                >
                                  <SelectTrigger icon={GetIcon(link?.platform)}>
                                    <SelectValue
                                      placeholder={
                                        link?.platform || "Select Platform"
                                      }
                                    />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {platformTypes?.map((platform) => (
                                      <SelectItem
                                        key={platform.type}
                                        value={platform.type}
                                      >
                                        <div className="flex">
                                          <span className="ms-2">
                                            {platform.type}
                                          </span>
                                        </div>
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label className="text-xs">Link</Label>
                                <Input
                                  icon={<Link size="15" />}
                                  defaultValue={link.link}
                                  onChange={(e) =>
                                    handleLink(index, e.target.value)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>{" "}
          <div className="mt-8 flex justify-end border-t-2 border-gray-100">
            {!isLoading ? (
              <Button className="my-4" onClick={handleSave}>
                Save
              </Button>
            ) : (
              <Button disabled className="my-4">
                <Icons.buttonLoader className="animate-spin stroke-card " />
                Loading...
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
