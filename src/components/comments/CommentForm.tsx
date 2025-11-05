"use client";

import { useState } from 'react';
import type { CommentFormData } from '@/types/comment';

interface CommentFormProps {
  projectSlug: string;
  onCommentSubmitted?: () => void;
}

export default function CommentForm({ projectSlug, onCommentSubmitted }: CommentFormProps) {
  const [formData, setFormData] = useState({
    author_name: '',
    author_email: '',
    content: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const payload: CommentFormData = {
        ...formData,
        project_slug: projectSlug
      };

      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit comment');
      }

      setMessage({
        type: 'success',
        text: data.message || 'Comment submitted successfully!'
      });

      // Reset form
      setFormData({
        author_name: '',
        author_email: '',
        content: ''
      });

      // Callback for parent component
      if (onCommentSubmitted) {
        onCommentSubmitted();
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to submit comment'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-8 rounded-lg border border-white/20 bg-white/5 p-6">
      <h3 className="text-xl font-semibold text-white mb-4">Leave a Comment</h3>

      {message && (
        <div
          className={`mb-4 rounded-lg p-4 ${
            message.type === 'success'
              ? 'bg-green-500/20 text-green-300'
              : 'bg-red-500/20 text-red-300'
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="author_name" className="block text-sm font-medium text-zinc-300 mb-2">
              Name *
            </label>
            <input
              type="text"
              id="author_name"
              required
              value={formData.author_name}
              onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
              className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-zinc-400 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40"
              placeholder="Your name"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="author_email" className="block text-sm font-medium text-zinc-300 mb-2">
              Email *
            </label>
            <input
              type="email"
              id="author_email"
              required
              value={formData.author_email}
              onChange={(e) => setFormData({ ...formData, author_email: e.target.value })}
              className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-zinc-400 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40"
              placeholder="your@email.com"
              disabled={isSubmitting}
            />
            <p className="mt-1 text-xs text-zinc-400">Your email will not be published</p>
          </div>
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-zinc-300 mb-2">
            Comment *
          </label>
          <textarea
            id="content"
            required
            rows={5}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-zinc-400 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40"
            placeholder="Share your thoughts..."
            disabled={isSubmitting}
            minLength={10}
            maxLength={2000}
          />
          <p className="mt-1 text-xs text-zinc-400">
            {formData.content.length}/2000 characters (minimum 10)
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-white px-6 py-2 text-sm font-medium text-black transition-colors hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Comment'}
        </button>
      </form>
    </div>
  );
}
