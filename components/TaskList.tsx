
import React from 'react';
import { Task } from '../types';
import { TrashIcon } from './Icons';

interface TaskListProps {
  tasks: Task[];
  onDeleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDeleteTask }) => {

  const calculateDuration = (start: string, end: string): string => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffMs = endDate.getTime() - startDate.getTime();
    if (isNaN(diffMs) || diffMs < 0) return 'N/A';
    const diffHrs = Math.floor(diffMs / 3600000);
    const diffMins = Math.round((diffMs % 3600000) / 60000);
    return `${diffHrs}h ${diffMins}m`;
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm mt-8 p-6 rounded-xl shadow-lg border border-slate-700">
      <h2 className="text-2xl font-bold mb-4 text-cyan-300">Registro de Tareas</h2>
      <div className="overflow-x-auto">
        {tasks.length === 0 ? (
          <p className="text-slate-400 text-center py-8">No hay tareas para la fecha y filtros seleccionados.</p>
        ) : (
          <table className="min-w-full divide-y divide-slate-700">
            <thead className="bg-slate-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Usuario</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Categoría</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Descripción</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Inicio</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Fin</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Duración</th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Eliminar</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-slate-800/50 divide-y divide-slate-700">
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-200">{task.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-cyan-900 text-cyan-200">
                      {task.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-pre-wrap text-sm text-slate-300 max-w-sm">{task.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">{formatDate(task.startTime)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">{formatDate(task.endTime)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-200">{calculateDuration(task.startTime, task.endTime)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => onDeleteTask(task.id)} className="text-red-400 hover:text-red-300 transition-colors">
                      <TrashIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TaskList;