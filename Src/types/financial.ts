export interface FinancialEvent {
  id: string;
  timestamp: Date;
  type: EventType;
  description: string;
  amount: number;
  currency: string;
  category: string;
  accountId?: string;
  customerId?: string;
  supplierId?: string;
  status: EventStatus;
  origin: string;
  userId: string;
  metadata?: Record<string, any>;
}

export type EventType = 
  | 'REVENUE'
  | 'EXPENSE'
  | 'PAYMENT'
  | 'INVOICE'
  | 'REFUND'
  | 'ASSET_PURCHASE'
  | 'LOAN'
  | 'INVESTMENT'
  | 'PAYROLL'
  | 'TAX'
  | 'TRANSFER';

export type EventStatus = 'PENDING' | 'PROCESSED' | 'FAILED' | 'REVERSED';

export interface FinancialState {
  cash: number;
  bankAccounts: BankAccount[];
  accountsReceivable: number;
  accountsPayable: number;
  assets: Asset[];
  liabilities: Liability[];
  equity: number;
  revenue: number;
  expenses: number;
  netIncome: number;
  lastUpdated: Date;
}

export interface BankAccount {
  id: string;
  name: string;
  balance: number;
  currency: string;
  bankName: string;
  accountNumber: string;
}

export interface Asset {
  id: string;
  name: string;
  value: number;
  type: string;
  purchaseDate: Date;
  depreciation?: number;
}

export interface Liability {
  id: string;
  name: string;
  amount: number;
  type: string;
  dueDate?: Date;
}

export interface FinancialReport {
  id: string;
  type: ReportType;
  generatedAt: Date;
  period: {
    start: Date;
    end: Date;
  };
  data: any;
}

export type ReportType = 
  | 'BALANCE_SHEET'
  | 'PROFIT_LOSS'
  | 'CASH_FLOW'
  | 'TRIAL_BALANCE'
  | 'AR_AGING'
  | 'AP_AGING';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  events?: FinancialEvent[];
  report?: FinancialReport;
}
