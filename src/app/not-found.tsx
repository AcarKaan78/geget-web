import Link from 'next/link';

export default function GlobalNotFound() {
  return (
    <html lang="tr">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily:
            'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          background: '#fafafa',
          color: '#0a0a0a',
        }}
      >
        <h1 style={{ fontSize: 48, margin: 0 }}>404</h1>
        <p style={{ marginTop: 8 }}>Sayfa bulunamadı / Page not found</p>
        <Link
          href="/"
          style={{
            marginTop: 16,
            color: '#3b82f6',
            textDecoration: 'underline',
          }}
        >
          Ana Sayfa / Home
        </Link>
      </body>
    </html>
  );
}
