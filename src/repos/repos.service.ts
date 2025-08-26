import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ReposService {
  constructor(private readonly httpService: HttpService) {}

  async fetchUserRepos(token: string) {
    if (!token) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    try {
      const response = await firstValueFrom(
        this.httpService.get('https://api.github.com/user/repos?sort=updated&per_page=100', {
          headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json',
          },
        }),
      );

      return response.data;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch repositories',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async indexRepository(owner: string, repo: string, token: string) {
    // For now, just return a success message
    // Later, this will clone the repo, parse it, and index it
    console.log(`Indexing repository: ${owner}/${repo}`);
    
    return {
      message: `Started indexing ${owner}/${repo}`,
      status: 'started',
      repository: `${owner}/${repo}`,
      timestamp: new Date().toISOString(),
    };
  }
}