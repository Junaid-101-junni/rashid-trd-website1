import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, type, msg } = body;

    // Basic validation
    if (!name || !email || !msg) {
      return NextResponse.json(
        { error: 'Missing required fields (name, email, msg)' },
        { status: 400 }
      );
    }

    // In a production environment, integrate with Resend, Nodemailer, etc.
    // Example:
    // if (process.env.RESEND_API_KEY) { ... send email via resend ... }
    
    // For now, simulate a network delay and log the submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    console.log('--- NEW CONTACT SUBMISSION ---');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Category: ${type}`);
    console.log(`Message: ${msg}`);
    console.log('------------------------------');

    return NextResponse.json(
      { message: 'Inquiry received successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
