"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(""); // limpia errores anteriores

    if (!username || !password) {
      setErrorMsg("Por favor, ingresa tus credenciales.");
      return;
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setErrorMsg("Credenciales incorrectas.");
        return;
      }

      localStorage.setItem("usuario_id", data.usuario_id);

      if (data.rol === "A") {
        router.push("/ui/dashboard");
      } else if (data.rol === "G") {
        router.push("/ui/GraduateDashboard");
      } else {
        setErrorMsg("Rol desconocido. Contacte al administrador.");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setErrorMsg("Error en el servidor. Intente más tarde.");
    }
  };


  return (
    <div className="relative min-h-screen bg-gradient-to-tr from-gray-950 to-gray-800 text-white overflow-hidden flex flex-col">
      {/* Círculos decorativos */}
      <div className="absolute bottom-[-150px] left-[-100px] w-[400px] h-[400px] bg-purple-700 opacity-30 blur-3xl rounded-full z-0 animate-float-blob" />
      <div className="absolute top-[-100px] right-[-80px] w-[300px] h-[300px] bg-indigo-500 opacity-25 blur-3xl rounded-full z-0 animate-float-blob" />

      {/* Tarjeta de login */}
      <div className="relative z-10 w-full max-w-md bg-white/10 border border-white/20 backdrop-blur-xl drop-shadow-2xl rounded-2xl p-8 space-y-6 mx-auto my-auto">
        <h2 className="text-3xl font-bold text-center">Iniciar Sesión</h2>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label htmlFor="username" className="block mb-1 text-sm font-medium text-gray-300">
              Usuario
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-300">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

            {errorMsg && (
            <p className="text-cyan-500 text-sm font-semibold">{errorMsg}</p>
          )}

          <button
            type="submit"
            className="mt-6 sm:mt-8 flex w-full items-center justify-center bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-500 text-white px-6 py-3 rounded-lg hover:brightness-110 transition-all duration-300 gap-2"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}


