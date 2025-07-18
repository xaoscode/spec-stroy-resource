import { Module } from '@nestjs/common';
import PagesService from './pages.service';
import PagesController from './pages.controller';
import PagesRepositroy from './repository/page.repositroy';

@Module({
  providers: [PagesService, PagesRepositroy],
  controllers: [PagesController],
})
export default class PagesModule {}
