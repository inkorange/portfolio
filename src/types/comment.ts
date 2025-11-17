export interface Comment {
  id: string;
  project_slug: string;
  author_name: string;
  author_email?: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
  user_id?: string;
  created_at: string;
  updated_at: string;
  ip_address?: string;
  user_agent?: string;
}

export interface CommentFormData {
  author_name: string;
  author_email?: string;
  content: string;
  project_slug: string;
}

export interface PublicComment {
  id: string;
  project_slug: string;
  author_name: string;
  content: string;
  created_at: string;
}
