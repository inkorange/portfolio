import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import type { CommentFormData } from '@/types/comment';

// Simple email validation
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Simple content validation
function isValidContent(content: string): boolean {
  const trimmed = content.trim();
  return trimmed.length >= 10 && trimmed.length <= 2000;
}

// Verify Cloudflare Turnstile token
async function verifyTurnstileToken(token: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    console.warn('TURNSTILE_SECRET_KEY not configured, skipping verification');
    return true; // Allow comments if Turnstile is not configured
  }

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: secretKey,
        response: token,
      }),
    });

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('Error verifying Turnstile token:', error);
    return false;
  }
}

// POST - Submit a new comment
export async function POST(request: NextRequest) {
  try {
    // Verify Turnstile token if configured
    const turnstileToken = request.headers.get('X-Turnstile-Token');
    const hasTurnstileConfigured = !!process.env.TURNSTILE_SECRET_KEY;

    if (hasTurnstileConfigured) {
      if (!turnstileToken) {
        return NextResponse.json(
          { error: 'Verification token is required' },
          { status: 400 }
        );
      }

      const isValid = await verifyTurnstileToken(turnstileToken);
      if (!isValid) {
        return NextResponse.json(
          { error: 'Verification failed. Please try again.' },
          { status: 403 }
        );
      }
    }

    const body: CommentFormData = await request.json();
    const { project_slug, author_name, author_email, content } = body;

    // Validation
    if (!project_slug || !author_name || !content) {
      return NextResponse.json(
        { error: 'Project slug, name, and content are required' },
        { status: 400 }
      );
    }

    // Validate email only if provided
    if (author_email && !isValidEmail(author_email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    if (!isValidContent(content)) {
      return NextResponse.json(
        { error: 'Comment must be between 10 and 2000 characters' },
        { status: 400 }
      );
    }

    // Get IP address and user agent for spam prevention
    const ip_address = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const user_agent = request.headers.get('user-agent') || 'unknown';

    // Prepare insert data
    const insertData: any = {
      project_slug,
      author_name: author_name.trim(),
      content: content.trim(),
      status: 'approved', // Auto-approve all comments
      ip_address,
      user_agent,
    };

    // Only include email if provided
    if (author_email) {
      insertData.author_email = author_email.trim().toLowerCase();
    }

    // Insert comment (auto-approved for now)
    const { data, error } = await supabaseAdmin
      .from('comments')
      .insert(insertData)
      .select()
      .single();

    if (error) {
      console.error('Error inserting comment:', error);
      return NextResponse.json(
        { error: 'Failed to submit comment' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: 'Comment submitted successfully!',
        comment: data
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in POST /api/comments:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
