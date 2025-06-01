"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const countries = [
  { code: "PE", name: "Perú" },
  { code: "CO", name: "Colombia" },
  { code: "MX", name: "México" },
  { code: "AR", name: "Argentina" },
  { code: "CL", name: "Chile" },
  // Agrega más países si deseas
];

export default function SignUpPage() {
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();

  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
    country: "PE",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    if (!isLoaded) return;
    setLoading(true);
    setError("");

    try {
      const result = await signUp.create({
        emailAddress: form.email,
        password: form.password,
        username: form.username,
      });

      await setActive({ session: result.createdSessionId });

      // Crear carpeta y subir imagen por defecto
      await fetch("/api/r2/init-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          country: form.country,
        }),
      });

      router.replace("/");
    } catch (err: any) {
      console.error(err);
      setError(err?.errors?.[0]?.longMessage || "Error al registrarse");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow space-y-4">
        <h1 className="text-xl font-semibold text-center">Crear cuenta</h1>

        <Input
          placeholder="Nombre de usuario"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <Input
          placeholder="Correo electrónico"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <Input
          placeholder="Contraseña"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <select
          value={form.country}
          onChange={(e) => setForm({ ...form, country: e.target.value })}
          className="w-full p-2 border rounded">
          {countries.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name}
            </option>
          ))}
        </select>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <Button onClick={handleSignUp} disabled={loading} className="w-full">
          {loading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="animate-spin h-4 w-4" />
              Registrando...
            </div>
          ) : (
            "Registrarse"
          )}
        </Button>

        <p className="text-sm text-center">
          ¿Ya tienes cuenta?{" "}
          <button
            onClick={() => router.replace("/sign-in")}
            className="text-blue-600 underline">
            Inicia sesión
          </button>
        </p>
      </div>
    </main>
  );
}
