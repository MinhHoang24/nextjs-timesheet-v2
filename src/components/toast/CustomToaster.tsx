// app/components/CustomToaster.tsx
'use client';

import { Toaster } from 'react-hot-toast';

export default function CustomToaster() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: '#51A351',
          color: '#fff',
          padding: '15px',
          borderRadius: '12px',
          fontSize: '14px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
        },
        // 💬 Tùy chỉnh animation
        className: 'transform transition-all duration-300 ease-in-out',

        // ✅ Tuỳ chỉnh từng loại toast
        success: {
          style: {
            background: '#16a34a',
            color: '#fff',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#16a34a',
          },
        },
        error: {
          style: {
            background: '#dc2626', // đỏ
            color: '#fff',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#dc2626',
          },
        },
      }}
    />
  );
}