import { GameItem } from "./gameItem";

export interface Level {
    id: number;
    date: Date;
    gameItems: GameItem[];
}