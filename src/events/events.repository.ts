import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Event } from './schema/events.schema';
import { Diary } from './schema/diary.schema';

@Injectable()
export class EventsRepository {
  constructor(
    @InjectModel(Event.name) private eventModel: mongoose.Model<Event>,
    @InjectModel(Diary.name) private diaryModel: mongoose.Model<Diary>,
  ) {}

  async createEventsRepository(data, user) {
    return await this.eventModel.create(data);
  }

  async createDiaryRepository(data, user) {
    const data1 = {
      description: data,
      postedBy: user.id,
    };
    console.log(data1);
    return await this.diaryModel.create(data1);
  }

  async updateEventRepository(data) {
    return await this.eventModel.findByIdAndUpdate(data.eventId, data.body);
  }

  async findLoggedInUserPost(data) {
    return await this.eventModel.findOne({
      _id: data.eventId,
      postedBy: data.userId,
    });
  }

  async deleteEventRepository(data) {
    return await this.eventModel.findByIdAndDelete(data.eventId);
  }

  async getAllEventsRepository(userId) {
    return await this.eventModel.find({ postedBy: userId });
  }

  async getAllDiaryRepository(userId) {
    return await this.diaryModel.find({ postedBy: userId });
  }

  async findAllEventsRepo(query) {
    return await this.eventModel.find(query);
  }
  // async searchEventsRepository(key) {
  //   return await this.eventModel.aggregate([
  //     {
  //       $match: {
  //         title: {
  //           $regex: key,
  //           $options: 'i',
  //         },
  //       },
  //     },
  //   ]);
  // }
}
