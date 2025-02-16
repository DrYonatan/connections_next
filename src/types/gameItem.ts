import { Group } from "./group";

export interface GameItem {
    word: string;
    group: Group;
    selected: boolean;
  }
  