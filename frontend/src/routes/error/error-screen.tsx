import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ErrorScreen = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/", { replace: true });
  };

  return (
    <section className=" flex h-screen items-center justify-center">
      <div className="custom-container mx-auto  flex flex-col items-center justify-center">
        <div className="max-w-md text-center">
          <h2 className="mb-8 text-9xl font-extrabold ">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold  md:text-3xl">
            Sorry, we couldn't find this page.
          </p>
          <p className="mb-8 mt-4 text-muted-foreground">
            But don't worry, you can find plenty of other things on our
            homepage.
          </p>
          <Button onClick={handleNavigate}>Back to homepage</Button>
        </div>
      </div>
    </section>
  );
};

export default ErrorScreen;
