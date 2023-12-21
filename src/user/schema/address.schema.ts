import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';

@Schema()
export class Address {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop()
  province: string;

  @Prop()
  district: string;

  @Prop()
  ward: string;

  @Prop()
  address: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
