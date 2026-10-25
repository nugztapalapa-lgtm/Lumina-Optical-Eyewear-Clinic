import React, { useState } from 'react';
import { VERIFIED_REVIEWS } from '../data/mockOpticalData';
import { ReviewItem } from '../types/optical';
import { Star, CheckCircle, Plus, X } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>(VERIFIED_REVIEWS);
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  // New review form state
  const [authorName, setAuthorName] = useState('');
  const [location, setLocation] = useState('San Jose, CA');
  const [rating, setRating] = useState(5);
  const [serviceType, setServiceType] = useState('Eye Exam & Prescription Glasses');
  const [framePurchased, setFramePurchased] = useState('Kanso Titanium Wire');
  const [comment, setComment] = useState('');

  const filteredReviews = reviews.filter((r) => {
    if (filterRating === 'all') return true;
    return r.rating === filterRating;
  });

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !comment.trim()) return;

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      authorName,
      location,
      rating,
      date: 'Just now',
      serviceType,
      framePurchased: framePurchased || undefined,
      verified: true,
      comment,
    };

    setReviews([newRev, ...reviews]);
    setIsWriteModalOpen(false);
    setAuthorName('');
    setComment('');
  };

  return (
    <section className="py-16 md:py-24 bg-stone-100/50 dark:bg-stone-900/40 border-t border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 dark:border-stone-800 pb-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider text-teal-800 dark:text-teal-400 font-semibold">
              Verified Patient Experiences
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-stone-900 dark:text-stone-100 tracking-tight">
              What Our Community Sees & Says
            </h2>
            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 max-w-xl">
              Real feedback from local patients fitted with precision prescriptions and custom eyewear.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsWriteModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-stone-900 dark:text-stone-100 bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-lg shadow-xs cursor-pointer transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-teal-800 dark:text-teal-400" />
              <span>Share Your Review</span>
            </button>
          </div>
        </div>

        {/* Aggregate Ratings & Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center text-amber-500 dark:text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 tabular-nums">4.9 / 5.0</span>
            <span className="text-stone-500 dark:text-stone-400">· Over 620 verified exams & fittings</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-stone-500 dark:text-stone-400 font-medium mr-1">Filter rating:</span>
            <button
              onClick={() => setFilterRating('all')}
              className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                filterRating === 'all'
                  ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-medium'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              All ({reviews.length})
            </button>
            <button
              onClick={() => setFilterRating(5)}
              className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                filterRating === 5
                  ? 'bg-teal-900 dark:bg-teal-700 text-white font-medium'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              5 Stars ({reviews.filter((r) => r.rating === 5).length})
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white dark:bg-stone-900 rounded-xl p-6 border border-stone-200 dark:border-stone-800 shadow-2xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Rating & Verified */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  {rev.verified && (
                    <div className="flex items-center gap-1 text-[11px] text-teal-800 dark:text-teal-400 font-medium">
                      <CheckCircle className="w-3 h-3 text-teal-700 dark:text-teal-400" />
                      <span>Verified Patient</span>
                    </div>
                  )}
                </div>

                <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author & Treatment */}
              <div className="pt-3 border-t border-stone-100 dark:border-stone-800 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-stone-900 dark:text-stone-100">{rev.authorName}</span>
                  <span className="text-[11px] text-stone-400 dark:text-stone-500">{rev.date}</span>
                </div>
                <div className="text-[11px] text-stone-500 dark:text-stone-400">
                  {rev.location} · {rev.serviceType}
                </div>
                {rev.framePurchased && (
                  <div className="text-[11px] text-teal-900 dark:text-teal-400 font-medium pt-0.5">
                    Frame: {rev.framePurchased}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Write Review Modal */}
        {isWriteModalOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="write-review-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs"
          >
            <div className="bg-white dark:bg-stone-900 w-full max-w-lg rounded-2xl p-6 shadow-2xl border border-stone-200 dark:border-stone-800 space-y-4">
              <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
                <h3 id="write-review-title" className="text-base font-serif font-semibold text-stone-900 dark:text-stone-100">
                  Share Your Lumina Experience
                </h3>
                <button
                  onClick={() => setIsWriteModalOpen(false)}
                  className="p-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddReview} className="space-y-4 text-xs">
                <div>
                  <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full p-2 border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-lg focus:border-teal-700 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">Rating</label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="w-full p-2 border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-lg focus:border-teal-700 focus:outline-none cursor-pointer"
                    >
                      <option value={5}>5 Stars - Exceptional</option>
                      <option value={4}>4 Stars - Great Experience</option>
                      <option value={3}>3 Stars - Average</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">Your City / Area</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Willow Glen, San Jose"
                      className="w-full p-2 border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-lg focus:border-teal-700 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">Service / Frame</label>
                  <input
                    type="text"
                    value={framePurchased}
                    onChange={(e) => setFramePurchased(e.target.value)}
                    placeholder="e.g. Soren Acetate in Tortoise"
                    className="w-full p-2 border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-lg focus:border-teal-700 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">Your Review *</label>
                  <textarea
                    rows={4}
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell us about the exam, frame fit, prescription clarity, or customer service..."
                    className="w-full p-2 border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-lg focus:border-teal-700 focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsWriteModalOpen(false)}
                    className="px-4 py-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 font-semibold text-white bg-teal-900 hover:bg-teal-950 dark:bg-teal-800 dark:hover:bg-teal-700 rounded-lg cursor-pointer"
                  >
                    Publish Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
