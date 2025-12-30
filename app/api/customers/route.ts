import { NextRequest, NextResponse } from 'next/server';

// 模拟客户数据
const mockCustomers = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    image_url: '/customers/alice-johnson.png',
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    image_url: '/customers/bob-smith.png',
  },
  {
    id: '3',
    name: 'Carol Williams',
    email: 'carol@example.com',
    image_url: '/customers/carol-williams.png',
  },
  {
    id: '4',
    name: 'David Brown',
    email: 'david@example.com',
    image_url: '/customers/david-brown.png',
  },
];

// GET /api/customers - 获取所有客户
export async function GET() {
  try {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return NextResponse.json(mockCustomers);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch customers' },
      { status: 500 }
    );
  }
}

// POST /api/customers - 创建新客户
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newCustomer = {
      id: String(mockCustomers.length + 1),
      ...body,
    };
    
    mockCustomers.push(newCustomer);
    
    return NextResponse.json(newCustomer, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create customer' },
      { status: 500 }
    );
  }
}