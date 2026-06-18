import { Controller, Get, Param } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
  ) {}

  @Get('dashboard')
  getDashboard() {
    return this.adminService.getDashboard();
  }

  @Get('store-owner/:id')
  getStoreOwnerDashboard(
    @Param('id') id: string,
  ) {
    return this.adminService.getStoreOwnerDashboard(
      Number(id),
    );
  }
}