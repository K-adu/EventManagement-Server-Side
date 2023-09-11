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
// import { UpdateBlogDTO } from './dto/update-blog.dto';
import { query } from 'express';

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

  //update exiting blogs
  // @UseGuards(AuthGuard)
  // @Patch('/update/:id')
  // async updateBlogController(
  //   @Body() body: UpdateBlogDTO,
  //   @Request() req,
  //   @Param('id') id: string,
  // ) {
  //   return await this.blogsService.updateBlogService(body, req, id);
  // }

  // //delete a blog
  // @UseGuards(AuthGuard)
  // @Delete('/delete/:id')
  // async deleteBlogController(@Request() req, @Param('id') id: string) {
  //   return await this.blogsService.deleteBlogService(req, id);
  // }
  //get all blog of the logged in user
  // @UseGuards(AuthGuard)
  // @Get('/my')
  // async getAllBlogsController(@Request() req) {
  //   return this.blogsService.getAllBlogsService(req.user.id);
  // }

  // //search matching blogs using keys
  // @Get('/search')
  // async searchBlogController(@Query() query) {
  //   return await this.blogsService.searchBlogController(query);
  // }
}
