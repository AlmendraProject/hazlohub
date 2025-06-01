"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type PlanOption = {
  name: string;
  price: string;
  description: string;
};

const plans: PlanOption[] = [
  {
    name: "Básico",
    price: "$5/mes",
    description: "Ideal para usuarios ocasionales.",
  },
  {
    name: "Premium",
    price: "$15/mes",
    description: "Acceso completo a todas las funciones.",
  },
];

export default function CheckoutPage() {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<PlanOption | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/sign-in");
    }
  }, [isSignedIn, router]);

  const handleConfirm = async () => {
    if (!selectedPlan) return;

    setIsLoading(true);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        body: JSON.stringify({ planName: selectedPlan.name }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error("No se pudo completar la suscripción.");
      }

      router.push("/subscription"); // o /profile
    } catch (err) {
      alert("Error al procesar la suscripción");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">Elige tu plan</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`p-4 cursor-pointer border-2 ${
              selectedPlan?.name === plan.name
                ? "border-blue-500"
                : "border-gray-200"
            }`}
            onClick={() => setSelectedPlan(plan)}>
            <h2 className="text-xl font-semibold">{plan.name}</h2>
            <p className="text-gray-500">{plan.price}</p>
            <p className="mt-2 text-sm text-gray-600">{plan.description}</p>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button
          disabled={!selectedPlan || isLoading}
          onClick={handleConfirm}
          className="w-full md:w-auto">
          {isLoading ? "Procesando..." : "Confirmar Suscripción"}
        </Button>
      </div>
    </div>
  );
}
