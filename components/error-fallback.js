import { useQueryClient } from "react-query";

function ErrorFallback({
  resetErrorBoundary,
  queryKey,
  style = "default-fallback",
}) {
  const queryClient = useQueryClient();

  const handleReset = () => {
    queryClient.invalidateQueries([...queryKey]);
    resetErrorBoundary();
  };

  return (
    <div className={style}>
      <div className="flex flex-col items-center justify-center space-y-8 text-gray-50">
        <button
          className="px-4 py-2 font-semibold bg-indigo-500 rounded active:bg-indigo-400"
          onClick={handleReset}>
          Try again
        </button>
      </div>
    </div>
  );
}

export default ErrorFallback;
