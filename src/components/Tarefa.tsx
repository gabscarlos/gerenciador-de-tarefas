import {
  IconCheck,
  IconCheckbox,
  IconEdit,
  IconSquare,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import { useState } from "react";

interface TarefaProps {
  tarefa: {
    id: number;
    nome: string;
    concluida: boolean;
  };
  checarTarefa: (id: number) => void;
  editarTarefa: (id: number, novoNome: string) => void;
  excluirTarefa: (id: number) => void;
}

export default function Tarefa(props: TarefaProps) {
  const { tarefa, checarTarefa, editarTarefa, excluirTarefa } = props;
  const [estaChecado, setEstaChecado] = useState(tarefa.concluida);
  const [editando, setEditando] = useState(false);
  const [novoNome, setNovoNome] = useState(tarefa.nome);

  const handleChecar = () => {
    setEstaChecado(!estaChecado);
    checarTarefa(tarefa.id);
  };

  const renderTextoConcluida = () => {
    if (tarefa.concluida) {
      return "(Concluída)";
    } else {
      return "";
    }
  };

  const handleEditar = () => {
    setEditando(true);
    setNovoNome(tarefa.nome);
  };

  const salvarEdicao = () => {
    editarTarefa(tarefa.id, novoNome);
    setEditando(false);
  };

  const cancelarEdicao = () => {
    setEditando(false);
    setNovoNome(tarefa.nome);
  };

  const handleExcluir = () => {
    excluirTarefa(tarefa.id);
  };

  return (
    <div className="flex justify-between items-center bg-cyan-700 text-white p-3 px-4 rounded-md mb-1 cursor-pointer">
      {editando ? (
        <>
          <input
            className="flex outline-none bg-transparent border-none text-white w-96"
            type="text"
            value={novoNome}
            onChange={(e) => setNovoNome(e.target.value)}
            autoFocus
          />
          <div className="flex justify-between">
            <IconCheck className="hover:text-lime-400" onClick={salvarEdicao} />
            <IconX className="hover:text-red-400" onClick={cancelarEdicao} />
          </div>
        </>
      ) : (
        <>
          <p>
            {tarefa.nome} {renderTextoConcluida()}
          </p>
          <div className="flex items-center gap-x-4">
            {estaChecado ? (
              <IconCheckbox
                className="text-xs text-lime-400"
                onClick={handleChecar}
              />
            ) : (
              <IconSquare className="text-xs hover:text-lime-400" onClick={handleChecar} />
            )}
            <IconEdit className="text-xs hover:text-teal-400" onClick={handleEditar} />
            <IconTrash className="text-xs hover:text-red-400" onClick={handleExcluir} />
          </div>
        </>
      )}
    </div>
  );
}
