"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AccountIndexPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/account/profile");
  }, [router]);
  return null;
} 