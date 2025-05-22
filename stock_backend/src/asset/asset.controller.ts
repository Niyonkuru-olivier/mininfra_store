import { Controller, Get, Post, Put, Param, Body, ParseIntPipe } from '@nestjs/common';
import { AssetService } from './asset.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';

@Controller('assets')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Get()
  getAll() {
    return this.assetService.findAll();
  }

  @Post()
  create(@Body() dto: CreateAssetDto) {
    // default to admin@example.com
    return this.assetService.create(dto, 'admin@example.com');
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAssetDto) {
    return this.assetService.update(id, dto, 'admin@example.com');
  }
}