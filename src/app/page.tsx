'use client';
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function App() {
  const router = useRouter();
  useEffect(() => {
    router.push('/main/my-profile');
  }, [router]);
  return (
    <div>
      redirecting...
    </div>
  );
}