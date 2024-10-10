
import { Link } from "react-router-dom";


const ErrorPage = () => {
  // const [animationData, setAnimationData] = useState<any>();

  // useEffect(() => {
  //   import("../assets/animations/error-404.json").then(setAnimationData);
  // }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
 
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="fixed w-full h-full">
      <div className="flex justify-center items-center w-full h-full">
        <div className="text-center">
          
          <div className="text-xl">
            Sorry, The page you were looking for was not found.
          </div>
          <p className="my-2 text-xs">
            Maybe your URL is incorrect have a look
            <span className="bg-gray-200 px-1 mx-1 rounded font-medium">
              {window.location.href}
            </span>
            Enter or visit the correct URL.
          </p>
          <div className="w-max mx-auto my-5">
            <Link to="/" className="button_primary">
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
