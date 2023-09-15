import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { AuthGuard } from 'src/shared/guard/auth.guard';

import { CreateEventsDTO } from './dto/create-events.dto';
import { EventsService } from './events.service';
import { query } from 'express';
import { UpdateEventDTO } from './dto/update-events.dto';
import { CreateDiaryDTO } from './dto/create-diary.dto';

@Controller('events')
// @UseInterceptors(ClassSerializerInterceptor)
export class EventsController {
  constructor(private eventsService: EventsService) {}
  // create
  @UseGuards(AuthGuard)
  @Post('/create')
  async createEventController(@Body() body: CreateEventsDTO, @Request() req) {
    const data = req.body.events;
    console.log(data);
    try {
      await this.eventsService.createEventsService(data, req);
    } catch {}
  }

  @UseGuards(AuthGuard)
  @Post('/createDiary')
  async createDiaryController(@Body() body: CreateDiaryDTO, @Request() req) {
    const data = req.body;
    const data1 = data.htmlContent;
    console.log(data1);
    try {
      await this.eventsService.createDiaryService(data1, req);
    } catch {}
  }

  //  update exiting events
  @UseGuards(AuthGuard)
  @Patch('/update')
  async updateBlogController(@Body() body: UpdateEventDTO, @Request() req) {
    return await this.eventsService.updateEventsService(
      body,
      req.body.postedBy,
      req.body._id,
    );
  }

  // //delete a blog
  @UseGuards(AuthGuard)
  @Delete('/delete/:id')
  async deleteBlogController(@Request() req, @Param() event) {
    console.log('this is the event id', event.id);

    return await this.eventsService.deleteEventService(req, event.id);
  }
  //get all events of the logged in user
  @UseGuards(AuthGuard)
  @Get('/my')
  async getAllBlogsController(@Request() req) {
    return this.eventsService.getAllEventsService(req.user.id);
  }

  // //search matching events using keys
  // @Get('/events')
  // async searchEventsController(@Query() query) {
  //   return await this.eventsService.searchEventsController(query);
  // }
}
