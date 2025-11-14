import { registerEnumType } from '@nestjs/graphql';

export enum Type {
  ROOT = 'ROOT',
  ENTITY = 'ENTITY',
  EMPLOYEE = 'EMPLOYEE',
  CANDIDATE = 'CANDIDATE',
  PARTNER = 'PARTNER',
}

registerEnumType(Type, {
  name: 'Type',
});
