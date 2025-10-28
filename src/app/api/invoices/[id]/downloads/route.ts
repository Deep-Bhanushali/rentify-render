import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth';
import { ApiResponse } from '@/types/models';

const prisma = new PrismaClient();

interface RouteParams {
  params: Promise<{ id: string }>;
}

// POST /api/invoices/[id]/downloads - Record download action
export async function POST(request: NextRequest, props: RouteParams) {
  const params = await props.params;
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      const response: ApiResponse = {
        success: false,
        message: 'Authentication required'
      };
      return NextResponse.json(response, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      const response: ApiResponse = {
        success: false,
        message: 'Invalid token'
      };
      return NextResponse.json(response, { status: 401 });
    }

    const { format, fileSize } = await request.json();

    // Check if invoice exists and user is authorized
    const invoice = await prisma.invoice.findUnique({
      where: { id: params.id },
      include: {
        rentalRequest: {
          include: {
            product: true
          }
        }
      }
    });

    if (!invoice) {
      const response: ApiResponse = {
        success: false,
        message: 'Invoice not found'
      };
      return NextResponse.json(response, { status: 404 });
    }

    // Check if user is authorized to view this invoice
    if (invoice.rentalRequest.customer_id !== decoded.userId &&
        invoice.rentalRequest.product.user_id !== decoded.userId) {
      const response: ApiResponse = {
        success: false,
        message: 'Unauthorized to record download for this invoice'
      };
      return NextResponse.json(response, { status: 403 });
    }

    // Record the download
    const download = await prisma.invoiceDownload.create({
      data: {
        invoice_id: invoice.id,
        user_id: decoded.userId,
        format: format || 'unknown',
        file_size: fileSize || null,
        success: true
      }
    });

    console.log(`Download recorded: Invoice ${invoice.invoice_number}, Format: ${format}, User: ${decoded.userId}`);

    const response: ApiResponse = {
      success: true,
      message: 'Download recorded successfully',
      data: download
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error: unknown) {
    console.error('Record download error:', error);

    const response: ApiResponse = {
      success: false,
      message: 'Failed to record download'
    };

    return NextResponse.json(response, { status: 500 });
  }
}
