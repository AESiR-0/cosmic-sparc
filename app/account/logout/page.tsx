"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LogoutPage() {
  const router = useRouter();
  useEffect(() => {
    const doLogout = async () => {
      await supabase.auth.signOut();
      router.replace("/");
    };
    doLogout();
  }, [router]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#006D92] mb-4" />
      <p className="text-lg text-gray-700">Logging you out...</p>
    </div>
  );
} 