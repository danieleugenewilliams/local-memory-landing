import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initializeAnalytics } from './lib/analytics'

// Initialize GA4 analytics with enhanced ecommerce tracking
initializeAnalytics();

createRoot(document.getElementById("root")!).render(<App />);
