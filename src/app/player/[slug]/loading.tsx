export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen w-screen">
      <div className="text-center">
        <div className="flex justify-center items-center space-x-2 mb-4">
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
        </div>
        <p className="text-xl text-gray-400 font-semibold">
          Loading player data...
        </p>
      </div>
    </div>
  );
}
