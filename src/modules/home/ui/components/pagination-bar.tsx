import { Button } from "@/components/ui/button";

const getPageList = (current: number, total: number): Array<number | "…"> => {
  const last = total - 1;
  const window = 1; // pages around current
  const set = new Set<number>([0, last]);

  for (let i = current - window; i <= current + window; i++) {
    if (i >= 0 && i <= last) set.add(i);
  }

  const sorted = Array.from(set).sort((a, b) => a - b);
  const out: Array<number | "…"> = [];

  for (let i = 0; i < sorted.length; i++) {
    const val = sorted[i];
    const prev = sorted[i - 1];

    if (i > 0 && prev !== undefined && val - prev > 1) out.push("…");
    out.push(val);
  }

  return out;
};

export const PaginationBar = ({
  page,
  totalPages,
  onPageChange,
}: {
  page: number; // 0-based
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  if (totalPages <= 1) return null;

  const pages = getPageList(page, totalPages);

  return (
    <div className="flex items-center justify-center gap-2 pt-2">
      <Button
        variant="outline"
        size="sm"
        disabled={page === 0}
        onClick={() => onPageChange(page - 1)}
      >
        Prev
      </Button>

      {pages.map((p, idx) => {
        if (p === "…") {
          return (
            <span key={`dots-${idx}`} className="px-2 text-muted-foreground">
              …
            </span>
          );
        }

        const isActive = p === page;
        return (
          <Button
            key={p}
            variant={isActive ? "default" : "outline"}
            size="sm"
            onClick={() => onPageChange(p)}
          >
            {p + 1}
          </Button>
        );
      })}

      <Button
        variant="outline"
        size="sm"
        disabled={page >= totalPages - 1}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </Button>
    </div>
  );
};
