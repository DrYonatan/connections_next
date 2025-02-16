import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { GameItem } from "./gameItem";

@Entity("groups")
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
  @Column()
  color: string;

  @OneToMany(() => GameItem, (gameItem: GameItem) => gameItem.level)
  gameItems: GameItem[];

}
