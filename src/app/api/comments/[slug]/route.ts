import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

// GET - Fetch approved comments for a project
export async function GET(
  request: NextRequest,
  { params }: Params
) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        { error: 'Project slug is required' },
        { status: 400 }
      );
    }

    // Fetch approved comments only (RLS policy enforces this too)
    const { data, error } = await supabase
      .from('comments')
      .select('id, project_slug, author_name, content, created_at')
      .eq('project_slug', slug)
      .eq('status', 'approved')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching comments:', error);
      return NextResponse.json(
        { error: 'Failed to fetch comments' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      comments: data || [],
      count: data?.length || 0
    });
  } catch (error) {
    console.error('Error in GET /api/comments/[slug]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
