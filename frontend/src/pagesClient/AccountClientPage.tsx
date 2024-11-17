import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../pagesExtra/LoadingPage";
import { FormEvent } from "react";

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
  const [inputValues, setInputValues] = useState<boolean>(false);

  const [errors, setErrors] = useState({
    contacto: "",
    morada: "",
    codigo_postal: "",
    porta: "",
  });

  const [values, setValues] = useState({
    contacto: "",
    morada: "",
    distrito: "",
    concelho: "",
    codigo_postal: "",
    porta: "",
  });

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8000/api/infoUser/${id}/`)
        .then((response) => {
          if (!response.ok)
            throw new Error("Erro ao carregar os dados do usuário");
          return response.json();
        })
        .then((data) => {
          setUser(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [id]);

  const handleChangeInfo = async (e: FormEvent) => {
    e.preventDefault();

    if (validarCampos()) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/changeclientinfo/",
          {
            id,
            contacto: values.contacto,
            morada: values.morada,
            distrito: values.distrito,
            concelho: values.concelho,
            porta: values.porta,
          }
        );

        if (response.status === 200) {
          // Sucesso
          alert("Dados atualizados com sucesso.");
          setError(null); // Remove mensagens de erro
          setInputValues(false); // Sai do modo de edição
        } else {
          // Mensagem de falha inesperada
          setError("Ocorreu um problema inesperado.");
          alert(null);
        }
      } catch (err: any) {
        // Lida com erros de requisição
        if (err.response && err.response.status === 404) {
          setError("Utilizador não encontrado.");
        } else {
          setError("Erro ao mudar na base de dados.");
        }
        alert(null);
      }
    }
  };

  const handleChange = (key: keyof UserData, value: string) => {
    if (user) {
      setUser({ ...user, [key]: value });
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  function validarCampos() {
    let contactoError = "";
    let moradaError = "";
    let codigo_postalError = "";
    let portaError = "";

    const contacto = (document.getElementById("contacto") as HTMLInputElement)
      .value;
    const morada = (document.getElementById("morada") as HTMLInputElement)
      .value;
    const distrito = (document.getElementById("distrito") as HTMLInputElement)
      .value;
    const concelho = (document.getElementById("concelho") as HTMLInputElement)
      .value;
    const codigo_postal = (
      document.getElementById("codigo_postal") as HTMLInputElement
    ).value;
    const porta = (document.getElementById("porta") as HTMLInputElement).value;

    if (!/^(2|3|9)\d{8}$/.test(contacto)) {
      contactoError = "Número de contacto inválido";
    }
    if (morada === null || morada === undefined || morada === "") {
      moradaError = "Morada inválida";
    }
    if (!/^[0-9]{4}-[0-9]{3}$/.test(codigo_postal)) {
      codigo_postalError = "Código postal inválido";
    }

    if (porta === null || porta === undefined || porta === "") {
      portaError = "Número de porta inválida";
    }

    setErrors({
      contacto: contactoError,
      morada: moradaError,
      codigo_postal: codigo_postalError,
      porta: portaError,
    });

    if (!contactoError && !moradaError && !codigo_postalError && !portaError) {
      setValues({
        contacto: contacto,
        morada: morada,
        distrito: distrito,
        concelho: concelho,
        codigo_postal: codigo_postal,
        porta: porta,
      });
      return true;
    }
    console.log("Deu erro");
    return false;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF8DC] p-6">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-[#D2B48C] p-6">
          <h1 className="text-4xl font-bold text-white text-center">
            {user?.nome_completo}
          </h1>
        </div>
        <div className="p-6 space-y-4">
          <DetailRow
            id="email"
            label="Email"
            value={user?.email || ""}
            input={false}
          />
          <DetailRow
            id="contacto"
            label="Contacto"
            value={user?.contacto || ""}
            input={inputValues}
            onChange={(newValue) => handleChange("contacto", newValue)}
          />
          {errors.contacto && (
            <p className="text-red-500 text-xs">{errors.contacto}</p>
          )}
          <DetailRow
            id="user_type"
            label="Tipo de Utilizador"
            value={user?.tipo_user || ""}
            input={false}
          />
          <DetailRow
            id="morada"
            label="Morada"
            value={user?.morada || ""}
            input={inputValues}
            onChange={(newValue) => handleChange("morada", newValue)}
          />
          {errors.morada && (
            <p className="text-red-500 text-xs">{errors.morada}</p>
          )}
          <DetailRow
            id="distrito"
            label="Distrito"
            value={user?.distrito || ""}
            input={inputValues}
            onChange={(newValue) => handleChange("distrito", newValue)}
          />
          <DetailRow
            id="concelho"
            label="Concelho"
            value={user?.concelho || ""}
            input={inputValues}
            onChange={(newValue) => handleChange("concelho", newValue)}
          />
          <DetailRow
            id="codigo_postal"
            label="Código Postal"
            value={user?.codigo_postal || ""}
            input={inputValues}
            onChange={(newValue) => handleChange("codigo_postal", newValue)}
          />
          {errors.codigo_postal && (
            <p className="text-red-500 text-xs">{errors.codigo_postal}</p>
          )}
          <DetailRow
            id="porta"
            label="Porta"
            value={user?.porta || ""}
            input={inputValues}
            onChange={(newValue) => handleChange("porta", newValue)}
          />
          {errors.porta && (
            <p className="text-red-500 text-xs">{errors.porta}</p>
          )}
        </div>
        <div className="mt-4 text-center">
          {inputValues ? (
            <div className="mt-4 text-center flex justify-center space-x-4">
              <button
                className="bg-[#8B4513] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#6A3210]"
                onClick={handleChangeInfo} // Salvar e sair do modo de edição
              >
                Salvar
              </button>
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-500"
                onClick={() => [
                  setInputValues(false),
                  setValues({
                    contacto: "",
                    morada: "",
                    distrito: "",
                    concelho: "",
                    codigo_postal: "",
                    porta: "",
                  }),
                ]} // Apenas sai do modo de edição
              >
                Cancelar
              </button>
            </div>
          ) : (
            <button
              className="bg-[#8B4513] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#6A3210]"
              onClick={() => setInputValues((prev) => !prev)}
            >
              Editar Informações
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Componente para exibir os detalhes com rótulos e valores
function DetailRow({
  id,
  label,
  value,
  input,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  input: boolean;
  onChange?: (newValue: string) => void;
}) {
  return (
    <div className="flex justify-between items-center border-b pb-2">
      <span className="font-semibold text-[#8B4513]">{label}:</span>
      {input ? (
        <input
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 text-[#4A4A4A]"
        />
      ) : (
        <span className="text-[#4A4A4A]">{value}</span>
      )}
    </div>
  );
}
