// Micro Visual System — Fixtures loader
// الاستيراد من جذر الاستوديو fixtures/ — بيانات عرض موسومة تُستخدم عبر
// طبقة المراجعة والحالات، ولا تمر بأي API أو بيانات حقيقية (§21.2).

import shopJson from '../../fixtures/shop.json'
import customersJson from '../../fixtures/customers.json'
import productsJson from '../../fixtures/products.json'
import transactionsJson from '../../fixtures/transactions.json'
import ovrNowJson from '../../fixtures/ovr-now.json'
import finOverviewJson from '../../fixtures/fin-overview.json'
import saleJson from '../../fixtures/ops-sale-create.json'
import type {
  ShopFixture,
  CustomersFixture,
  ProductsFixture,
  TransactionsFixture,
  OvrNowFixture,
  FinOverviewFixture,
  SaleFixture,
} from './types'

export const shop = shopJson as ShopFixture
export const customers = customersJson as CustomersFixture
export const products = productsJson as ProductsFixture
export const transactions = transactionsJson as TransactionsFixture
export const ovrNow = ovrNowJson as OvrNowFixture
export const finOverview = finOverviewJson as FinOverviewFixture
export const sale = saleJson as SaleFixture

export function getCustomer(id: string) {
  return customers.customers.find((c) => c.id === id) ?? null
}

export function getProduct(id: string) {
  return products.products.find((p) => p.id === id) ?? null
}

/** الترويسة الموحدة لبيانات العرض — تظهر في طبقة المراجعة ودروات المعلومات. */
export const FIXTURE_DISCLAIMER =
  'بيانات عرض (Fixtures) لأغراض مراجعة التصميم فقط — ليست بيانات مالية حقيقية، ومصدرها 14-JORDANIAN-CONTENT-FIXTURES.md.'
