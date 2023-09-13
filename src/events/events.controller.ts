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

@Controller('events')
// @UseInterceptors(ClassSerializerInterceptor)
export class EventsController {
  constructor(private eventsService: EventsService) {}
  // create
  @UseGuards(AuthGuard)
  @Post('/create')
  async createBlogController(@Body() body: CreateEventsDTO, @Request() req) {
    const data = req.body.events;
    console.log('this is triggered');
    try {
      await this.eventsService.createEventsService(data, req);
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

  // //search matching blogs using keys
  // @Get('/search')
  // async searchBlogController(@Query() query) {
  //   return await this.blogsService.searchBlogController(query);
  // }
}
