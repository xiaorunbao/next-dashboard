import { NextRequest, NextResponse } from 'next/server';

// 模拟发票数据
const mockInvoices = [
  {
    id: '1',
    customer_id: '1',
    amount: 15795,
    status: 'pending',
    date: '2024-01-15',
  },
  {
    id: '2',
    customer_id: '2',
    amount: 20350,
    status: 'paid',
    date: '2024-01-20',
  },
  {
    id: '3',
    customer_id: '3',
    amount: 3040,
    status: 'pending',
    date: '2024-01-25',
  },
  {
    id: '4',
    customer_id: '1',
    amount: 44800,
    status: 'paid',
    date: '2024-02-01',
  },
  {
    id: '5',
    customer_id: '4',
    amount: 34577,
    status: 'pending',
    date: '2024-02-05',
  },
];

// GET /api/invoices - 获取所有发票
export async function GET() {
  try {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return NextResponse.json(mockInvoices);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch invoices' },
      { status: 500 }
    );
  }
}

// POST /api/invoices - 创建新发票
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newInvoice = {
      id: String(mockInvoices.length + 1),
      ...body,
      date: new Date().toISOString().split('T')[0],
    };
    
    mockInvoices.push(newInvoice);
    
    return NextResponse.json(newInvoice, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create invoice' },
      { status: 500 }
    );
  }
}