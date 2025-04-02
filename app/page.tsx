import Image from "next/image";
import styles from "./page.module.css";
import Start from "./layout/start";

export default function Home() {
  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(to right, #3b82f6, #6366f1)'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        padding: '2rem',
        backgroundColor: '#fff',
        borderRadius: '16px',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)'
      }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#111827'
        }}>Welcome Back</h2>
        <form style={{ marginTop: '1rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', color: '#374151', fontWeight: '500' }}>Email</label>
            <input
              type="email"
              style={{
                width: '100%',
                padding: '10px',
                marginTop: '5px',
                border: '1px solid #d1d5db',
                borderRadius: '8px'
              }}
              placeholder="Enter your email"
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', color: '#374151', fontWeight: '500' }}>Password</label>
            <input
              type="password"
              style={{
                width: '100%',
                padding: '10px',
                marginTop: '5px',
                border: '1px solid #d1d5db',
                borderRadius: '8px'
              }}
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              fontWeight: 'bold',
              color: '#fff',
              backgroundColor: '#2563eb',
              borderRadius: '8px',
              cursor: 'pointer',
              border: 'none'
            }}
          >
            Login
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '10px', fontSize: '14px', color: '#6b7280' }}>
          Don't have an account? <a href="#" style={{ color: '#2563eb', fontWeight: 'bold', textDecoration: 'underline' }}>Sign up</a>
        </p>
      </div>
    </div>
  );
}
