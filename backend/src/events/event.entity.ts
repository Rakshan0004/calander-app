// src/events/event.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  date: Date;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  imageUrl: string; // If you want to add an image URL field
}
