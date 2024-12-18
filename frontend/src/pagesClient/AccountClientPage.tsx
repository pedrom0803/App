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

interface DistritoConcelho {
  distrito: string;
  concelho: string;
  ativo: number;
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
    distrito: "",
    concelho: "",
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

  const [distritosConcelhos, setDistritosConcelhos] = useState<
    DistritoConcelho[]
  >([]);

  const [distritos, setDistritos] = useState<string[]>([]);
  const [selectedDistrito, setSelectedDistrito] = useState<string>("");

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
          setValues({
            contacto: data.contacto,
            morada: data.morada,
            distrito: data.distrito,
            concelho: data.concelho,
            codigo_postal: data.codigo_postal,
            porta: data.porta,
          });

          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
    if (id) {
      fetch(`http://localhost:8000/api/getdistritosconcelhos/`)
        .then((response) => {
          if (!response.ok)
            throw new Error("Erro ao carregar os dados do usuário");
          return response.json();
        })
        .then((data: DistritoConcelho[]) => {
          setDistritosConcelhos(data);

          const uniqueDistritos = Array.from(
            new Set(data.map((item: DistritoConcelho) => item.distrito))
          );

          setDistritos(uniqueDistritos);
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
            values,
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
      }
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
    let distritoError = "";
    let concelhoError = "";
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
    if (distrito === null || distrito === undefined || distrito === "") {
      distritoError = "Selecione um distrito";
    }
    if (concelho === null || concelho === undefined || concelho === "") {
      concelhoError = "Selecione um concelho";
    }
    if (porta === null || porta === undefined || porta === "") {
      portaError = "Número de porta inválida";
    }

    setErrors({
      contacto: contactoError,
      morada: moradaError,
      codigo_postal: codigo_postalError,
      distrito: distritoError,
      concelho: concelhoError,
      porta: portaError,
    });

    if (
      !contactoError &&
      !moradaError &&
      !codigo_postalError &&
      !distritoError &&
      !concelhoError &&
      !portaError
    ) {
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
            value={values.contacto || ""}
            input={inputValues}
            onChange={(newValue) =>
              setValues((prevValues) => ({
                ...prevValues,
                contacto: newValue,
              }))
            }
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
            value={values.morada || ""}
            input={inputValues}
            onChange={(newValue) =>
              setValues((prevValues) => ({
                ...prevValues,
                morada: newValue,
              }))
            }
          />
          {errors.morada && (
            <p className="text-red-500 text-xs">{errors.morada}</p>
          )}
          <DetailRow
            id="distrito"
            label="Distrito"
            value={values.distrito || ""}
            input={inputValues}
            options={distritos} // Passa os distritos como opções
            onChange={(newValue) => {
              setSelectedDistrito(newValue);
              setValues((prevValues) => ({
                ...prevValues,
                distrito: newValue,
                concelho: "",
              }));
            }}
          />
          {errors.distrito && (
            <p className="text-red-500 text-xs">{errors.distrito}</p>
          )}
          <DetailRow
            id="concelho"
            label="Concelho"
            value={values.concelho || ""}
            input={inputValues}
            options={
              selectedDistrito
                ? distritosConcelhos
                    .filter((item) => item.distrito === selectedDistrito)
                    .map((item) => item.concelho)
                : []
            } // Filtra os concelhos com base no distrito selecionado
            onChange={(newValue) =>
              setValues((prevValues) => ({ ...prevValues, concelho: newValue }))
            }
          />
          {errors.concelho && (
            <p className="text-red-500 text-xs">{errors.concelho}</p>
          )}
          <DetailRow
            id="codigo_postal"
            label="Código Postal"
            value={values.codigo_postal || ""}
            input={inputValues}
            onChange={(newValue) =>
              setValues((prevValues) => ({
                ...prevValues,
                codigo_postal: newValue,
              }))
            }
          />
          {errors.codigo_postal && (
            <p className="text-red-500 text-xs">{errors.codigo_postal}</p>
          )}
          <DetailRow
            id="porta"
            label="Porta"
            value={values.porta || ""}
            input={inputValues}
            onChange={(newValue) =>
              setValues((prevValues) => ({
                ...prevValues,
                porta: newValue,
              }))
            }
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
                    contacto: user?.contacto || "",
                    morada: user?.morada || "",
                    distrito: user?.distrito || "",
                    concelho: user?.concelho || "",
                    codigo_postal: user?.codigo_postal || "",
                    porta: user?.porta || "",
                  }),
                ]}
              >
                Cancelar
              </button>
            </div>
          ) : (
            <button
              className="bg-[#8B4513] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#6A3210]"
              onClick={() => {
                setValues({
                  contacto: user?.contacto || "",
                  morada: user?.morada || "",
                  distrito: user?.distrito || "",
                  concelho: user?.concelho || "",
                  codigo_postal: user?.codigo_postal || "",
                  porta: user?.porta || "",
                });
                setInputValues(true);
              }}
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
  options,
}: {
  id: string;
  label: string;
  value: string;
  input: boolean;
  onChange?: (newValue: string) => void;
  options?: string[]; // Adiciona suporte para opções de dropdown
}) {
  return (
    <div className="flex justify-between items-center border-b pb-2">
      <span className="font-semibold text-[#8B4513]">{label}:</span>
      {input && options ? (
        <select
          id={id}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 text-[#4A4A4A]"
        >
          <option value="">Selecione</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : input ? (
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
