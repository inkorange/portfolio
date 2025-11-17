"use client";

import { useState } from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

interface CommentsSectionProps {
  projectSlug: string;
  requireEmail?: boolean;
}

export default function CommentsSection({ projectSlug, requireEmail = false }: CommentsSectionProps) {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleCommentSubmitted = () => {
    // Refresh the comment list when a new comment is submitted
    // Comments are auto-approved, so they will appear immediately
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="mt-12 border-t border-white/10 pt-12">
      <CommentList projectSlug={projectSlug} refreshTrigger={refreshTrigger} />
      <CommentForm projectSlug={projectSlug} requireEmail={requireEmail} onCommentSubmitted={handleCommentSubmitted} />
    </div>
  );
}
