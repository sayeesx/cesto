import { Controller, Get } from '@nestjs/common';
import { SettingsService } from './settings.service';

@Controller('v1/settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  /** Public endpoint — returns delivery fee and tax config */
  @Get('pricing')
  getPricing() {
    return this.settingsService.getPricing();
  }

  /** Public endpoint — returns homepage banners */
  @Get('banners')
  getBanners() {
    return this.settingsService.getBanners();
  }
}
