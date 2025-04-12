import { AlertCircle } from "lucide-react";
import { Button } from "~/ui/primitives/button";

interface ErrorDisplayProps {
  message?: string;
  retry?: () => void;
}

export function ErrorDisplay({ message = "Something went wrong", retry }: ErrorDisplayProps) {
  return (
    <div className="flex min-h-[200px] w-full flex-col items-center justify-center gap-4 text-center">
      <AlertCircle className="h-8 w-8 text-destructive" />
      <p className="text-lg font-medium text-destructive">{message}</p>
      {retry && (
        <Button onClick={retry} variant="outline">
          Try Again
        </Button>
      )}
    </div>
  );
}

export function ErrorPage({ message = "Something went wrong", retry }: ErrorDisplayProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 text-center">
      <AlertCircle className="h-12 w-12 text-destructive" />
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Oops!</h1>
        <p className="text-lg text-muted-foreground">{message}</p>
      </div>
      {retry && (
        <Button onClick={retry} variant="outline" size="lg">
          Try Again
        </Button>
      )}
    </div>
  );
} 