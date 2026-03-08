import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';

// ==================== LOGIN COMPONENT ====================
function Login() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState(1);
  const [currentCode, setCurrentCode] = useState('');
  const [status, setStatus] = useState('');

  // EmailJS config from Vite env (safe in Render)
  const EMAILJS_CONFIG = {
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  };

  // Load EmailJS script dynamically
  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.async = true;
    script.onload = () => {
      window.emailjs.init(EMAILJS_CONFIG.publicKey);
    };
    document.body.appendChild(script);
  }, []);

  const generateCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendCode = async () => {
    if (!email.includes('@')) {
      setStatus('Please enter a valid email');
      return;
    }

    const newCode = generateCode();
    setCurrentCode(newCode);

    try {
      setStatus('Sending...');
      
      await window.emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          to_email: email,
          to_name: email.split('@')[0],
          code: newCode
        }
      );
      
      setStatus('✅ Code sent! Check your email');
      setStep(2);
    } catch (error) {
      console.error('Email error:', error);
      setStatus('❌ Failed to send. Check console.');
    }
  };

  const verifyCode = () => {
    if (code === currentCode) {
      setStatus('✅ Login successful!');
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    } else {
      setStatus('❌ Wrong code');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🔐 GOLDEN TECH</h1>
        
        {step === 1 ? (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
            <button onClick={sendCode} style={styles.button}>
              Send Verification Code
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter 6-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength="6"
              style={styles.input}
            />
            <button onClick={verifyCode} style={styles.button}>
              Verify & Login
            </button>
            <button 
              onClick={() => setStep(1)} 
              style={{...styles.button, ...styles.secondary}}
            >
              ← Back
            </button>
          </>
        )}
        
        {status && (
          <div style={{
            ...styles.status,
            ...(status.includes('✅') ? styles.success : {}),
            ...(status.includes('❌') ? styles.error : {})
          }}>
            {status}
          </div>
        )}
        
        <div style={styles.link}>
          <Link to="/">← Back to Store</Link>
        </div>
      </div>
    </div>
  );
}

// ==================== HOME PAGE ====================
function Home() {
  // Your existing home page code here
  return (
    <div>
      <h1>Welcome to Golden Tech</h1>
      <Link to="/login.html">Login</Link>
    </div>
  );
}

// ==================== STYLES ====================
const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  },
  card: {
    background: 'white',
    borderRadius: '20px',
    padding: '40px',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
  },
  title: {
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '28px',
    color: '#333'
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '20px',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '16px'
  },
  button: {
    width: '100%',
    padding: '14px',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginBottom: '10px'
  },
  secondary: {
    background: '#e0e0e0',
    color: '#333'
  },
  status: {
    marginTop: '20px',
    padding: '12px',
    borderRadius: '8px',
    textAlign: 'center'
  },
  success: {
    background: '#c6f6d5',
    color: '#22543d'
  },
  error: {
    background: '#fed7d7',
    color: '#742a2a'
  },
  link: {
    textAlign: 'center',
    marginTop: '20px'
  }
};

// ==================== ROUTER ====================
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login.html",  // This makes it work at /login.html
    element: <Login />,
  },
]);

// ==================== RENDER ====================
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
