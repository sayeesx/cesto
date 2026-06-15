import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../../common/guards/auth.guard';

@Controller('v1/users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('addresses')
  getAddresses(@Req() req: any) {
    return this.usersService.getAddresses(req.user.id);
  }

  @Post('addresses')
  createAddress(@Req() req: any, @Body() body: any) {
    return this.usersService.createAddress(req.user.id, body);
  }

  @Patch('addresses/:id')
  updateAddress(@Req() req: any, @Param('id') id: string, @Body() body: any) {
    return this.usersService.updateAddress(req.user.id, id, body);
  }

  @Delete('addresses/:id')
  deleteAddress(@Req() req: any, @Param('id') id: string) {
    return this.usersService.deleteAddress(req.user.id, id);
  }

  @Patch('addresses/:id/default')
  setDefault(@Req() req: any, @Param('id') id: string) {
    return this.usersService.setDefaultAddress(req.user.id, id);
  }
}
