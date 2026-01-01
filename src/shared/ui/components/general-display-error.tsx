import { AlertTriangle, RotateCcw } from "lucide-react";
import { isApiError } from "@/shared/api/api-error";
import { Button } from "@/components/ui/button";

interface Props {
  error: unknown;
  resetErrorBoundary?: () => void;
}

export const GeneralDisplayError = ({ error, resetErrorBoundary }: Props) => {
  let message = "Something went wrong. Please try again.";

  if (isApiError(error)) {
    message = error.message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-md border bg-muted/40 p-6 text-center">
      <AlertTriangle className="size-8 text-destructive" />

      <p className="text-sm text-muted-foreground max-w-sm">{message}</p>

      {resetErrorBoundary && (
        <Button
          size="sm"
          variant="outline"
          onClick={resetErrorBoundary}
          className="mt-2"
        >
          <RotateCcw className="mr-2 size-4" />
          Retry
        </Button>
      )}
    </div>
  );
};
