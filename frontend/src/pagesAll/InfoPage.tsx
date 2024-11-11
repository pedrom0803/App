import { ArrowRight } from "lucide-react";
import SendEmail from "../pagesClient/SendEmail";
export default function InfoPage() {
  return (
    <div className="space-y-8">
      {/* Título */}
      <h1 className="text-4xl font-bold mb-8 text-[#8B4513] border-b-2 border-[#D2B48C] pb-4">
        Sobre Nós
      </h1>

      {/* Nossa História */}
      <div className="bg-[#FFF8DC] border border-[#D2B48C] rounded-lg shadow-md overflow-hidden">
        <div className="bg-[#D2B48C] p-4">
          <h2 className="text-white text-xl font-semibold">Nossa História</h2>
        </div>
        <div className="p-6">
          <p className="text-[#8B4513] text-lg">
            Fundada em 2023, a ComprasExpress nasceu da necessidade de oferecer
            um serviço de entrega de compras confiável e acessível. Acreditamos
            em simplificar a vida de nossos clientes ao trazer produtos frescos
            e de qualidade diretamente às suas portas, com rapidez e eficiência.
          </p>
        </div>
      </div>

      {/* Missão e Valores */}
      <div className="bg-[#FFF8DC] border border-[#D2B48C] rounded-lg shadow-md overflow-hidden">
        <div className="bg-[#D2B48C] p-4">
          <h2 className="text-white text-xl font-semibold">Missão e Valores</h2>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-[#8B4513] text-lg">
            <strong>Missão:</strong> Nossa missão é tornar as compras mais
            convenientes e acessíveis, oferecendo um serviço confiável e prático
            para todos.
          </p>
          <p className="text-[#8B4513] text-lg">
            <strong>Valores:</strong> Valorizamos a qualidade, a confiança e a
            dedicação aos nossos clientes. Cada entrega é realizada com o
            compromisso de proporcionar uma experiência excelente e única.
          </p>
        </div>
      </div>

      {/* Nossa Equipe */}
      <div className="bg-[#FFF8DC] border border-[#D2B48C] rounded-lg shadow-md overflow-hidden">
        <div className="bg-[#D2B48C] p-4">
          <h2 className="text-white text-xl font-semibold">Nossa Equipe</h2>
        </div>
        <div className="p-6">
          <p className="text-[#8B4513] mb-4 text-lg">
            Somos uma equipe de profissionais apaixonados por inovação e
            qualidade, trabalhando para garantir que cada pedido seja processado
            com atenção e cuidado. Conheça nossos valores:
          </p>
          <ul className="list-disc list-inside space-y-2 text-[#8B4513]">
            {[
              "Dedicação ao cliente",
              "Compromisso com a qualidade",
              "Inovação constante",
              "Trabalho em equipe",
            ].map((value, index) => (
              <li key={index}>{value}</li>
            ))}
          </ul>
        </div>
      </div>
      <SendEmail />
    </div>
  );
}
