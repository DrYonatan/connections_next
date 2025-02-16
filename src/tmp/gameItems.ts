import { GameItem } from "@/types/gameItem";
import { Group } from "@/types/group";

const groups: Group[] = [
    { name: "זהב", color: "red" },
    { name: "ראש", color: "blue" },
    { name: "חיות בשחור לבן", color: "green" },
    { name: "דברים שמטילים ספק בקיומם", color: "purple" },
  ];

export const tmpGameItems: GameItem[] = [
  { word: "לב", group: groups[0], selected: false },
  { word: "תפוח", group: groups[0], selected: false },
  { word: "מטיל", group: groups[0], selected: false },
  { word: "גביע", group: groups[0], selected: false },
  { word: "להגדיל", group: groups[1], selected: false },
  { word: "בריא", group: groups[1], selected: false },
  { word: "שקט", group: groups[1], selected: false },
  { word: "השנה", group: groups[1], selected: false },
  { word: "פנדה", group: groups[2], selected: false },
  { word: "דביבון", group: groups[2], selected: false },
  { word: "זברה", group: groups[2], selected: false },
  { word: "פינגווין", group: groups[2], selected: false },
  { word: "נס ציונה", group: groups[3], selected: false },
  { word: "חד קרן", group: groups[3], selected: false },
  { word: "פיות", group: groups[3], selected: false },
  { word: "ביגפוט", group: groups[3], selected: false },
];


