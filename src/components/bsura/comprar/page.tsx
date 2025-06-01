"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  TypographyH1,
  TypographyH2,
  TypographyP,
} from "@/components/ui/typography";
import Link from "next/link";

export default function ComprarCurso() {
  return (
    <main className="min-h-screen bg-white text-gray-800 p-8">
      <section className="max-w-4xl mx-auto text-center">
        <TypographyH1 className="mb-4 text-blue-800">
          Aprende a Crear y Desplegar tu Propia Página Web
        </TypographyH1>
        <TypographyP className="text-lg mb-6">
          Curso completo paso a paso: desde el desglose en TypeScript hasta el
          despliegue con Vercel y configuración de dominio con Cloudflare.
        </TypographyP>
        <TypographyP className="mb-6 text-gray-700">
          Enseñamos cómo usar herramientas modernas como ChatGPT, Vercel, Git,
          GitHub y tecnologías como TypeScript para crear tu propia web
          profesional.
        </TypographyP>

        <div className="mb-8 rounded-xl shadow-lg overflow-hidden">
          <AspectRatio ratio={16 / 9}>
            <iframe
              src=""
              title="Introducción al curso"
              allowFullScreen
              className="rounded-xl"
            />
          </AspectRatio>
        </div>

        <div className="flex justify-center gap-4">
          <Link href="/comprar" passHref>
            <Button asChild>
              <a>Comprar Curso Ahora</a>
            </Button>
          </Link>
          <Link href="/temario" passHref>
            <Button variant="outline" asChild>
              <a>Ver Contenido del Curso</a>
            </Button>
          </Link>
        </div>
      </section>

      <section className="mt-16 max-w-3xl mx-auto text-left">
        <TypographyH2 className="mb-4">¿Qué aprenderás?</TypographyH2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Fundamentos de TypeScript para la web moderna.</li>
          <li>
            Cómo desglosar y planificar tu página web con una estructura clara.
          </li>
          <li>Uso de ChatGPT para generar código y resolver dudas técnicas.</li>
          <li>Configuración y despliegue con Vercel.</li>
          <li>Conexión con tu dominio a través de Cloudflare.</li>
          <li>
            Uso de Git y GitHub para control de versiones y trabajo en equipo.
          </li>
          <li>Buenas prácticas y recomendaciones para producción.</li>
        </ul>
      </section>

      <section className="mt-16 max-w-3xl mx-auto text-left">
        <TypographyH2 className="mb-4">¿A quién va dirigido?</TypographyH2>
        <TypographyP className="text-gray-700">
          A emprendedores, desarrolladores principiantes, freelancers y
          cualquier persona que quiera aprender a crear páginas web de forma
          profesional y moderna, sin depender de terceros.
        </TypographyP>
      </section>

      <section className="mt-16 max-w-4xl mx-auto text-center">
        <TypographyH2 className="mb-6">Planes disponibles</TypographyH2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Plan Básico</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Incluye fundamentos de TypeScript, uso de ChatGPT y despliegue
                básico en Vercel.
              </CardDescription>
              <p className="text-2xl font-bold text-blue-700 mt-4">S/ 80</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Plan Intermedio</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Todo lo del básico + Git, GitHub, planificación avanzada y
                conexión con dominio.
              </CardDescription>
              <p className="text-2xl font-bold text-blue-700 mt-4">S/ 120</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Plan Premium</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Incluye todo lo anterior + soporte personalizado, revisión de
                proyectos y certificado.
              </CardDescription>
              <p className="text-2xl font-bold text-blue-700 mt-4">S/ 180</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="mt-20 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} comprar.tudominio.com — Todos los derechos
        reservados.
      </footer>
    </main>
  );
}
