import React, { useState } from "react";

export default function Formulario({ adicionarTarefa }: { adicionarTarefa: (tarefa: string) => void }) {
  const [tarefa, setTarefa] = useState("");
  const [inputVazio, setInputVazio] = useState(false);

  function criaTarefas(novaTarefa: string) {
    adicionarTarefa(novaTarefa);
  }

  function enviarTarefa(e: React.FormEvent) {
    e.preventDefault();
    if (tarefa.trim() === "") {
      setInputVazio(true)
    } else {
      setInputVazio(false)
      criaTarefas(tarefa);
      setTarefa("");
    }
  }

  return (
    <form name="formulario" className="flex flex-col items-center mb-8 w-full" onSubmit={enviarTarefa}>
      <input
        type="text"
        className={`outline-none bg-transparent border 
                  ${inputVazio ? "border-red-500" : "border-lime-400"} 
                  p-4 w-[400px] text-white text-center mb-4 placeholder:text-gray-300`}
        placeholder="Qual tarefa você deseja adicionar?"
        onChange={(e) => setTarefa(e.target.value)}
        value={tarefa}
        name="tarefa"
      />
      <button
        className="bg-lime-500 hover:bg-lime-600 border-none p-2 text-white font-bold cursor-pointer rounded ml-2"
        type="submit"
      >
        Adicionar Tarefa
      </button>
    </form>
  );
}
