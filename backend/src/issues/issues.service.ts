import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, IsNull, Not, Repository } from 'typeorm';
import { Issue } from './issues.entity';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';

@Injectable()
export class IssuesService {
  constructor(
    @InjectRepository(Issue)
    private readonly issueRepository: Repository<Issue>,
    private dataSource: DataSource,
  ) {}

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<[Issue[], number]> {
    const [results, total] = await this.issueRepository.findAndCount({
      where: { deletedDate: IsNull() },
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return [results, total];
  }

  async findOne(id: number): Promise<Issue> {
    const issue = await this.issueRepository.findOne({
      where: { id, deletedDate: IsNull() },
    });
    if (!issue) {
      throw new NotFoundException(`Issue with ID ${id} not found`);
    }
    return issue;
  }

  async create(createIssueDto: CreateIssueDto): Promise<Issue> {
    const newIssue = this.issueRepository.create(createIssueDto);
    return await this.issueRepository.save(newIssue);
  }

  async update(id: number, updateIssueDto: UpdateIssueDto): Promise<Issue> {
    const issue = await this.findOne(id);
    Object.assign(issue, updateIssueDto);
    return await this.issueRepository.save(issue);
  }

  async remove(id: number): Promise<void> {
    const result = await this.issueRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Issue with ID ${id} not found`);
    }
  }

  async upvoteIssue(id: number): Promise<Issue> {
    const issue = await this.findOne(id);
    issue.upvotes += 1;
    return await this.issueRepository.save(issue);
  }

  async addComment(id: number, comment: string): Promise<Issue> {
    const issue = await this.findOne(id);
    issue.comments = [...(issue.comments || []), comment];
    return await this.issueRepository.save(issue);
  }

  async findDeleted(): Promise<Issue[]> {
    return this.issueRepository.find({
      where: { deletedDate: Not(IsNull()) },
      withDeleted: true,
    });
  }
}
