import React, { useState } from "react";
import axios from "axios";

import { FormEvent } from "react";

export default function EntrarPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/token/", {
        email,
        password,
      });
      // Salvar o token JWT no localStorage ou no estado
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      // Redirecionar ou realizar outra ação após o login
      // window.location.href = "/dashboard"; // Exemplo
    } catch (err) {
      setError("Credenciais inválidas");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
      <div className="w-full max-w-md bg-[#FFF8DC] border border-[#D2B48C] rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-[#8B4513] mb-2">Log In</h2>
          <p className="text-[#8B4513] mb-6">
            Faça login para acessar sua conta ComprasExpress
          </p>
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
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
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
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
                  className="w-full px-3 py-2 bg-white border border-[#D2B48C] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C19A6B]"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            {error && <p>{error}</p>}
            <button
              type="submit"
              className="w-full mt-6 px-4 py-2 bg-[#D2B48C] text-white font-semibold rounded-md hover:bg-[#C19A6B] transition-colors duration-200"
            >
              Entrar
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-[#8B4513] mb-2">Ou entre com:</p>
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
