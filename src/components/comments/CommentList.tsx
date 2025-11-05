"use client";

import { useEffect, useState } from 'react';
import type { PublicComment } from '@/types/comment';

interface CommentListProps {
  projectSlug: string;
  refreshTrigger?: number;
}

export default function CommentList({ projectSlug, refreshTrigger }: CommentListProps) {
  const [comments, setComments] = useState<PublicComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchComments();
  }, [projectSlug, refreshTrigger]);

  const fetchComments = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/comments/${projectSlug}`);

      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }

      const data = await response.json();
      setComments(data.comments || []);
    } catch (err) {
      console.error('Error fetching comments:', err);
      setError('Failed to load comments');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-white mb-4">Comments</h3>
        <div className="rounded-lg border border-white/20 bg-white/5 p-6">
          <p className="text-zinc-400">Loading comments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-white mb-4">Comments</h3>
        <div className="rounded-lg border border-white/20 bg-white/5 p-6">
          <p className="text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-white mb-4">
        Comments {comments.length > 0 && `(${comments.length})`}
      </h3>

      {comments.length === 0 ? (
        <div className="rounded-lg border border-white/20 bg-white/5 p-6">
          <p className="text-zinc-400">No comments yet. Be the first to comment!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="rounded-lg border border-white/20 bg-white/5 p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-white">{comment.author_name}</p>
                  <p className="text-sm text-zinc-400">{formatDate(comment.created_at)}</p>
                </div>
              </div>
              <p className="text-zinc-300 whitespace-pre-wrap">{comment.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
