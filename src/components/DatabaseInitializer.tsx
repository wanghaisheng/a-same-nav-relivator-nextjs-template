"use client";

import { useEffect, useState } from "react";
import { database } from "~/db";
import { LoadingSpinner } from "~/components/LoadingSpinner";
import { ErrorMessage } from "~/ui/components/error-message";

interface DatabaseInitializerProps {
  children: React.ReactNode;
}

export function DatabaseInitializer({ children }: DatabaseInitializerProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function initialize() {
      try {
        await database.initialize();
        setIsInitialized(true);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to initialize database"));
      }
    }

    initialize();
  }, []);

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  if (!isInitialized) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
} 