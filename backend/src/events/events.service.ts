import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity'; // Import the Event entity
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event) private eventsRepository: Repository<Event>,
  ) {}

  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    const newEvent = this.eventsRepository.create(createEventDto); // Create a new Event object
    return this.eventsRepository.save(newEvent); // Save it to the database
  }

  async getAllEvents(): Promise<Event[]> {
    return this.eventsRepository.find(); // Get all events
  }

  // Add other CRUD methods (update, delete) as necessary
}
