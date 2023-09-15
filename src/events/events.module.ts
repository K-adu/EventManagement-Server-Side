import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { SharedModule } from 'src/shared/shared.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from './schema/events.schema';
import { EventsRepository } from './events.repository';
import { DiarySchema } from './schema/diary.schema';

@Module({
  imports: [
    SharedModule,
    MongooseModule.forFeature([
      { name: 'Event', schema: EventSchema },
      { name: 'Diary', schema: DiarySchema },
    ]),
  ],
  controllers: [EventsController],
  providers: [EventsService, EventsRepository],
})
export class EventsModule {}
