import "../../styles/globals.css";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { useColorScheme } from "@mui/material";
import { useState } from "react";

function HeaderComponent() {
  const [dark, setDark] = useState(false);

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
    toggleColorScheme();
  };
  const { mode, setMode } = useColorScheme();

  const toggleColorScheme = () => {
    setMode(mode === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex flex-row-reverse items-center justify-between w-full bg-lightTheme-secondary dark:bg-darkTheme-secondary h-[100px]">
      <div className="flex flex-row-reverse items-center">
        <h1 className="font-mono leading-tight tracking-tighter text-5xl mr-5">
          חיבורים
        </h1>

        <span className="m-4 self-end text-2xl">חידה #1</span>
      </div>

      <div className="flex items-center">
        <span className="text-2xl m-10 hover:cursor-pointer hover:text-white dark:hover:text-black">
          ?איך משחקים
        </span>
        <button className="" onClick={() => darkModeHandler()}>
          {dark ? <BedtimeIcon /> : <WbSunnyIcon />}
        </button>
      </div>
    </div>
  );
}

export default HeaderComponent;
