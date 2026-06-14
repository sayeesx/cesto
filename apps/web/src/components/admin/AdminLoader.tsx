/**
 * Full-page loading spinner shown while useAdminGuard is verifying
 * the admin session. Replaces the blank white page.
 */
export default function AdminLoader() {
  return (
    <div style={{
      minHeight: '100dvh',
      background: '#F8F9FA',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: 16,
    }}>
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        style={{ animation: 'admin-spin 0.75s linear infinite' }}
      >
        <circle cx="20" cy="20" r="17" stroke="#E5E7EB" strokeWidth="4" />
        <path d="M20 3a17 17 0 0 1 17 17" stroke="#1a3a3a" strokeWidth="4" strokeLinecap="round" />
      </svg>
      <span style={{ fontSize: 12, fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.05em' }}>
        Loading…
      </span>
      <style>{`@keyframes admin-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
