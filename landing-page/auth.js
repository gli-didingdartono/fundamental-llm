// Autentikasi sederhana untuk demo (sisi klien).
// PERINGATAN: kredensial hardcode di JavaScript bisa dilihat siapa saja lewat "View Source".
// Ganti dengan pemanggilan API ke server (misalnya POST /api/login) sebelum dipakai di produksi.
const Auth = (() => {
  const SESSION_KEY = 'proyeka_session';
  const DEMO_ACCOUNTS = [
    { username: 'user', email: 'user@proyeka.id', password: 'user' },
  ];

  function readSession() {
    const raw = sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    try {
      const session = JSON.parse(raw);
      if (session.expiresAt && Date.now() > session.expiresAt) { logout(); return null; }
      return session;
    } catch {
      logout();
      return null;
    }
  }

  function login(identifier, password, remember) {
    const id = identifier.trim().toLowerCase();
    const account = DEMO_ACCOUNTS.find(a => (a.username === id || a.email === id) && a.password === password);
    if (!account) return null;
    const session = { username: account.username, loginAt: Date.now() };
    if (remember) {
      session.expiresAt = Date.now() + 30 * 24 * 60 * 60 * 1000;
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } else {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    }
    return session;
  }

  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(SESSION_KEY);
  }

  return { current: readSession, login, logout };
})();
