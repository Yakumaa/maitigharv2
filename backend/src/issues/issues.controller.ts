import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { IssuesService } from './issues.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('issues')
@Controller('issues')
export class IssuesController {
  constructor(private readonly issuesService: IssuesService) {}

  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    const [results, total] = await this.issuesService.findAll(page, limit);
    return {
      data: results,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.issuesService.findOne(id);
  }

  @Post()
  async create(@Body() createIssueDto: CreateIssueDto) {
    return this.issuesService.create(createIssueDto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateIssueDto: UpdateIssueDto,
  ) {
    return this.issuesService.update(id, updateIssueDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.issuesService.remove(id);
  }

  @Patch(':id/upvote')
  async upvote(@Param('id', ParseIntPipe) id: number) {
    return this.issuesService.upvoteIssue(id);
  }

  @Post(':id/comments')
  async addComment(
    @Param('id', ParseIntPipe) id: number,
    @Body('comment') comment: string,
  ) {
    return this.issuesService.addComment(id, comment);
  }

  @Get('deleted')
  async findDeleted() {
    return this.issuesService.findDeleted();
  }
}
