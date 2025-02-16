import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { GameItem } from "./gameItem";

@Entity("levels")
export class Level {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "date" })
  date: Date;

  @OneToMany(() => GameItem, (gameItem: GameItem) => gameItem.level, {
    eager: true,
  })
  gameItems: GameItem[];
}
