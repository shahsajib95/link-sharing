import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import UserView from "@/components/UserView";
import { useGetPrevieweUserQuery } from "@/features/auth/authQuery";
import { useAppSelector } from "@/store/store";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";

export default function Preview() {
  const { id } = useParams();

  const { user } = useAppSelector((state) => state.auth);

  const {
    data,
    isLoading: userLaoding,
    isError: getUserError,
  } = useGetPrevieweUserQuery({
    id: id 
  }, {refetchOnMountOrArgChange: true});

 

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        toast.success("Copied to clipboard!");
      })
      .catch((err) => {
        console.error("Error copying text: ", err);
        toast.error("An Error Occured!");
      });
  };

  const preview = user?.user?._id ? false : true;

  useEffect(() => {
    if (getUserError) {
      toast.error("An Error Occured!");
    }
  }, [getUserError]);

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
    <section className="relative z-10 h-60 rounded-bl-3xl rounded-br-3xl md:bg-primary lg:bg-primary lg:pt-5 md:pt-5">
      {!preview && (
        <div className="relative z-20 m-5 mt-0 flex justify-between rounded-lg bg-white p-5">
          <Link to="/">
            <Button
              variant="outline"
              className="cursor-pointer border-primary text-primary"
            >
              Back to Editor
            </Button>
          </Link>
          <Button className="cursor-pointer" onClick={copyToClipboard}>
            Share Link
          </Button>
        </div>
      )}
      <div className="absolute lg:absolute md:absolute inset-0 z-10 flex flex-col items-center lg:pt-36 md:pt-36 pt-10">
        <Card className="lg:min-w-[300px] md:min-w-[300px] rounded-xl border-none p-5 lg:shadow-2xl md:shadow-2xl shadow-none">
          <UserView user={{...data, avatar: `${import.meta.env.VITE_API_FILE}${data?.avatar}`}} links={data?.links} />
        </Card>
      </div>
    </section>
  );
}
