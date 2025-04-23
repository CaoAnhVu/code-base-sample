import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

// Thêm typing cho window
declare global {
  interface Window {
    __APP_RENDERED__: boolean;
  }
}

// Thêm logging chi tiết
console.log('Application starting...');

// Xóa cache trước khi khởi chạy
if ('caches' in window) {
  try {
    console.log('Clearing browser caches...');
    caches.keys().then((names) => {
      names.forEach((name) => {
        caches.delete(name);
        console.log(`Cache '${name}' deleted`);
      });
    });
  } catch (e) {
    console.error('Error clearing caches:', e);
  }
}

// Find the root element
const rootElement = document.getElementById('root');

if (!rootElement) {
  // Tạo element root nếu không tồn tại
  console.error('Root element not found, creating a new one');
  const newRoot = document.createElement('div');
  newRoot.id = 'root';
  document.body.appendChild(newRoot);
}

// Thêm thông báo để debug
console.log('Initializing React app...');

// Biến toàn cục để kiểm tra trạng thái render
window.__APP_RENDERED__ = false;

try {
  console.log('Creating React root...');
  const root = createRoot(rootElement || document.getElementById('root')!);

  console.log('Rendering app...');
  root.render(<App />);

  window.__APP_RENDERED__ = true;
  console.log('App rendered successfully');
} catch (error) {
  console.error('Error rendering app:', error);

  // Fallback UI if rendering fails
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center; font-family: sans-serif;">
        <h1 style="color: #991b1b;">Application Error</h1>
        <p style="margin-bottom: 20px;">Error: ${error instanceof Error ? error.message : String(error)}</p>
        <button onclick="localStorage.clear(); sessionStorage.clear(); window.location.reload()" 
                style="padding: 10px 20px; background: #4f46e5; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Clear Cache & Reload
        </button>
      </div>
    `;
  }
}
