import { Injectable, NotFoundException } from '@nestjs/common';
import { User, UserDocument } from './schema/user.schema';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { createUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModal: Model<UserDocument>,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  async create(userData: createUserDto) {
    const createdUser = new this.userModal(userData);
    return createdUser.save();
  }

  async getMe(userId: string) {
    const user = await this.userModal.findById(userId);

    if (!user) throw new NotFoundException();

    return user;
  }

  async delete(userId: string) {
    //   const session = await this.connection.startSession();
    //   session.startTransaction();
    //   try {
    //     const user = await this.userModel
    //       .findByIdAndDelete(userId)
    //       .populate('posts')
    //       .session(session);
    //     if (!user) {
    //       throw new NotFoundException();
    //     }
    //     const posts = user.posts;
    //     await this.postsService.deleteMany(
    //       posts.map((post) => post._id.toString()),
    //       session,
    //     );
    //     await session.commitTransaction();
    //   } catch (error) {
    //     await session.abortTransaction();
    //     throw error;
    //   } finally {
    //     session.endSession();
    //   }
    // }
  }
}
