import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: any;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  // Explicitly declare state and props to resolve TS errors
  state: ErrorBoundaryState;
  props: ErrorBoundaryProps;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
    this.props = props;
  }

  static getDerivedStateFromError(error: any): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          height: '100vh', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          padding: '20px', 
          textAlign: 'center', 
          backgroundColor: '#600010',
          color: 'white',
          fontFamily: 'sans-serif'
        }}>
          <h1 style={{fontSize: '2rem', marginBottom: '10px'}}>JM System Alert</h1>
          <p>Ocurrió un error inesperado en la aplicación.</p>
          <pre style={{
            background: 'rgba(0,0,0,0.3)', 
            padding: '10px', 
            borderRadius: '10px', 
            fontSize: '0.8rem', 
            marginTop: '20px',
            maxWidth: '100%',
            overflow: 'auto'
          }}>
            {this.state.error?.toString()}
          </pre>
          <button 
            onClick={() => { localStorage.clear(); window.location.reload(); }} 
            style={{
              marginTop: '30px', 
              padding: '15px 30px', 
              background: '#D4AF37', 
              color: '#600010', 
              border: 'none', 
              borderRadius: '10px', 
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
          >
            Restablecer Sistema (Borrar Datos)
          </button>
        </div>
      );
    }

    return this.props.children; 
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);