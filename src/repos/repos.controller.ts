import { Controller, Get, Post, Param, Headers, Body } from '@nestjs/common';
import { ReposService } from './repos.service';

@Controller('api/repos')
export class ReposController {
  constructor(private readonly reposService: ReposService) {}

  @Get()
  async getUserRepos(@Headers('authorization') auth: string) {
    const token = auth?.replace('Bearer ', '');
    return this.reposService.fetchUserRepos(token);
  }

  @Post(':owner/:repo/index')
  async indexRepository(
    @Param('owner') owner: string,
    @Param('repo') repo: string,
    @Headers('authorization') auth: string,
  ) {
    const token = auth?.replace('Bearer ', '');
    return this.reposService.indexRepository(owner, repo, token);
  }
}