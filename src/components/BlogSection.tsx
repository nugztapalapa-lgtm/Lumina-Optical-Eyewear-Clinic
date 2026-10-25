import React, { useState } from 'react';
import { BLOG_ARTICLES } from '../data/mockOpticalData';
import { BlogPost } from '../types/optical';
import { ArrowRight, X, Share2, Check, Sparkles } from 'lucide-react';

export const BlogSection: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <section id="journal" className="py-16 md:py-24 bg-white dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="max-w-3xl space-y-2">
          <span className="text-xs uppercase tracking-wider text-teal-800 dark:text-teal-400 font-semibold">
            Clinical Insights & Eyewear Care
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-stone-900 dark:text-stone-100 tracking-tight">
            The Lumina Vision Journal
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed">
            Expert articles and preventative guidance written by our resident Doctors of Optometry 
            to protect your ocular wellness, ease digital fatigue, and prolong the lifespan of your lenses.
          </p>
        </div>

        {/* 3-Column Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_ARTICLES.map((article) => (
            <article
              key={article.id}
              className="bg-stone-50 dark:bg-stone-900 rounded-xl p-6 border border-stone-200 dark:border-stone-800 flex flex-col justify-between space-y-5 hover:border-stone-300 dark:hover:border-stone-700 transition-colors group"
            >
              <div className="space-y-3">
                {/* Unboxed clean metadata */}
                <div className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
                  <span className="font-semibold text-teal-800 dark:text-teal-400">{article.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.readTime}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.publishedDate}</span>
                </div>

                <h3 className="text-lg font-serif font-semibold text-stone-900 dark:text-stone-100 group-hover:text-teal-900 dark:group-hover:text-teal-400 transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
                <span className="text-[11px] text-stone-500 dark:text-stone-400">
                  By {article.author}
                </span>

                <button
                  onClick={() => setSelectedPost(article)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-teal-900 dark:text-teal-400 hover:text-teal-950 dark:hover:text-teal-300 cursor-pointer"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Quick Eyewear Care Tips Checklist Callout */}
        <div className="bg-stone-900 dark:bg-stone-900/90 text-stone-100 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-stone-800">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-mono uppercase tracking-wider text-teal-300">
              Daily Optician Tip
            </span>
            <h3 className="text-xl font-serif font-semibold text-white">
              Never use household paper towels or your shirt on coated lenses.
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Wood cellulose fibers in paper towels create irreversible micro-swirls on anti-reflective coatings. 
              Always rinse with water first, then dry with our complimentary microfiber optical cloth.
            </p>
          </div>

          <button
            onClick={() => setSelectedPost(BLOG_ARTICLES[2])}
            className="px-5 py-2.5 text-xs font-semibold text-stone-900 bg-white hover:bg-stone-100 rounded-lg whitespace-nowrap cursor-pointer transition-colors shrink-0"
          >
            Read Complete Lens Care Guide
          </button>
        </div>

        {/* Article Reader Modal */}
        {selectedPost && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="article-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto"
          >
            <div className="bg-white dark:bg-stone-900 w-full max-w-3xl rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden my-auto max-h-[90vh] flex flex-col">
              {/* Top Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950">
                <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
                  <span className="font-semibold text-teal-800 dark:text-teal-400">{selectedPost.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedPost.readTime}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShare}
                    className="p-1.5 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white rounded-lg hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors cursor-pointer flex items-center gap-1 text-xs"
                    title="Share link"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-emerald-700 dark:text-emerald-400 font-medium">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setSelectedPost(null)}
                    className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="overflow-y-auto p-6 sm:p-8 space-y-6 flex-1 text-stone-800 dark:text-stone-200">
                <div className="space-y-2 border-b border-stone-100 dark:border-stone-800 pb-5">
                  <h2 id="article-modal-title" className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 leading-tight">
                    {selectedPost.title}
                  </h2>
                  <div className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-2 pt-1">
                    <span className="font-medium text-stone-800 dark:text-stone-200">
                      Written by {selectedPost.author}
                    </span>
                    <span>({selectedPost.authorRole})</span>
                    <span aria-hidden="true">·</span>
                    <span>{selectedPost.publishedDate}</span>
                  </div>
                </div>

                {/* Prose Content */}
                <div className="space-y-4 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                  {selectedPost.content.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                {/* Clinical Action Tips Box */}
                <div className="bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 rounded-xl p-5 space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-teal-900 dark:text-teal-200 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                    Doctor Recommended Key Takeaways:
                  </h4>
                  <ul className="space-y-1.5 pl-5 list-disc text-xs text-stone-700 dark:text-stone-300">
                    {selectedPost.tips.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 flex items-center justify-between">
                <span className="text-xs text-stone-500 dark:text-stone-400">
                  Have questions about your vision? Schedule a consult with Dr. Vance.
                </span>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="px-5 py-2 text-xs font-semibold text-stone-900 dark:text-stone-200 bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 rounded-lg cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
