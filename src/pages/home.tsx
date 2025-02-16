import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  SnackbarContent,
  Typography,
  useTheme,
} from "@mui/material";
import "../styles/globals.css";
import { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import { GameItem } from "@/types/gameItem";
import { Group } from "@/types/group";
import GroupContainer from "./components/groupContainer";
import { getLevelByDate, getLevels } from "@/clientAPI/levels";
import { Level } from "@/types/level";

function HomePage() {

  const theme = useTheme();

  const [levels, setLevels] = useState<Level[]>([]);

  const [allItems, setAllItems] = useState<GameItem[]>([]);

  const [gameItems, setGameItems] = useState<GameItem[]>(allItems);

  const [selectedItems, setSelectedItems] = useState<GameItem[]>([]);

  const [groups, setGroups] = useState<Group[]>([]);

  const [wrongGuessCount, setWrongGuessCount] = useState(0);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    getLevels().then((data) => {
      setLevels(data);
    })
    getLevelByDate(new Date("2025-02-12")).then((data) => {
      console.log(data);
      if (data) {
        setAllItems(data.gameItems);
        setGameItems(data.gameItems);
      }
    });
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const shuffleItems = (gameItems: GameItem[]) => {
    const shuffledItems = [...gameItems]; // Create a copy of the gameItems array
    for (let i = shuffledItems.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledItems[i], shuffledItems[j]] = [
        shuffledItems[j],
        shuffledItems[i],
      ];
    }
    return shuffledItems;
  };

  const selectItem = (item: GameItem) => {
    const items = [...gameItems];

    if (!item.selected && selectedItems.length <= 3) {
      item.selected = true;
      setSelectedItems([...selectedItems, item]);
    } else {
      item.selected = false;
      setSelectedItems(selectedItems.filter((a) => a !== item));
    }
    setGameItems(items);
  };

  const submitItems = () => {
    if (selectedItems.length == 4) {
      let group: Group = selectedItems[0].group;
      console.log(selectedItems[0]);
      let isCorrect: boolean = true;
      let isAlmostCorrect: boolean = false;
      let correctWordCount = 0;
      for (let i: number = 0; i < 4; i++) {
        for (let j: number = 0; j < 4; j++) {
          if (selectedItems[i].group.name == selectedItems[j].group.name) {
            correctWordCount++;
          }
          if (correctWordCount == 3) {
            isAlmostCorrect = true;
          }
        }
        correctWordCount = 0;
        if (selectedItems[i].group.name != group.name) {
          isCorrect = false;
        }
        selectedItems[i].selected = false;
      }
      if (isCorrect) {
        const newGroups = [...groups, group];
        setGroups(newGroups);
        setGameItems(gameItems.filter((item) => !selectedItems.includes(item)));
      } else {
        if (isAlmostCorrect) {
          setOpen(true);
        }
        setWrongGuessCount(wrongGuessCount + 1);
      }
      setSelectedItems([]);
    }
  };

  return (
    <div className="flex flex-col items-center m-10">
      <div>
        <Accordion
          className="bg-lightTheme-secondary dark:bg-darkTheme-secondary text-black dark:text-white"
          sx={{
            width: "120px",
            alignSelf: "flex-end",
            position: "absolute",
            right: "50px",
            backgroundColor: `${theme.palette.primary.main}`
          }}
        >
          <AccordionSummary aria-controls="panel1-content" id="panel1-header">
            <Typography component="span">ארכיון</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {levels.map((level) => ("חידה " + level.id + "#"))}
          </AccordionDetails>
        </Accordion>
        <div>
          <span className="text-2xl">ניחושים לא נכונים: {wrongGuessCount}</span>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="inline-grid gap-2 my-5 grid-cols-4 w-[750px]">
          {groups.map((group) => (
            <GroupContainer
              groupName={group.name}
              items={allItems.filter((item) => item.group.name == group.name)}
              backgroundColor={group.color}
              key={group.name}
            />
          ))}

          {gameItems.map((item) => {
            return (
              <div
                onClick={() => selectItem(item)}
                className={`w-[180px] h-[100px] font-bold dark:text-white dark:bg-darkTheme-secondary rounded-xl text-lightTheme-text flex items-center justify-center ${
                  item.selected
                    ? "bg-lightTheme-effect2"
                    : "bg-lightTheme-secondary"
                } ${
                  item.selected
                    ? "dark:bg-darkTheme-effect2"
                    : "dark:bg-darkTheme-secondary"
                } hover:bg-lightTheme-effect1 dark:hover:bg-darkTheme-effect1 hover:cursor-pointer duration-300`}
              >
                <h2>{item.word}</h2>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between gap-4 w-full">
          <button
            onClick={() => {
              setGameItems(shuffleItems(gameItems));
            }}
            className="border-2 border-black dark:border-white h-[60px] w-full rounded-xl"
          >
            ערבוב
          </button>
          <button
            onClick={submitItems}
            style={{
              opacity: selectedItems.length == 4 ? "1" : "0.5",
              transition: "0.1s",
            }}
            className="border-2 border-black dark:border-white h-[60px] w-full rounded-xl"
          >
            ניחוש
          </button>
          <Snackbar
            ContentProps={{ className: "snackBar" }}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            autoHideDuration={2000}
            open={open}
            onClose={handleClose}
            key={"top"}
          >
            <SnackbarContent
              style={{ backgroundColor: "white", color: "black" }}
              message="!כל כך קרוב"
            />
          </Snackbar>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
