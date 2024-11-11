import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from './events/events.module';
import { Event } from './events/event.entity'; // Import the Event entity

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:', // This tells SQLite to use an in-memory database
      entities: [Event], // Add your Event entity here
      synchronize: true, // Synchronizes the database schema automatically (good for dev)
    }),
    EventsModule, // Import the events module
  ],
})
export class AppModule {}


