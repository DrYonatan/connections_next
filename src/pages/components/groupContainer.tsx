import { GameItem } from "@/types/gameItem";

type ContainerProps = {
  groupName: string;
  items: GameItem[];
  backgroundColor: "red" | "green" | "purple" | "blue";
};

function GroupContainer({ groupName, items, backgroundColor }: ContainerProps) {
  return (
    <div
      className={`w-full h-[100px] rounded-xl flex flex-col items-center col-span-4 justify-center ${
        backgroundColor == "red"
          ? "bg-lightTheme-red dark:bg-darkTheme-red"
          : ""
      } ${
        backgroundColor == "green"
          ? "bg-lightTheme-green dark:bg-darkTheme-green"
          : ""
      } ${
        backgroundColor == "blue"
          ? "bg-lightTheme-blue dark:bg-darkTheme-blue"
          : ""
      } ${
        backgroundColor == "purple"
          ? "bg-lightTheme-purple dark:bg-darkTheme-purple"
          : ""
      } text-white`}
    >
      <h2 className="text-2xl">{groupName}</h2>
      <div>
        {items.map((item) => (
          <span key={item.word}>
            {items[items.length - 1] === item ? item.word : item.word + ", "}
          </span>
        ))}
      </div>
    </div>
  );
}

export default GroupContainer;
