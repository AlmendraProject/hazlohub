"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, Crown, Eye, Shield, Star, Users, Zap } from "lucide-react";
import CreatePostButton from "../components/CreatePostButton";

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  popular?: boolean;
  features: string[];
  icon: React.ReactNode;
  color: string;
}

const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "basic",
    name: "Premium Básico",
    price: 5,
    duration: "1 día",
    features: [
      "Perfil destacado por 24 horas",
      "Ver quién visitó tu perfil",
      "Badge de usuario verificado",
      "Soporte prioritario",
    ],
    icon: <Zap className="h-6 w-6" />,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "pro",
    name: "Premium Pro",
    price: 15,
    duration: "1 semana",
    popular: true,
    features: [
      "Perfil destacado por 7 días",
      "Ver quién visitó tu perfil",
      "Aparecer en recomendados",
      "Badge de usuario confiable",
      "Estadísticas detalladas",
      "Soporte prioritario 24/7",
    ],
    icon: <Crown className="h-6 w-6" />,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "elite",
    name: "Premium Elite",
    price: 32,
    duration: "1 mes",
    features: [
      "Perfil destacado por 30 días",
      "Ver quién visitó tu perfil",
      "Aparecer en recomendados",
      "Badge de usuario VIP",
      "Estadísticas avanzadas",
      "Funciones exclusivas",
      "Soporte dedicado",
      "Acceso anticipado a nuevas funciones",
    ],
    icon: <Star className="h-6 w-6" />,
    color: "from-yellow-500 to-orange-500",
  },
];

export default function SubscriptionStore() {
  const handlePurchase = (planId: string, planName: string) => {
    // Aquí implementarías la lógica de compra
    console.log(`Comprando plan: ${planName} (${planId})`);
    alert(`Redirigiendo al pago para ${planName}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Crown className="h-12 w-12 text-yellow-500 mr-3" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Planes Premium
            </h1>
          </div>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Destaca tu perfil y accede a funciones exclusivas. Conviértete en un
            usuario confiable y recomendado.
          </p>
        </div>

        {/* Subscription Plans */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {subscriptionPlans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                plan.popular ? "ring-2 ring-purple-500 shadow-xl" : ""
              }`}>
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center py-2 text-sm font-semibold">
                    ⭐ MÁS POPULAR ⭐
                  </div>
                </div>
              )}

              <CardHeader
                className={`bg-gradient-to-r ${plan.color} text-white ${
                  plan.popular ? "pt-12" : "pt-6"
                }`}>
                <div className="flex items-center justify-center mb-4">
                  {plan.icon}
                </div>
                <CardTitle className="text-2xl font-bold text-center">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-center text-white/90">
                  Acceso premium por {plan.duration}
                </CardDescription>
                <div className="text-center mt-4">
                  <span className="text-4xl font-bold">S/ {plan.price}</span>
                  <span className="text-white/80 ml-2">PEN</span>
                </div>
              </CardHeader>

              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 text-white font-semibold py-3`}
                  onClick={() => handlePurchase(plan.id, plan.name)}>
                  Comprar Ahora
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-slate-800">
            ¿Por qué elegir Premium?
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Eye className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Visibilidad Total</h3>
              <p className="text-slate-600 text-sm">
                Ve quién visita tu perfil y obtén insights valiosos
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Recomendado</h3>
              <p className="text-slate-600 text-sm">
                Aparece en la sección de usuarios recomendados
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Confiable</h3>
              <p className="text-slate-600 text-sm">
                Badge de usuario verificado y confiable
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="font-semibold mb-2">Destacado</h3>
              <p className="text-slate-600 text-sm">
                Tu perfil aparece destacado para más usuarios
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-slate-800 text-white rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            Preguntas Frecuentes
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-2">
                ¿Cómo funciona la suscripción?
              </h3>
              <p className="text-slate-300 text-sm">
                Una vez que compres tu plan, las funciones premium se activan
                inmediatamente y duran el tiempo especificado.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">¿Puedo cambiar de plan?</h3>
              <p className="text-slate-300 text-sm">
                Sí, puedes actualizar tu plan en cualquier momento. El tiempo
                restante se ajustará automáticamente.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                ¿Qué métodos de pago aceptan?
              </h3>
              <p className="text-slate-300 text-sm">
                Aceptamos tarjetas de crédito, débito, transferencias bancarias
                y billeteras digitales.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                ¿Hay renovación automática?
              </h3>
              <p className="text-slate-300 text-sm">
                No, nuestros planes son de pago único. Puedes renovar
                manualmente cuando expire tu suscripción.
              </p>
            </div>
          </div>
        </div>
      </div>
      <CreatePostButton />
    </div>
  );
}
