import { useState } from "react";
import Formulario from "./Formulario";
import Tarefa from "./Tarefa";

export default function ListaDeTarefas() {
  const [tarefas, setTarefas] = useState<{ id: number; nome: string; concluida: boolean; }[]>(()=>{
    const tarefasLocalStorage = localStorage.getItem("tarefas");
    if (tarefasLocalStorage) {
      return JSON.parse(tarefasLocalStorage);
    }
    return []
  });
  const [proximaId, setProximaId] = useState(1);
  const [filtro, setFiltro] = useState<string>("Todas");

  const adicionarTarefa = (nomeTarefa: string) => {
    const novaTarefa = { id: proximaId, nome: nomeTarefa, concluida: false};
    const tarefasArray = [...tarefas, novaTarefa, ]
    setTarefas(tarefasArray);
    setProximaId(proximaId + 1);

    localStorage.setItem("tarefas", JSON.stringify([...tarefas, novaTarefa]));    
  };

  const checarTarefa = (id: number) => {
    const novasTarefas = tarefas.map((tarefa) => {
      if (tarefa.id === id) {
        return { ...tarefa, concluida: !tarefa.concluida };
      }
      return tarefa;
    });
    setTarefas(novasTarefas);
    localStorage.setItem("tarefas", JSON.stringify(novasTarefas));
  };

  const editarTarefa = (id: number, novoNome: string) => {
    const novasTarefas = tarefas.map((tarefa) => {
      if (tarefa.id === id) {
        return { ...tarefa, nome: novoNome };
      }
      return tarefa;
    });
    setTarefas(novasTarefas);
  };

  const excluirTarefa = (id: number) => {
    const novasTarefas = tarefas.filter((tarefa) => tarefa.id !== id);
    if (novasTarefas.length === 0) {
      localStorage.removeItem("tarefas");
    } else {
      localStorage.setItem("tarefas", JSON.stringify(novasTarefas));
    }
    setTarefas(novasTarefas);
  };

  const filtrarTarefas = (status: string) => {
    setFiltro(status);
  };

  let tarefasFiltradas = tarefas;
  if (filtro === "Concluídas") {
    tarefasFiltradas = tarefas.filter((tarefa) => tarefa.concluida);
  } else if (filtro === "Pendentes") {
    tarefasFiltradas = tarefas.filter((tarefa) => !tarefa.concluida);
  }

  return (
    <div className="container rounded-md bg-blue-950 mt-20 p-8">
      <Formulario adicionarTarefa={adicionarTarefa} />
      <div className="flex justify-center mb-4">
        <input
          type="checkbox"
          id="Todas"
          name="Todas"
          checked={filtro === "Todas" && tarefasFiltradas.length > 0}
          className="mr-1 accent-lime-400"
          onChange={() => filtrarTarefas("Todas")}
        />
        <label htmlFor="Todas" className="mr-4 text-teal-300">
          Todas
        </label>
        <input
          type="checkbox"
          id="Concluídas"
          name="Concluídas"
          checked={filtro === "Concluídas" && tarefasFiltradas.length > 0}
          className="mr-1 accent-lime-400"
          onChange={() => filtrarTarefas("Concluídas")}
        />
        <label htmlFor="Concluídas" className="mr-4 text-teal-300">
          Concluídas
        </label>
        <input
          type="checkbox"
          id="Pendentes"
          name="Pendentes"
          checked={filtro === "Pendentes" && tarefasFiltradas.length > 0}
          className="mr-1 accent-lime-400"
          onChange={() => filtrarTarefas("Pendentes")}
        />
        <label htmlFor="Pendentes" className="mr-4 text-teal-300">
          Pendentes
        </label>
      </div>
      {tarefasFiltradas.map((tarefa) => (
        <Tarefa
          key={tarefa.id}
          tarefa={tarefa}
          checarTarefa={checarTarefa}
          editarTarefa={editarTarefa}
          excluirTarefa={excluirTarefa}
        />
      ))}
    </div>
  );
}
