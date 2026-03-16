import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | WristNerd Admin",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0C1220] flex items-center justify-center p-4">
      {children}
    </div>
  );
}
