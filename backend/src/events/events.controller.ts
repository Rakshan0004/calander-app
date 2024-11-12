import { Controller, Post, Body, Get } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './event.entity';

@Controller('events') // Ensure the route path is '/events'
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post() // POST method to create an event
  async createEvent(@Body() createEventDto: CreateEventDto): Promise<Event> {
    return this.eventsService.createEvent(createEventDto);
  }

  @Get() // GET method to retrieve all events
  async getAllEvents(): Promise<Event[]> {
    return this.eventsService.getAllEvents();
  }
}
