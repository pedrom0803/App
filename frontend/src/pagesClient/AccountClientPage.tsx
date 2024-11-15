import React, { useState, useEffect } from "react";
import axios from "axios";

// Defina a interface para os dados do usuário
interface UserData {
  nome_completo: string;
  email: string;
  contacto: string | null;
  tipo_user: string | null;
  morada: string | null;
  distrito: string | null;
  concelho: string | null;
  codigo_postal: string | null;
  porta: string | null;
}

interface AccountClientProps {
  id?: string | null;
}

export default function AccountClient({ id }: AccountClientProps) {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar dados do usuário na API do Django
  useEffect(() => {
    console.log(id);
    if (id) {
      fetch(`http://localhost:8000/api/infoUser/${id}/`) // Incluindo o id na URL
        .then((response) => {
          if (!response.ok) {
            console.log("Erro ao ir buscar os dados");
            throw new Error("Erro ao carregar os dados do usuário");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Antes de preencher data");
          setUser(data); // Preenche o estado com os dados do usuário
          console.log("Depois de preencher data");
          setLoading(false);
        })
        .catch((error) => {
          console.log("Erro:" + error);
          setError(error.message); // Em caso de erro
          setLoading(false);
        });
    }
  }, [id]); // O efeito é disparado sempre que o id muda

  if (loading) {
    return <div>Carregando...</div>; // Exibe "Carregando..." enquanto os dados não são carregados
  }

  if (error) {
    return <div>{error}</div>; // Exibe erro caso ocorra
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF8DC] p-6">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-[#D2B48C] p-6">
          <h1 className="text-4xl font-bold text-white text-center">
            {user?.nome_completo}
          </h1>
        </div>

        {/* User Details */}
        <div className="p-6 space-y-4">
          <DetailRow label="Email" value={user?.email || ""} />
          <DetailRow
            label="Contacto"
            value={user?.contacto || "Não especificado"}
          />
          <DetailRow
            label="Tipo de Utilizador"
            value={user?.tipo_user || "Não especificado"}
          />
          <DetailRow
            label="Morada"
            value={user?.morada || "Não especificada"}
          />
          <DetailRow
            label="Distrito"
            value={user?.distrito || "Não especificado"}
          />
          <DetailRow
            label="Concelho"
            value={user?.concelho || "Não especificado"}
          />
          <DetailRow
            label="Código Postal"
            value={user?.codigo_postal || "Não especificado"}
          />
          <DetailRow label="Porta" value={user?.porta || "Não especificada"} />
        </div>

        {/* Edit Button */}
        <div className="mt-4 text-center">
          <button className="bg-[#8B4513] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#6A3210]">
            Editar Informações
          </button>
        </div>
      </div>
    </div>
  );
}

// Componente para exibir os detalhes com rótulos e valores
function DetailRow({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="flex justify-between items-center border-b pb-2">
      <span className="font-semibold text-[#8B4513]">{label}:</span>
      <span className="text-[#4A4A4A]">{value}</span>
    </div>
  );
}
