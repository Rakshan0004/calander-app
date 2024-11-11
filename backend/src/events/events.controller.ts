import { Controller, Post, Body, Get } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './event.entity';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  async createEvent(@Body() createEventDto: CreateEventDto): Promise<Event> {
    return this.eventsService.createEvent(createEventDto);
  }

  @Get()
  async getAllEvents(): Promise<Event[]> {
    return this.eventsService.getAllEvents();
  }

  // we can add other routes for CRUD operations as needed
}

