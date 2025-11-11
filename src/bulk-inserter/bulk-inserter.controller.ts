/* eslint-disable prettier/prettier */
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { BulkInserterService } from './bulk-inserter.service';
import { PermissionsGuard } from '../auth/guard/permissions.rest.guard';
import { RestAuthGuard } from '../auth/guard/rest-auth.guard';
import { Permissions } from '../permission/decoretor/permission.decorator';

@Controller('bulk-inserter')
@UseGuards(RestAuthGuard, PermissionsGuard)
export class BulkInserterController {
  constructor(private readonly bulkInserterService: BulkInserterService) {}

  @Post('seed')
  @Permissions('create-product') // Using product creation permission
  async seedDatabase(@Body() data: { entityId: string; departmentId: string }) {
    const { entityId, departmentId } = data;
    
    if (!entityId || !departmentId) {
      return {
        success: false,
        message: 'Both entityId and departmentId are required',
      };
    }
    
    try {
      const result = await this.bulkInserterService.insertAllDummyData(entityId, departmentId);
      
      return {
        success: true,
        message: 'Dummy data inserted successfully',
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to insert dummy data',
        error: error.message,
      };
    }
  }
}
