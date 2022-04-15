import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @Post()
  async createBookmark(
    @GetUser('id') userId: number,
    @Body() dto: CreateBookmarkDto,
  ) {
    return await this.bookmarkService.createBookmark(userId, dto);
  }

  @Get('')
  async getBookmarks(@GetUser('id') userId: number) {
    return await this.bookmarkService.getBookmarks(userId);
  }

  @Get(':id')
  async getBookmarkById(@Param('id', ParseIntPipe) bookmarkId: number) {
    return await this.bookmarkService.getBookmarkById(bookmarkId);
  }

  @Patch(':id')
  async editBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
    @Body() dto: EditBookmarkDto,
  ) {
    return await this.bookmarkService.editBookmarkById(userId, bookmarkId, dto);
  }

  @Delete(':id')
  async deleteBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return await this.bookmarkService.deleteBookmarkById(userId, bookmarkId);
  }
}
