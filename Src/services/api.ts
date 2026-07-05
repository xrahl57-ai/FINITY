import { FinancialEvent, FinancialState, FinancialReport, ChatMessage } from '../types/financial';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export class FinityAPI {
  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  // Event Processing
  async processEvent(event: Omit<FinancialEvent, 'id' | 'timestamp' | 'status'>): Promise<FinancialEvent> {
    return this.request<FinancialEvent>('/events/process', {
      method: 'POST',
      body: JSON.stringify(event),
    });
  }

  // Financial State
  async getFinancialState(): Promise<FinancialState> {
    return this.request<FinancialState>('/state');
  }

  // Reports
  async generateReport(type: string, period: { start: string; end: string }): Promise<FinancialReport> {
    return this.request<FinancialReport>('/reports', {
      method: 'POST',
      body: JSON.stringify({ type, period }),
    });
  }

  // Chat/Event Processing
  async processNaturalLanguage(input: string): Promise<{
    interpretation: string;
    confidence: number;
    event?: FinancialEvent;
    report?: FinancialReport;
  }> {
    return this.request('/nlp/process', {
      method: 'POST',
      body: JSON.stringify({ input }),
    });
  }

  // WebSocket connection for real-time updates
  connectWebSocket(): WebSocket {
    const ws = new WebSocket(`ws://${import.meta.env.VITE_WS_HOST || 'localhost:3000'}`);
    return ws;
  }
}

export const api = new FinityAPI();
