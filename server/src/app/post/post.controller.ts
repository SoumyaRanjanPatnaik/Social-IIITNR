import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { postMulterConfig } from 'src/config/multer.config';
import { Profile } from '../profile/entities/profile.entity';
import { AuthorizationGuard } from '../auth/guard/authorization.guard';

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  /* 
  create a post
  with the help of JwtAuthGuard, the received JWT is verified
  if verification succeeds, then the request object gets populated
  with the associated profile, and we can then access the verified
  profile by request.user
  [POST] /post/create
  */
  @Post('create')
  @UseGuards(AuthorizationGuard)
  @UseInterceptors(FileInterceptor('file', postMulterConfig))
  create(
    @Body() createPostDto: CreatePostDto,
    @Request() req: any,
    @UploadedFile('file') file: Express.Multer.File,
  ) {
    const profile: Profile = req.profile;
    return this.postService.create(createPostDto, profile, file);
  }

  @Get('user/:userId')
  findOneByUser(@Param('userId') userId: string) {
    return this.postService.findAllByUserId(userId);
  }

  /* get all posts, only a signed in user can see all the posts 
    [GET] /post
  */
  @Get()
  @UseGuards(AuthorizationGuard)
  findAll() {
    return this.postService.findAll();
  }

  /* get a post by its id, only a signed in user can ask for a post */
  @Get(':postId')
  @UseGuards(AuthorizationGuard)
  findOne(@Param('postId') postId: string) {
    return this.postService.fingById(postId);
  }

  /* 
  update a post
  a user can update only those post, which belongs to him
  if not then throw unAuthorized exception - "this post belongs to another user" 
  */
  @Patch(':postId')
  @UseGuards(AuthorizationGuard)
  update(
    @Param('postId') postId: string,
    @Body() updatePostDto: UpdatePostDto,
    @Req() req: any,
  ) {
    const profile: Profile = req.profile;
    return this.postService.update(profile.userId, postId, updatePostDto);
  }

  /* 
  delete a post
  a user can delete only those post, which belongs to him
  if not then throw unAuthorized exception - "this post belongs to another user" 
  */
  @Delete(':postId')
  @UseGuards(AuthorizationGuard)
  remove(@Param('postId') postId: string, @Req() req: any) {
    const profile: Profile = req.profile;
    return this.postService.remove(profile.userId, postId);
  }
}
