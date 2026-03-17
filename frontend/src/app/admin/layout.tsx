import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopNav from "@/components/admin/AdminTopNav";
import AdminGuard from "@/components/admin/AdminGuard";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata = {
  title: "Admin Dashboard | WristNerd",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminGuard>
        <div className="min-h-screen bg-gray-50">
          <AdminSidebar />
          <div className="lg:ml-64">
            <AdminTopNav />
            <main className="p-4 lg:p-8">{children}</main>
          </div>
        </div>
      </AdminGuard>
    </AuthProvider>
  );
}
