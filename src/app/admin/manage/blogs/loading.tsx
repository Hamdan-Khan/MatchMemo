export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <div className="flex justify-center items-center mb-4">
          <div className="w-12 h-12 border-4 border-t-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-xl text-gray-600 font-semibold">Loading...</p>
      </div>
    </div>
  );
}
