import { AlertTriangle } from "lucide-react";

export default function Construction({
  message = "Estamos trabalhando para trazer novidades em breve!",
}: {
  message?: string;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF8DC] p-4">
      <div className="relative">
        {/* Construction Sign */}
        <div className="bg-[#D2B48C] border-4 border-[#8B4513] rounded-lg shadow-lg p-8 transform -rotate-3 max-w-md w-full">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <div className="w-4 h-16 bg-[#8B4513] rounded-t-full"></div>
          </div>
          <div className="text-center">
            <AlertTriangle className="text-[#8B4513] w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-[#8B4513] mb-4">
              Em construção
            </h1>
            <p className="text-lg text-[#8B4513]">{message}</p>
          </div>
        </div>

        {/* Hanging Chains */}
        <div className="absolute -top-6 left-4 w-1 h-24 bg-gradient-to-b from-gray-500 to-gray-300 rounded"></div>
        <div className="absolute -top-6 right-4 w-1 h-24 bg-gradient-to-b from-gray-500 to-gray-300 rounded"></div>
      </div>

      {/* Additional Information */}
      <div className="mt-12 bg-[#FFF8DC] border border-[#D2B48C] rounded-lg shadow-md overflow-hidden max-w-md w-full">
        <div className="bg-[#D2B48C] p-4">
          <h2 className="text-white text-xl font-semibold">Fique por dentro</h2>
        </div>
        <div className="p-6">
          <p className="text-[#8B4513] text-lg mb-4">
            Estamos melhorando nosso site para oferecer uma experiência ainda
            melhor. Volte em breve para conferir as novidades!
          </p>
          <ul className="list-disc list-inside space-y-2 text-[#8B4513]">
            {[
              "Novo design",
              "Funcionalidades aprimoradas",
              "Conteúdo exclusivo",
              "E muito mais!",
            ].map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
