/* eslint-disable prettier/prettier */
import { Field, ObjectType } from '@nestjs/graphql';
import { LabelPermission } from '@prisma/client';

@ObjectType()
export class LabelPermissionModel implements LabelPermission {
  @Field()
  id: string;

  @Field()
  lang: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  icon: string;

  @Field({ nullable: true })
  link: string;

  @Field({ nullable: true })
  isHeadr: boolean;

  @Field({ nullable: true })
  position: number;

  @Field()
  description: string;

  @Field()
  permissionId: string;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;
}
