import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Level } from "./level";
import { Group } from "./group";

@Entity("game_items")
export class GameItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Level, (level: Level) => level.gameItems)
  @JoinColumn({ name: "level_id" })
  level: Level;

  @Column({ type: "text" })
  word: string;

  @ManyToOne(() => Group, (group: Group) => group.gameItems, {eager: true})
  @JoinColumn({ name: "group_id" })
  group: Group;
}
