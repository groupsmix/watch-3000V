import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopNav from "@/components/admin/AdminTopNav";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata = {
  title: "Admin Dashboard | WristNerd",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <AdminSidebar />
        <div className="lg:ml-64">
          <AdminTopNav />
          <main className="p-4 lg:p-8">{children}</main>
        </div>
      </div>
    </AuthProvider>
  );
}
