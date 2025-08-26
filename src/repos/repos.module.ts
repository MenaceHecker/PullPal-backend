import { Module } from '@nestjs/common';
import { ReposController } from './repos.controller'
import { ReposService } from './repos.service'
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [ReposController],
  providers: [ReposService],
})
export class ReposModule {}