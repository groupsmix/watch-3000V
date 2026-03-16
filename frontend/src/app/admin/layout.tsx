import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopNav from "@/components/admin/AdminTopNav";

export const metadata = {
  title: "Admin Dashboard | WristNerd",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="lg:ml-64">
        <AdminTopNav />
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
