export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        <div className="animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full" />
        <p className="mt-4 text-lg font-semibold text-gray-700">
          Carregando...
        </p>
      </div>
    </div>
  );
}
