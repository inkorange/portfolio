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

// POST - Submit a new comment
export async function POST(request: NextRequest) {
  try {
    const body: CommentFormData = await request.json();
    const { project_slug, author_name, author_email, content } = body;

    // Validation
    if (!project_slug || !author_name || !author_email || !content) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (!isValidEmail(author_email)) {
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

    // Insert comment (auto-approved for now)
    const { data, error } = await supabaseAdmin
      .from('comments')
      .insert({
        project_slug,
        author_name: author_name.trim(),
        author_email: author_email.trim().toLowerCase(),
        content: content.trim(),
        status: 'approved', // Auto-approve all comments
        ip_address,
        user_agent,
      })
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
