import { Exclude } from 'class-transformer';

export class DataSerializer {
  @Exclude()
  password: string;
}
