import Button from "./Button";

const PaginationBar = ({
  page = 1,
  totalPages = 1,
  totalItems = 0,
  itemLabel = "items",
  loading = false,
  onPageChange,
}) => {
  const safeTotalPages =
    Math.max(1, totalPages);
  const canGoBack =
    page > 1 && !loading;
  const canGoForward =
    page < safeTotalPages &&
    !loading;

  return (
    <div className="flex flex-col gap-4 rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-slate-300">
        {totalItems} {itemLabel}
        {totalItems === 1 ? "" : "s"} •
        page {page} of{" "}
        {safeTotalPages}
      </p>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={!canGoBack}
          onClick={() =>
            onPageChange(page - 1)
          }
        >
          Previous
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={!canGoForward}
          onClick={() =>
            onPageChange(page + 1)
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PaginationBar;
