import React, { useState, MouseEvent } from "react";
import emailjs from "emailjs-com";

export default function SendEmail() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    contacto: "",
    mensagem: "",
  });

  function validarCampos() {
    let nameError = "";
    let emailError = "";
    let contactoError = "";
    let mensagemError = "";

    if (!/^[A-Z][a-zA-Z]*(?: [A-Z][a-zA-Z]*)*$/.test(name)) {
      nameError =
        "O nome deve começar com letra maiúscula e pode conter espaços entre os nomes.";
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      emailError = "Digite um email válido.";
    }
    if (!/^(9[1236]\d{7}|2\d{8})$/.test(contact)) {
      contactoError = "O número de contacto deve ser português válido.";
    }
    if (message.length < 20) {
      mensagemError = "São necessários no mínimo 20 caracteres.";
    }

    setErrors({
      name: nameError,
      email: emailError,
      contacto: contactoError,
      mensagem: mensagemError,
    });

    return !nameError && !emailError && !contactoError && !mensagemError;
  }

  const sendEmail = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validarCampos()) {
      emailjs
        .send(
          "service_uehni3l",
          "template_wl7t577",
          {
            name,
            contact,
            email,
            message,
          },
          "ruNoylQE7RRF6Vrey"
        )
        .then(() => alert("Email enviado com sucesso!"))
        .catch((error) => alert("Erro ao enviar o email: " + error.text));
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-8 bg-[#FFF8DC] border border-[#D2B48C] rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-[#8B4513] mb-4">
        Entre em Contato
      </h2>
      {/* Campos do formulário */}
      <div className="w-full">
        <input
          id="name"
          type="text"
          placeholder="Nome"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#C19A6B]"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name}</p>
        )}
      </div>
      <div className="w-full">
        <input
          id="contacto"
          type="text"
          placeholder="Contacto"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#C19A6B]"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        {errors.contacto && (
          <p className="text-red-500 text-xs mt-1">{errors.contacto}</p>
        )}
      </div>
      <div className="w-full">
        <input
          id="email"
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#C19A6B]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
      </div>
      <div className="w-full">
        <textarea
          id="mensagem"
          placeholder="Mensagem"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#C19A6B]"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {errors.mensagem && (
          <p className="text-red-500 text-xs mt-1">{errors.mensagem}</p>
        )}
      </div>
      <button
        onClick={sendEmail}
        className="px-6 py-2 bg-[#D2B48C] text-white font-semibold rounded-md hover:bg-[#C19A6B] transition duration-200"
      >
        Enviar
      </button>
    </div>
  );
}
