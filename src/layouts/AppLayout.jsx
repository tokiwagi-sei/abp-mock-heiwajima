import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import ChatWidget from '../features/ai-chat/ChatWidget';

/**
 * 全ページ共通のレイアウト（ヘッダー＋サイドバー＋本文＋AIチャット）。
 */
export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex flex-1 min-h-0">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 min-w-0 px-4 py-6 md:px-8 md:py-8 max-w-[1400px] mx-auto w-full">
          <Outlet />
        </main>
      </div>
      <ChatWidget />
    </div>
  );
}
