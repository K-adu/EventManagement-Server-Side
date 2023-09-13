import { Injectable } from '@nestjs/common';
import { EventsRepository } from './events.repository';
// import { UpdateBlogDTO } from './dto/update-blog.dto';
import { CreateEventsDTO } from './dto/create-events.dto';

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

  // async deleteBlogService(req, id) {
  //   const data = {
  //     userId: req.user.id,
  //     blogId: id,
  //   };
  //   const post = await this.blogsRepository.findLoggedInUserPost(data);
  //   if (!post) {
  //     return 'the blog doesnot exist or unauthorized to perform the action';
  //   }
  //   return await this.blogsRepository.deleteBlogRepository(data);
  // }

  async getAllEventsService(userId) {
    return await this.eventsRepository.getAllEventsRepository(userId);
  }

  // async getOtherBlogsService() {
  //   return await this.blogsRepository.getOtherBlogsRepository();
  // }

  // async searchBlogController(query) {
  //   const key = query.key;
  //   return await this.blogsRepository.searchBlogRepository(key);
  // }
}
