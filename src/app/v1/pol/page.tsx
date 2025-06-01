"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

interface Question {
  id: number;
  text: string;
}

const MAX_FREE_QUESTIONS = 10;

const TrainingView: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionInput, setQuestionInput] = useState("");

  const handleAddQuestion = () => {
    if (!questionInput.trim() || questions.length >= MAX_FREE_QUESTIONS) return;

    const newQuestion: Question = {
      id: Date.now(),
      text: questionInput.trim(),
    };

    setQuestions([...questions, newQuestion]);
    setQuestionInput("");
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Entrenamiento AI</CardTitle>
        </CardHeader>
        <CardContent>
          {questions.length < MAX_FREE_QUESTIONS ? (
            <>
              <div className="mb-3">
                <p className="text-sm text-muted-foreground">
                  Preguntas disponibles:{" "}
                  <Badge variant="outline">
                    {MAX_FREE_QUESTIONS - questions.length} restantes
                  </Badge>
                </p>
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Escribe tu pregunta..."
                  value={questionInput}
                  onChange={(e) => setQuestionInput(e.target.value)}
                />
                <Button onClick={handleAddQuestion}>Enviar</Button>
              </div>
            </>
          ) : (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Límite alcanzado</AlertTitle>
              <AlertDescription>
                Has usado tus 10 preguntas gratuitas. Para continuar, actualiza
                a premium.
              </AlertDescription>
            </Alert>
          )}

          {questions.length >= MAX_FREE_QUESTIONS && (
            <div className="space-y-3 mt-4">
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Pagar ahora
              </Button>
              <Card className="bg-yellow-50 border-yellow-300">
                <CardContent className="p-3 text-sm text-yellow-800">
                  ¡Los usuarios premium reciben respuestas más rápidas y
                  preguntas ilimitadas!
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>

      {questions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Historial de preguntas</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {questions.map((q) => (
                <li key={q.id}>{q.text}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TrainingView;
