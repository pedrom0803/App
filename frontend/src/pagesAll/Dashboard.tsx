import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      window.location.href = "/login"; // Redirecionar para o login se não houver token
      return;
    }

    // Verificar se o token é válido
    axios
      .get("http://localhost:8000/api/protected-endpoint/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch(() => {
        window.location.href = "/login"; // Redirecionar se o token for inválido
      });
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Welcome!</h1>
    </div>
  );
};

export default Dashboard;
