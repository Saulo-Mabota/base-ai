import { Module } from '@nestjs/common';
import { EntityController } from './entity.controller';
import { EntityService } from './entity.service';
import { JwtModule } from '@nestjs/jwt';
import { EntityResolver } from './entity.resolver';
import { Entity, EntitySchema } from './schema/entity.model.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { DiscoveryModule } from '@nestjs/core';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: Entity.name, schema: EntitySchema }]),
    DiscoveryModule
  ],
  controllers: [EntityController],
  providers: [EntityService, EntityResolver],
})
export class EntityModule {}
