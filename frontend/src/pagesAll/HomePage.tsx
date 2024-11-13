import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InfoPage from "./InfoPage";
import EntrarPage from "./EntrarPage";
import CriarConta from "./CriarConta";
import Pacotes from "../pagesClient/PacotesPage";
import AccountClient from "../pagesClient/AccountClient";
import Cadastrar from "../pagesDrivers/CadastrarPage";
import AccountDriver from "../pagesDrivers/AccountDriverPage";
import {
  ShoppingBag,
  Home,
  Package,
  Info,
  ArrowRight,
  Car,
  Clock4,
  HandHelping,
  LogIn,
  User,
} from "lucide-react";

export default function HomePage() {
  const [selectedSection, setSelectedSection] = useState("home");

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [typeUser, setTypeUser] = useState<string | null>(null);

  const navigate = useNavigate();

  const Footer = () => (
    <footer className="bg-[#D2B48C] p-4 text-center text-white text-sm">
      <p>
        © {new Date().getFullYear()} ComprasExpress. Todos os direitos
        reservados.
      </p>
    </footer>
  );

  useEffect(() => {
    // Verifica se o usuário já está autenticado
    const token = localStorage.getItem("access_token");
    const userType = localStorage.getItem("user_type");

    if (token) {
      setIsAuthenticated(true);
      setTypeUser(userType);
    }
  }, []);

  const renderContent = () => {
    switch (selectedSection) {
      case "home":
        return renderHome();
      case "iniciarConta":
        return <CriarConta />;
      case "pacotes":
        return <Pacotes />;
      case "cadastrar":
        return <Cadastrar />;
      case "sobreNos":
        return <InfoPage />;
      case "login":
        return renderIniciarConta();
      case "conta":
        return typeUser === "cliente" ? <AccountClient /> : <AccountDriver />;
      default:
        return null;
    }
  };

  const renderHome = () => {
    return (
      <div className="space-y-8">
        <h1 className="text-4xl font-bold mb-8 text-[#8B4513] border-b-2 border-[#D2B48C] pb-4">
          Bem-vindo ao Serviço de Entrega de Compras
        </h1>

        <div className="bg-[#FFF8DC] border border-[#D2B48C] rounded-lg shadow-md overflow-hidden">
          <div className="bg-[#D2B48C] p-4">
            <h2 className="text-white text-xl font-semibold flex items-center">
              <ShoppingBag className="mr-2 h-6 w-6" />
              Nossos Serviços
            </h2>
          </div>
          <div className="p-6">
            <p className="text-[#8B4513] mb-4 text-lg">
              Oferecemos um serviço de entrega de compras conveniente e
              confiável para nossos assinantes. Com nossa plataforma, você pode:
            </p>
            <ul className="list-none space-y-2 text-[#8B4513]">
              {[
                "Fazer pedidos de compras facilmente",
                "Escolher entre uma variedade de produtos frescos e de qualidade",
                "Receber suas compras no conforto da sua casa",
                "Economizar tempo e evitar filas nos supermercados",
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <ArrowRight className="mr-2 h-4 w-4 text-[#D2B48C]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-[#FFF8DC] border border-[#D2B48C] rounded-lg shadow-md overflow-hidden">
          <div className="bg-[#D2B48C] p-4">
            <h2 className="text-white text-xl font-semibold flex items-center">
              <Info className="mr-2 h-6 w-6" />
              Como Funciona
            </h2>
          </div>
          <div className="p-6">
            <div className="flex justify-between items-center">
              {[
                { icon: ShoppingBag, text: "Fazer pedido de compras" },
                { icon: Clock4, text: "Esperar o pedido" },
                { icon: HandHelping, text: "Receber o pedido" },
              ].map((step, index) => (
                <React.Fragment key={index}>
                  <div className="flex flex-col items-center">
                    <div className="bg-[#D2B48C] rounded-full p-4 mb-2">
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <p className="text-[#8B4513] text-center font-medium">
                      {step.text}
                    </p>
                  </div>
                  {index < 2 && (
                    <ArrowRight className="h-8 w-8 text-[#D2B48C]" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button className="px-8 py-4 bg-[#D2B48C] text-white text-lg font-semibold rounded-full hover:bg-[#C19A6B] flex items-center justify-center mx-auto transition-colors duration-200 shadow-lg">
            Fazer Pedido <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    );
  };

  const renderIniciarConta = () => {
    return (
      <div>
        <EntrarPage
          onLoginSuccess={() => [
            setIsAuthenticated(true),
            setSelectedSection("conta"),
          ]}
        />
        <p className="text-sm text-center mt-4 text-[#8B4513]">
          Não tem uma conta?{" "}
          <a
            href="#"
            className="text-[#C19A6B] font-semibold"
            onClick={() => setSelectedSection("iniciarConta")}
          >
            Crie uma agora
          </a>
        </p>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-[#F5E6D3]">
      <div className="flex flex-1">
        <aside className="w-64 bg-[#D2B48C] p-6 shadow-lg">
          <div className="mb-8">
            <ShoppingBag className="h-10 w-10 text-white" />
            <h2
              className="mt-2 text-xl font-bold text-white cursor-pointer"
              onClick={() => setSelectedSection("home")}
            >
              ComprasExpress
            </h2>
          </div>
          <nav className="space-y-4">
            <button
              onClick={() => setSelectedSection("home")}
              className={`w-full flex items-center justify-start p-3 text-white rounded-lg transition-colors duration-200 ${
                selectedSection === "home"
                  ? "bg-[#C19A6B] shadow-lg"
                  : "hover:bg-[#C19A6B]"
              }`}
            >
              <Home className="mr-3 h-5 w-5" />
              Home
            </button>
            {!isAuthenticated ? (
              <button
                onClick={() => setSelectedSection("login")}
                className={`w-full flex items-center justify-start p-3 text-white rounded-lg transition-colors duration-200 ${
                  selectedSection === "login"
                    ? "bg-[#C19A6B] shadow-lg"
                    : "hover:bg-[#C19A6B]"
                }`}
              >
                <LogIn className="mr-3 h-5 w-5" />
                Entrar
              </button>
            ) : (
              <button
                onClick={() => setSelectedSection("conta")}
                className={`w-full flex items-center justify-start p-3 text-white rounded-lg transition-colors duration-200 ${
                  selectedSection === "conta"
                    ? "bg-[#C19A6B] shadow-lg"
                    : "hover:bg-[#C19A6B]"
                }`}
              >
                <User className="mr-3 h-5 w-5" />
                Conta
              </button>
            )}

            <button
              onClick={() => setSelectedSection("pacotes")}
              className={`w-full flex items-center justify-start p-3 text-white rounded-lg transition-colors duration-200 ${
                selectedSection === "pacotes"
                  ? "bg-[#C19A6B] shadow-lg"
                  : "hover:bg-[#C19A6B]"
              }`}
            >
              <Package className="mr-3 h-5 w-5" />
              Pacotes
            </button>
            <button
              onClick={() => setSelectedSection("cadastrar")}
              className={`w-full flex items-center justify-start p-3 text-white rounded-lg transition-colors duration-200 ${
                selectedSection === "cadastrar"
                  ? "bg-[#C19A6B] shadow-lg"
                  : "hover:bg-[#C19A6B]"
              }`}
            >
              <Car className="mr-3 h-5 w-5" />
              Cadastrar
            </button>
            <button
              onClick={() => setSelectedSection("sobreNos")}
              className={`w-full flex items-center justify-start p-3 text-white rounded-lg transition-colors duration-200 ${
                selectedSection === "sobreNos"
                  ? "bg-[#C19A6B] shadow-lg"
                  : "hover:bg-[#C19A6B]"
              }`}
            >
              <Info className="mr-3 h-5 w-5" />
              Sobre Nós
            </button>
          </nav>
        </aside>

        <main className="flex-1 p-8 overflow-auto bg-white rounded-l-3xl shadow-xl">
          {renderContent()}
        </main>
      </div>
      <Footer />
    </div>
  );
}
