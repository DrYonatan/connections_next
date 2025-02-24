import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { GameItem } from "@/types/gameItem";
import { Group } from "@/types/group";
import GroupContainer from "./components/groupContainer";
import { getLevelByDate, getLevels } from "@/clientAPI/levels";
import { Level } from "@/types/level";
import HeaderComponent from "./components/header";
import { Inventory2 } from "@mui/icons-material";
import toast, { Toaster } from "react-hot-toast";

function HomePage() {
  const [level, setLevel] = useState<Level>();

  const [levels, setLevels] = useState<Level[]>([]);

  const [allItems, setAllItems] = useState<GameItem[]>([]);

  const [gameItems, setGameItems] = useState<GameItem[]>(allItems);

  const [selectedItems, setSelectedItems] = useState<GameItem[]>([]);

  const [groups, setGroups] = useState<Group[]>([]);

  const [wrongGuessCount, setWrongGuessCount] = useState(0);

  useEffect(() => {
    getLevels().then((data) => {
      setLevels(data);
    });
    getLevelByDate(new Date("2025-02-12")).then((data) => {
      console.log(data);
      if (data) {
        setLevel(data);
        setAllItems(data.gameItems);
        setGameItems(shuffleItems(data.gameItems));
      }
    });
  }, []);

  const loadNewLevel = (level: Level) => {
    setLevel(level);
    setGameItems(shuffleItems(level.gameItems));
    setAllItems(level.gameItems);
    setWrongGuessCount(0);
    setGroups([]);
    console.log(level.gameItems);
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
      const group: Group = selectedItems[0].group;
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
          toast.error("כ''כ קרוב!");
        }
        setWrongGuessCount(wrongGuessCount + 1);
      }
      setSelectedItems([]);
    }
  };

  return (
    <div>
      <HeaderComponent level={level} />
      <div className="flex flex-col items-center m-10">
        <div>
          <Accordion
            sx={{
              width: "120px",
              alignSelf: "flex-end",
              position: "absolute",
              right: "50px",
              backgroundColor: `transparent`,
              padding: "0",
            }}
          >
            <div className="flex gap-2 bg-lightTheme-secondary dark:bg-darkTheme-secondary dark:text-white w-full h-full">
              <AccordionSummary
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography
                  component="span"
                  className="flex gap-2 bg-lightTheme-secondary dark:bg-darkTheme-secondary dark:text-white w-full h-full"
                >
                  ארכיון
                  <Inventory2 />
                </Typography>
              </AccordionSummary>
            </div>
            <AccordionDetails className="flex gap-2 bg-lightTheme-secondary dark:bg-darkTheme-secondary dark:text-white">
              {levels.map((level) => (
                <div key={level.id}
                  className="cursor-pointer"
                  onClick={() => loadNewLevel(level)}
                >
                  {"חידה " + level.id + "#"}
                </div>
              ))}
            </AccordionDetails>
          </Accordion>
          <div>
            <span className="text-2xl">
              ניחושים לא נכונים: {wrongGuessCount}
            </span>
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
                  key={item.word}
                  onClick={() => selectItem(item)}
                  className={`w-[180px] h-[100px] font-bold dark:text-white dark:bg-darkTheme-secondary rounded-xl text-lightTheme-text flex items-center justify-center ${
                    item.selected
                      ? "bg-lightTheme-effect2"
                      : "bg-lightTheme-secondary hover:bg-lightTheme-effect1"
                  } ${
                    item.selected
                      ? "dark:bg-darkTheme-effect2"
                      : "dark:bg-darkTheme-secondary dark:hover:bg-darkTheme-effect1 "
                  }  hover:cursor-pointer duration-300`}
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
            <div style={{direction: 'rtl'}}>
            <Toaster position="top-center" reverseOrder={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
