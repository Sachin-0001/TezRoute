export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-[9999]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-opacity-60"></div>
      <span className="ml-4 text-blue-700 text-lg font-semibold">Loading...</span>
    </div>
  );
}
