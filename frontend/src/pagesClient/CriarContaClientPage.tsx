import { useState } from "react";
import { MouseEvent } from "react";
import { FormEvent } from "react";
import axios from "axios";

interface CriarContaClientProps {
  onCriarContaClientSuccess: () => void;
}

export default function CriarContaClient({
  onCriarContaClientSuccess,
}: CriarContaClientProps) {
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [emailForm, setEmailForm] = useState("");
  const [nameForm, setNameForm] = useState("");
  const [passwordForm, setPasswordForm] = useState("");

  const [emailExists, setEmailExists] = useState("");

  function validarCampos() {
    let nameError = "";
    let emailError = "";
    let passwordError = "";
    let confirmPasswordError = "";

    const name = (document.getElementById("name") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;
    const confirmPassword = (
      document.getElementById("confirm-password") as HTMLInputElement
    ).value;

    // Validação do nome
    if (!/^[A-Z][a-zA-Z]*(?: [A-Z][a-zA-Z]*)*$/.test(name)) {
      nameError =
        "O nome deve começar com letra maiúscula e pode conter espaços entre os nomes.";
    } else if (name.trim().split(" ").length < 2) {
      nameError = "Por favor, insira pelo menos dois nomes.";
    }

    // Validação do email
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      emailError = "Digite um email válido.";
    }

    // Validação da senha
    if (
      !/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[=)($*=#])[A-Za-z0-9=)($*=#-]{8,}$/.test(
        password
      )
    ) {
      passwordError =
        "A senha deve ter no minimo 8 caracteres e tem de incluir letras, números e caracteres especiais ()-$*=#.";
    }

    // Validação da confirmação da senha
    if (password !== confirmPassword) {
      confirmPasswordError = "As senhas não coincidem.";
    }

    // Se houver algum erro, mostramos as mensagens
    setErrors({
      name: nameError,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });

    // Se não houver erros, o formulário pode ser enviado
    if (!nameError && !emailError && !passwordError && !confirmPasswordError) {
      console.log("Campos válidos, formulário pode ser enviado.");
      setEmailForm(email);
      setNameForm(name);
      setPasswordForm(password);
      return true;
    }
    return false;
  }

  const handleCriarConta = async (e: FormEvent) => {
    e.preventDefault();
    if (validarCampos()) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/criarcontaclient/",
          {
            emailForm,
            passwordForm,
            nameForm,
          }
        );

        const data = response.data;

        // if (response.data.access_token && response.data.refresh_token) {
        //   localStorage.setItem("access_token", response.data.access_token);
        //   localStorage.setItem("refresh_token", response.data.refresh_token);
        // }
        // localStorage.setItem("user_type", user_type);

        if (data.message) {
          onCriarContaClientSuccess();
        } else {
          setEmailExists("O email indicado já existe");
        }
      } catch (err) {
        console.log("ERROR:" + err);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
      <div className="w-full max-w-md bg-[#FFF8DC] border border-[#D2B48C] rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-[#8B4513] mb-2">
            Criar uma nova conta
          </h2>
          <p className="text-[#8B4513] mb-6">
            Junte-se ao ComprasExpress e comece a aproveitar nossos serviços
          </p>
          <form>
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-[#8B4513]"
                >
                  Nome completo
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Seu nome completo"
                  className="w-full px-3 py-2 bg-white border border-[#D2B48C] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C19A6B]"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name}</p>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#8B4513]"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full px-3 py-2 bg-white border border-[#D2B48C] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C19A6B]"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email}</p>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[#8B4513]"
                >
                  Senha
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Escolha uma senha forte"
                  className="w-full px-3 py-2 bg-white border border-[#D2B48C] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C19A6B]"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs">{errors.password}</p>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-[#8B4513]"
                >
                  Confirmar senha
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  placeholder="Repita a senha"
                  className="w-full px-3 py-2 bg-white border border-[#D2B48C] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C19A6B]"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>
            {emailExists && (
              <p className="text-red-500 text-xs">{emailExists}</p>
            )}
            <button
              type="submit"
              className="w-full mt-6 px-4 py-2 bg-[#D2B48C] text-white font-semibold rounded-md hover:bg-[#C19A6B] transition-colors duration-200"
              onClick={handleCriarConta}
            >
              Criar conta
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-[#8B4513] mb-2">Ou crie uma conta com:</p>
            <button className="w-full px-4 py-2 bg-white text-[#4285F4] font-semibold rounded-md border border-[#4285F4] hover:bg-[#4285F4] hover:text-white transition-colors duration-200 flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                />
              </svg>
              Entrar com Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
