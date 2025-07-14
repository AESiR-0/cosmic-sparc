import AccountSidebar from '@/components/layout/AccountSidebar';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-orange-50/30">
      <AccountSidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
} 