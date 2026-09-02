import React, { useState } from 'react';
import { Comment, UserProfile } from '../../types';
import { MessageSquare, Send, ShieldCheck, User } from 'lucide-react';
import { soundFX } from '../../utils/audio';

interface CommentThreadProps {
  comments: Comment[];
  currentUser: UserProfile;
  onAddComment: (text: string, isInternal?: boolean) => void;
}

export const CommentThread: React.FC<CommentThreadProps> = ({
  comments,
  currentUser,
  onAddComment,
}) => {
  const [commentText, setCommentText] = useState('');
  const [isInternal, setIsInternal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    onAddComment(commentText.trim(), isInternal);
    setCommentText('');
    setIsInternal(false);
  };

  const isStaffOrAdmin = currentUser.role === 'staff' || currentUser.role === 'admin';

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-[#D8D6CD]">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-brass" />
          <span className="font-ticket text-sm tracking-wider uppercase text-navy">
            Updates & Discussion Thread ({comments.length})
          </span>
        </div>
        <span className="text-[10px] font-mono text-ink-faint">
          Real-time updates logged
        </span>
      </div>

      {/* COMMENTS LIST */}
      <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
        {comments.length === 0 ? (
          <div className="p-4 text-center text-xs font-mono text-ink-muted bg-paper-200/50 rounded-lg border border-dashed border-[#D8D6CD]">
            No remarks logged yet. Submit a message below.
          </div>
        ) : (
          comments.map((comment) => {
            const isMe = comment.author === currentUser.name;
            const isStaff = comment.authorRole === 'staff' || comment.authorRole === 'admin';

            return (
              <div
                key={comment.id}
                className={`p-3.5 rounded-xl border transition-colors ${
                  comment.isInternal
                    ? 'bg-amber-50/80 border-amber-300'
                    : isMe
                    ? 'bg-paper-50 border-brass/50'
                    : 'bg-paper-200/60 border-[#D8D6CD]'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-navy text-brass flex items-center justify-center text-[10px] font-bold">
                      {comment.author.charAt(0)}
                    </div>
                    <span className="text-xs font-bold font-mono text-ink">
                      {comment.author}
                    </span>
                    <span
                      className={`text-[9px] font-mono uppercase px-1.5 py-0.2 rounded border ${
                        isStaff
                          ? 'bg-navy/10 text-navy border-navy/30'
                          : 'bg-paper-300 text-ink-muted border-[#D8D6CD]'
                      }`}
                    >
                      {comment.authorRole}
                    </span>
                    {comment.isInternal && (
                      <span className="text-[9px] font-mono bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded font-bold">
                        INTERNAL NOTE
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-ink-faint">
                    {new Date(comment.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <p className="text-xs text-ink-light pl-8 leading-relaxed whitespace-pre-wrap">
                  {comment.text}
                </p>
              </div>
            );
          })
        )}
      </div>

      {/* COMMENT INPUT FORM */}
      <form onSubmit={handleSubmit} className="pt-2">
        <div className="relative">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder={`Add a message or progress remark as ${currentUser.name}...`}
            rows={2}
            className="w-full p-3 pr-20 text-xs rounded-xl bg-paper-50 border border-[#D8D6CD] focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass resize-none font-sans"
          />

          <button
            type="submit"
            disabled={!commentText.trim()}
            className="absolute right-2 bottom-2.5 px-3 py-1.5 rounded-lg bg-navy hover:bg-navy-dark disabled:opacity-40 disabled:cursor-not-allowed text-paper-100 font-mono text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <span>Send</span>
            <Send className="w-3 h-3 text-brass" />
          </button>
        </div>

        {isStaffOrAdmin && (
          <div className="mt-2 flex items-center gap-2">
            <label className="flex items-center gap-1.5 text-[11px] font-mono text-ink-muted cursor-pointer">
              <input
                type="checkbox"
                checked={isInternal}
                onChange={(e) => setIsInternal(e.target.checked)}
                className="rounded text-navy focus:ring-brass"
              />
              <span>Mark as Internal Staff Note (Invisible to student)</span>
            </label>
          </div>
        )}
      </form>
    </div>
  );
};
