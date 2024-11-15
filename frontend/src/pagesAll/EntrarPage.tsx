import React, { useState } from "react";
import { FormEvent } from "react";
import axios from "axios";

interface EntrarPageProps {
  onLoginSuccess: () => void;
}

export default function EntrarPage({ onLoginSuccess }: EntrarPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/login/", {
        email,
        password,
      });

      const { user_type } = response.data;

      if (response.data.access_token && response.data.refresh_token) {
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
      }
      localStorage.setItem("user_type", user_type);

      onLoginSuccess();
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
              className="w-full mt-6 px-4 py-2 bg-[#D2B48C] text-white text-lg font-semibold rounded-lg hover:bg-[#C19A6B]"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
