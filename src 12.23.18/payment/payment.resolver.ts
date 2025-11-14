/* eslint-disable prettier/prettier */
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetUser } from 'src/auth/decoretor';
import { GqlAuthGuard } from 'src/auth/guard';
import { CreatePaymentInput } from './input';
import { PaymentModel } from './model/payment.model';
import { PaymentService } from './payment.service';
import { Permissions } from '../permission/decoretor/permission.decorator';
import { PermissionsGuard } from '../auth/guard/permissions.guard';
import { UserModel } from 'src/users/model';

@UseGuards(GqlAuthGuard, PermissionsGuard)
@Resolver(() => PaymentModel)
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Permissions('read-payment')
  @Query(() => PaymentModel, { name: 'payment' })
  async getPayment(@Args('id') id: string) {
    return this.paymentService.getPayment(id);
  }

  @Permissions('list-payment')
  @Query(() => [PaymentModel], { name: 'payments', nullable: 'items' })
  async getPayments() {
    return this.paymentService.getPayments();
  }

  @Permissions('create-payment')
  @Mutation(() => PaymentModel)
  async createPayment(
    @Args('createPaymentInput') createPaymentInput: CreatePaymentInput,
      @GetUser('user') user: UserModel
  ) {
    return this.paymentService.createPayment(createPaymentInput,user);
  }
}
