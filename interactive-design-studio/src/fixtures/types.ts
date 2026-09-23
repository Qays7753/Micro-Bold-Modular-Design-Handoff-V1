// Micro Visual System — Fixtures types (§21.2: fixtures معلّمة بوصفها بيانات عرض)
// كل ملف JSON يحمل $fixture/source/note — هذه الأنواع تجعل الوسم جزءًا من العقد.

export interface FixtureEnvelope {
  $fixture: true
  source: string
  note: string
}

export interface MoneyFixture {
  value: number | null
  state:
    | 'known'
    | 'true-zero'
    | 'negative'
    | 'estimated'
    | 'partial'
    | 'not-recorded'
    | 'cannot-compute'
    | 'unknown'
  note?: string
  verdict?: string
  stale?: boolean
  due?: string
}

export interface ShopFixture extends FixtureEnvelope {
  project: {
    name: string
    activityType: string
    accountState: 'complete' | 'partial'
    accountMissing: string
    accountAction: string
    ownerInitials: string
  }
  projectComplete: {
    name: string
    activityType: string
    accountState: 'complete'
    accountMissing: string
    accountAction: string
  }
}

export interface CustomerFixture {
  id: string
  name: string
  role: string
  phone: string
  debt: {
    value: number | null
    state: string
    due?: string
    original?: number
    paid?: number
    note?: string
  }
  lastMovement: string
}

export interface CustomersFixture extends FixtureEnvelope {
  customers: CustomerFixture[]
  suppliers: Array<{
    id: string
    name: string
    role: string
    phone: string
    due: { value: number | null; state: string }
    lastMovement: string
  }>
}

export interface ProductFixture {
  id: string
  name: string
  unit: string
  price: { value: number | null; state: string; note?: string; decimals?: number; display?: string }
}

export interface ProductsFixture extends FixtureEnvelope {
  products: ProductFixture[]
}

export interface TransactionFixture {
  id: string
  type: string
  party: string
  amount: number | null
  direction: 'in' | 'out'
  when: string
  date: string
  valueState: string
  saveState: string
  dataState: string
  paid?: number
  remaining?: number
}

export interface TransactionsFixture extends FixtureEnvelope {
  transactions: TransactionFixture[]
}

export interface SnapshotCardFixture {
  id: string
  question: string
  title: string
  value: MoneyFixture
  support: string
  note: string
  dataState: string
  missing?: string
  action?: string
  stale?: boolean
}

export interface InsightFixture {
  level: string
  category: string
  title: string
  evidence: string
  completeness: string
  action: string
  dataState: string
}

export interface OvrNowScenarioFixture {
  ribbon?: { text: string; detail: string }
  pendingSend?: { count: number; summary: string }
  today?: {
    label: string
    cash: MoneyFixture
    sales: MoneyFixture & { count?: number }
    collections: MoneyFixture & { count?: number }
    expenses: MoneyFixture & { count?: number }
  } | null
  snapshot?: {
    indicatorLabel: string
    allLabel: string
    activeIndex: number
    cards: SnapshotCardFixture[]
  } | null
  insight?: InsightFixture | null
  firstUse?: { title: string; body: string; action: string } | null
  summaryError?: {
    title: string
    body: string
    action: string
    lastSync: string
  }
  recent?: string | null
  footerTrace: string
}

export interface OvrNowFixture extends FixtureEnvelope {
  scenarios: Record<string, OvrNowScenarioFixture>
}

export interface FinOverviewScenarioFixture {
  ribbon?: { text: string; detail: string }
  pendingSend?: { count: number; summary: string }
  period: string
  cash: {
    question: string
    value: MoneyFixture
    wallets: Array<{ name: string; last: string; value: number }>
    unallocated?: { value: number; note: string; action: string } | null
    transferAction: string
    distributionAction: string
    staleTrace?: string
  }
  flow: {
    question: string
    rows: Array<{ label: string; value: MoneyFixture; detail: string }>
    comparison?: {
      text: string
      detail: string
      state: string
    } | null
  }
  obligations: {
    question: string
    forYou: {
      label: string
      value: MoneyFixture
      detail: string
      view: string
      clearState?: string
    }
    onYou: { label: string; value: MoneyFixture; detail: string; view: string }
  }
  result: {
    question: string
    state: 'complete' | 'partial' | 'insufficient'
    verdict: string
    value: MoneyFixture
    completeness: string
    detail: string
    action: string
  }
}

export interface FinOverviewFixture extends FixtureEnvelope {
  periods: string[]
  scenarios: Record<string, FinOverviewScenarioFixture>
}

export interface SaleLineFixture {
  productId: string
  name: string
  unit: string
  qty: number
  price: number | null
  displayPrice?: string
  lineTotal: number | null
  priceState: string
  note?: string
}

export interface SaleScenarioFixture {
  cart: SaleLineFixture[]
  mode: 'cash' | 'credit'
  customer: string | null
  notes: string
  total?: MoneyFixture
  impact?: {
    cash?: { before: number; after: number; label: string }
    debt?: { before: number; after: number; label: string }
    salesToday?: { before: number; after: number; label: string }
  }
  errors?: { customer?: string; amount?: string }
  holding?: boolean
  holdingLabel?: string
  failure?: { title: string; body: string; action: string }
  echo?: {
    headline: string
    detail: string
    localSaved?: string
    pending?: string
    impact?: { label: string; before: number; after: number }
    viewAction: string
    backAction: string
    note: string
  }
}

export interface SaleFixture extends FixtureEnvelope {
  title: string
  entryNote: string
  paymentModes: Array<{ id: 'cash' | 'credit'; label: string }>
  scenarios: Record<string, SaleScenarioFixture>
}
