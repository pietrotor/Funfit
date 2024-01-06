import { AddExtraDiscountInput, AddExtraPaymentInput, AddRentDiscountInput, AddRentPaymentInput, ContractResume, MonthlyPropertyResumeInput, Payment, PaymentsByDatesInput, PropertyPaymentSummary, RoomPaymentResume, RoomPaymentsSummaryInput, RoomSummary } from '@/graphql/graphql_types'
import { OutErrorResponse } from '@/lib/graphqlerrors/custom.error'
import { CreatePaymentDto } from 'dtos/payment.dto'

export default abstract class PaymentRepository<T> {
  abstract getPaymentById(id: T, businessId: T): Promise<Payment | OutErrorResponse>
  abstract getPaymentsByContractId(contractId: T, businessId: T): Promise<Payment[] | OutErrorResponse>
  abstract getPaymentsByPropertyGroupByRoom(propertiesIds: T[], businessId: T): Promise<RoomPaymentResume[] | OutErrorResponse>
  abstract getPaymentsByMonth(monthlyPropertyResumeInput: MonthlyPropertyResumeInput): Promise<PropertyPaymentSummary[] | OutErrorResponse>
  abstract getPaymentsByDates(paymentsByDatesInput: PaymentsByDatesInput): Promise<PropertyPaymentSummary[] | OutErrorResponse>
  abstract getRoomSummary(roomPaymentsSummaryInput: RoomPaymentsSummaryInput): Promise<RoomSummary | OutErrorResponse>
  abstract createPaymentInstance(createPaymentInstanceInput: CreatePaymentDto): Promise<Payment | OutErrorResponse>
  abstract addRentDiscount(addRentDiscountInput: AddRentDiscountInput): Promise<Payment | OutErrorResponse>
  abstract addExtraDiscount(addExtraDiscountInput: AddExtraDiscountInput): Promise<Payment | OutErrorResponse>
  abstract addRentPayment(addRentPaymentInput: AddRentPaymentInput, registerBy?: T): Promise<Payment | OutErrorResponse>
  abstract addExtraPayment(addExtraPaymentInput: AddExtraPaymentInput, registerBy?: T): Promise<Payment | OutErrorResponse>
  abstract verifyPayment(paymentId: T, businessId: T, reviewBy?: T): Promise<Payment | OutErrorResponse>
  // Resolvers
  abstract getContracResume(contractId: T, businessId: T): Promise<ContractResume | null>
}
