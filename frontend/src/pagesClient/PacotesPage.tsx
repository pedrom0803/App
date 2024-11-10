import { Check } from "lucide-react";

export default function Pacotes() {
  const pacotes = [
    {
      nome: "Básico",
      preco: "€ 4,5",
      extras: [
        "Válido para 3 Compras",
        "Receba 10% de desconto em todas as suas compras",
      ],
    },
    {
      nome: "Classic",
      preco: "€ 8,75",
      extras: [
        "Válido todas as Compras durante um mês",
        "Receba 10% de desconto em todas as suas compras",
      ],
    },
    {
      nome: "Premium",
      preco: "€ 12",
      extras: [
        "Valido todas as Compras durante um mês",
        "Receba 10% de desconto em todas as suas compras",
        "Pedido prioritário",
      ],
    },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-[#8B4513] mb-8 border-b-2 border-[#D2B48C] pb-4">
        Nossos Pacotes
      </h2>
      <div className="grid grid-cols-3 gap-6 px-4">
        {pacotes.map((pacote, index) => (
          <div
            key={index}
            className="bg-[#FFF8DC] border border-[#D2B48C] rounded-lg shadow-md overflow-hidden"
          >
            <div className="bg-[#D2B48C] p-4">
              <h3 className="text-white text-xl font-semibold">
                {pacote.nome}
              </h3>
            </div>
            <div className="p-6">
              <p className="text-2xl font-bold text-[#8B4513] mb-4">
                {pacote.preco}
              </p>
              <ul className="text-[#8B4513] space-y-2">
                {pacote.extras.map((extra, idx) => (
                  <li key={idx} className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-[#D2B48C]" />
                    {extra}
                  </li>
                ))}
              </ul>
              <button className="w-full mt-6 px-4 py-2 bg-[#D2B48C] text-white font-semibold rounded-md hover:bg-[#C19A6B] transition-colors duration-200">
                Escolher Plano
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
