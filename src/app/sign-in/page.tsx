"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useSignIn } from "@clerk/nextjs";
import { motion } from "framer-motion";
import i18n from "i18next";
import { AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { initReactI18next, useTranslation } from "react-i18next";

// Interface for ipapi.co response
interface IpApiResponse {
  country_code: string;
  // Add other fields if needed, e.g.:
  // city: string;
  // country_name: string;
}

// Configuración de traducciones
const resources = {
  es: {
    translation: {
      welcome: "¡Bienvenido!",
      loginSuccess:
        "¡Has iniciado sesión exitosamente! Redirigiendo al inicio...",
      loginTitle: "Iniciar Sesión",
      loginSubtitle: "Ingresa tus credenciales para acceder",
      emailPlaceholder: "Correo electrónico",
      passwordPlaceholder: "Contraseña",
      loginButton: "Iniciar Sesión",
      loggingIn: "Iniciando sesión...",
      noAccount: "¿No tienes cuenta? Regístrate",
      forgotPassword: "¿Olvidaste tu correo o contraseña?",
      errorTitle: "Error",
      genericError: "Error al iniciar sesión",
      invalidCredentials: "El correo o la contraseña son incorrectos",
      tooManyAttempts: "Demasiados intentos, intenta de nuevo más tarde",
    },
  },
  en: {
    translation: {
      welcome: "Welcome!",
      loginSuccess: "You have successfully logged in! Redirecting to home...",
      loginTitle: "Sign In",
      loginSubtitle: "Enter your credentials to access",
      emailPlaceholder: "Email",
      passwordPlaceholder: "Password",
      loginButton: "Sign In",
      loggingIn: "Signing in...",
      noAccount: "Don't have an account? Sign up",
      forgotPassword: "Forgot your email or password?",
      errorTitle: "Error",
      genericError: "Error signing in",
      invalidCredentials: "The email or password is incorrect",
      tooManyAttempts: "Too many attempts, please try again later",
    },
  },
};

// Inicializar i18next
i18n.use(initReactI18next).init({
  resources,
  lng: "es", // Idioma por defecto: español
  fallbackLng: "es",
  interpolation: { escapeValue: false },
});

export default function SignInPage() {
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();
  const { t, i18n } = useTranslation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña

  // Detectar país
  useEffect(() => {
    const detectCountry = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = (await response.json()) as IpApiResponse; // Type assertion
        const country = data.country_code;

        // Lista de países de América Latina (códigos ISO)
        const latinAmericaCountries = [
          "AR",
          "BO",
          "BR",
          "CL",
          "CO",
          "CR",
          "CU",
          "DO",
          "EC",
          "SV",
          "GT",
          "HN",
          "MX",
          "NI",
          "PA",
          "PY",
          "PE",
          "PR",
          "UY",
          "VE",
        ];

        // Si el país está en América Latina, usar español; si no, inglés
        const language = latinAmericaCountries.includes(country) ? "es" : "en";
        i18n.changeLanguage(language);
      } catch (err) {
        console.error("Error detecting country:", err);
        i18n.changeLanguage("es"); // Fallback a español
      }
    };

    detectCountry();
  }, [i18n]);

  const handleSignIn = async () => {
    if (!isLoaded) return;
    setLoading(true);
    setError("");

    try {
      const result = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        setShowSuccessModal(true);

        setTimeout(() => {
          setShowSuccessModal(false);
          router.replace("/");
        }, 3000);
      }
    } catch (err: any) {
      const errorMessage =
        err?.errors?.[0]?.code === "form_identifier_not_found" ||
        err?.errors?.[0]?.code === "form_password_incorrect"
          ? t("invalidCredentials")
          : err?.errors?.[0]?.code === "too_many_attempts"
          ? t("tooManyAttempts")
          : t("genericError");
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-xl">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            {t("loginTitle")}
          </h1>
          <p className="mt-2 text-sm text-gray-600">{t("loginSubtitle")}</p>
        </div>

        {/* Form Section */}
        <div className="space-y-4">
          <Input
            placeholder={t("emailPlaceholder")}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            type="email"
            className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all"
          />

          {/* Campo de contraseña con botón de ojito */}
          <div className="relative">
            <Input
              placeholder={t("passwordPlaceholder")}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              type={showPassword ? "text" : "password"}
              className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              aria-label={
                showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
              }>
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Error Alert */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}>
              <Alert variant="destructive" className="bg-red-50 border-red-200">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertTitle>{t("errorTitle")}</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}

          <Button
            onClick={handleSignIn}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200">
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin h-4 w-4" />
                {t("loggingIn")}
              </div>
            ) : (
              t("loginButton")
            )}
          </Button>

          <Separator className="bg-gray-200" />

          {/* Additional Actions */}
          <div className="flex flex-col items-center gap-3">
            <Button
              variant="outline"
              onClick={() => router.replace("/sign-up")}
              className="w-full rounded-lg border-gray-300 hover:bg-gray-100 transition-all">
              {t("noAccount")}
            </Button>

            <button
              onClick={() => router.replace("/forgot")}
              className="text-sm text-blue-600 hover:text-blue-800 underline transition-colors">
              {t("forgotPassword")}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Success Modal */}
      <AlertDialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <AlertDialogContent className="rounded-lg">
          <AlertDialogTitle className="text-green-600">
            {t("welcome")}
          </AlertDialogTitle>
          <AlertDialogDescription>{t("loginSuccess")}</AlertDialogDescription>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
