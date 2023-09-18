import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { User } from 'src/user/schema/user.schema';
@Schema()
export class Diary extends Document {
  @Prop({ required: true })
  description: string;

  //reference of the user id of the post who posted it
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  postedBy: User;

  @Prop({ default: Date.now }) // Set default value to the current date
  createdAt: Date;
}

export const DiarySchema = SchemaFactory.createForClass(Diary);
