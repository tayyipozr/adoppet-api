import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {

  constructor(private readonly prisma: PrismaService) { }

  async createPost(title: string, content: string, userId: number, petId: number) {
    return this.prisma.post.create({
      data: {
        title,
        content,
        userId,
        petId
      },
    });
  }

  async deletePost(id: number) {
    return this.prisma.post.deleteMany({
      where: {
        id
      },
    });
  }

  async getPosts() {
    return this.prisma.post.findMany();
  }
}
