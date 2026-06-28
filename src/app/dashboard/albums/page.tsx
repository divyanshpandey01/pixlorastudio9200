export default function AlbumsPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="w-16 h-16 bg-[rgba(255,255,255,0.05)] rounded-full flex items-center justify-center mb-6">
        <svg className="w-8 h-8 text-[var(--color-accent-blue)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-white mb-2">Smart Albums</h1>
      <p className="text-[var(--color-text-secondary)] max-w-md mx-auto">
        AI-powered smart albums are coming soon. Automatically organize your photos by people, places, and events.
      </p>
    </div>
  );
}
