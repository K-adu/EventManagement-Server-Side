import { Injectable } from '@nestjs/common';
import { EventsRepository } from './events.repository';
// import { UpdateBlogDTO } from './dto/update-blog.dto';
import { CreateEventsDTO } from './dto/create-events.dto';
import { Query } from 'express-serve-static-core';

@Injectable()
export class EventsService {
  constructor(private eventsRepository: EventsRepository) {}

  async createEventsService(body: CreateEventsDTO, req) {
    return await this.eventsRepository.createEventsRepository(body, req.user);
  }

  async updateEventsService(body, req, id: string) {
    const data = {
      body,
      userId: req,
      eventId: id,
    };
    const post = await this.eventsRepository.findLoggedInUserPost(data);
    if (!post) {
      return 'the blog doesnot exist or unauthorized to perform the action';
    }
    return await this.eventsRepository.updateEventRepository(data);
  }

  async deleteEventService(req, id) {
    const data = {
      userId: req.user.id,
      eventId: id,
    };
    console.log('this is begin printed from the service', data);
    const post = await this.eventsRepository.findLoggedInUserPost(data);
    if (!post) {
      return 'the blog doesnot exist or unauthorized to perform the action';
    }
    return await this.eventsRepository.deleteEventRepository(data);
  }

  async getAllEventsService(userId) {
    return await this.eventsRepository.getAllEventsRepository(userId);
  }

  // async searchEventController(query) {
  //   const key = query.key;
  //   return await this.eventRepository.searcheventRepository(key);
  // }

  async findAllEventsService(query: Query) {
    const { keyword } = query;
    const filter = {};

    if (keyword) {
      filter['title'] = { $regex: new RegExp(keyword.toString(), 'i') };
    }

    const events = await this.eventsRepository.findAllEventsRepo(filter);
    return events;
  }
}
