import { Controller, Delete, Get, Post } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Get()
  getPosts() {
    return this.postService.getPosts();
  }

  @Post()
  createPost(@GetUser('id') userId: number, title: string, content: string, petId: number) {
    return this.postService.createPost(title, content, userId, petId);
  }

  @Delete(':id')
  deletePost(id: number) {
    return this.postService.deletePost(id);
  }

}
