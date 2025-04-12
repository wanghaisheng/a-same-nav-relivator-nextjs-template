import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-4 text-destructive">
        <AlertCircle className="h-5 w-5" />
        <p>{message}</p>
      </div>
    </div>
  );
} 