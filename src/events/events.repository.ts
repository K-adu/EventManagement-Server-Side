import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Event } from './schema/events.schema';

@Injectable()
export class EventsRepository {
  constructor(
    @InjectModel(Event.name) private eventModel: mongoose.Model<Event>,
  ) {}

  async createEventsRepository(data, user) {
    console.log(data);
    return await this.eventModel.create(data);
  }
  // async updateBlogRepository(data) {
  //   return await this.blogModel.findByIdAndUpdate(data.blogId, data.body);
  // }

  // async findLoggedInUserPost(data) {
  //   return await this.blogModel.findOne({
  //     _id: data.blogId,
  //     postedBy: data.userId,
  //   });
  // }

  // async deleteBlogRepository(data) {
  //   return await this.blogModel.findByIdAndDelete(data.blogId);
  // }

  // async getAllBlogsRepository(userId) {
  //   return await this.blogModel.find({ postedBy: userId });
  // }

  // async getOtherBlogsRepository() {
  //   return this.blogModel.aggregate([
  //     {
  //       $lookup: {
  //         from: 'users',
  //         localField: 'postedBy',
  //         foreignField: '_id',
  //         as: 'authorData',
  //       },
  //     },
  //     {
  //       $project: {
  //         'authorData.role': 0,
  //         'authorData.email': 0,
  //       },
  //     },
  //     {
  //       $lookup: {
  //         from: 'comments',
  //         localField: 'comments',
  //         foreignField: '_id',
  //         as: 'comments',
  //       },
  //     },
  //     {
  //       $project: {
  //         'comments.commentOfBlog': 0,
  //       },
  //     },
  //   ]);
  // }

  // async searchBlogRepository(key) {
  //   return await this.blogModel.aggregate([
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
