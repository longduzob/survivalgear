"use client";

import { useRouter } from "next/navigation";

export default function RetryButton() {
  const router = useRouter();

  const handleRetry = () => {
    router.refresh();
  };

  return (
    <button
      onClick={handleRetry}
      style={{
        padding: "8px 16px",
        background: "#f5f5f5",
        border: "1px solid #ddd",
        borderRadius: 4,
        cursor: "pointer",
      }}
    >
      Réessayer
    </button>
  );
}
