import { useEffect, useState } from "react";

type WindowFocus = {
  onFocus: () => void;
  onBlur?: () => void;
};

const useWindowFocus = ({}: WindowFocus) => {
  // User has switched back to the tab
  const onFocus = () => {
    console.log("Tab is in focus");
  };

  // User has switched away from the tab (AKA tab is hidden)
  const onBlur = () => {
    console.log("Tab is blurred");
  };

  useEffect(() => {
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);
    // Calls onFocus when the window first loads
    onFocus();
    // Specify how to clean up after this effect:
    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  const [windowIsActive, setWindowIsActive] = useState(true);

  function handleActivity(forcedFlag: any) {
    if (typeof forcedFlag === "boolean") {
      return forcedFlag ? setWindowIsActive(true) : setWindowIsActive(false);
    }

    return document.hidden ? setWindowIsActive(false) : setWindowIsActive(true);
  }

  useEffect(() => {
    const handleActivityFalse = () => handleActivity(false);
    const handleActivityTrue = () => handleActivity(true);

    document.addEventListener("visibilitychange", handleActivity);
    document.addEventListener("blur", handleActivityFalse);
    window.addEventListener("blur", handleActivityFalse);
    window.addEventListener("focus", handleActivityTrue);
    document.addEventListener("focus", handleActivityTrue);

    return () => {
      window.removeEventListener("blur", handleActivity);
      document.removeEventListener("blur", handleActivityFalse);
      window.removeEventListener("focus", handleActivityFalse);
      document.removeEventListener("focus", handleActivityTrue);
      document.removeEventListener("visibilitychange", handleActivityTrue);
    };
  }, []);

  return { onFocus, onBlur, windowIsActive };
};

export default useWindowFocus;
