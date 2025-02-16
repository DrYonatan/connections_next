import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Level } from "./level";
import { Group } from "./group";

@Entity("game_Items")
export class GameItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Level, (level: Level) => level.gameItems)
  @JoinColumn({ name: "level" })
  level: Level;

  @Column({ type: "text" })
  word: string;

  @ManyToOne(() => Group, (group: Group) => group.gameItems, {eager: true})
  @JoinColumn({ name: "group" })
  group: Group;
}
