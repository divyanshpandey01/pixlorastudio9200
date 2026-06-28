export default function AnalyticsPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="w-16 h-16 bg-[rgba(255,255,255,0.05)] rounded-full flex items-center justify-center mb-6">
        <svg className="w-8 h-8 text-[var(--color-accent-pink)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-white mb-2">Analytics</h1>
      <p className="text-[var(--color-text-secondary)] max-w-md mx-auto">
        Detailed analytics are coming soon. Track views, engagement, and reach for all your shared galleries and QR codes.
      </p>
    </div>
  );
}
