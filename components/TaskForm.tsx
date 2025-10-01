import React, { useState, useEffect } from 'react';
import { PlusIcon } from './Icons';
import { User, Category } from '../types';

interface TaskFormProps {
  users: User[];
  categories: Category[];
  onAddTask: (task: { user: string, category: string, description: string, duration: number }) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ users, categories, onAddTask }) => {
  const [user, setUser] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(''); // duration in minutes
  const [error, setError] = useState('');

  useEffect(() => {
    if (users.length > 0 && !users.find(u => u.name === user)) {
      setUser(users[0].name);
    } else if (users.length === 0) {
      setUser('');
    }
  }, [users, user]);

  useEffect(() => {
    if (categories.length > 0 && !categories.find(c => c.name === category)) {
      setCategory(categories[0].name);
    } else if (categories.length === 0) {
      setCategory('');
    }
  }, [categories, category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const durationNum = parseInt(duration, 10);
    if (!user || !category || !description || !duration) {
      setError('Todos los campos son obligatorios.');
      return;
    }
    if (isNaN(durationNum) || durationNum <= 0) {
      setError('La duración debe ser un número positivo de minutos.');
      return;
    }
    
    onAddTask({ user, category, description, duration: durationNum });
    
    setCategory(categories.length > 0 ? categories[0].name : '');
    setDescription('');
    setDuration('');
    setError('');
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-slate-700">
      <h2 className="text-2xl font-bold mb-4 text-cyan-300">Añadir Nueva Tarea</h2>
      {error && <p className="bg-red-500/20 text-red-300 p-3 rounded-md mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div>
          <label htmlFor="user" className="block text-sm font-medium text-slate-400 mb-1">Usuario</label>
          <select
            id="user"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={users.length === 0}
          >
            {users.length === 0 
              ? <option>Primero añade un usuario</option> 
              : users.map((u) => (<option key={u.id} value={u.name}>{u.name}</option>))
            }
          </select>
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-slate-400 mb-1">Categoría de Tarea</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={categories.length === 0}
          >
            {categories.length === 0 
              ? <option>Primero añade una categoría</option> 
              : categories.map((cat) => (<option key={cat.id} value={cat.name}>{cat.name}</option>))
            }
          </select>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-slate-400 mb-1">Descripción / Incidencia</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Detalla lo sucedido en la tarea o incidencia..."
            rows={3}
            className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
          ></textarea>
        </div>
        
        <div className="md:col-span-2">
          <label htmlFor="duration" className="block text-sm font-medium text-slate-400 mb-1">Duración (minutos)</label>
          <input
            id="duration"
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Ej: 60"
            min="1"
            className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
          />
        </div>
        
        <div className="md:col-span-2">
          <button type="submit" className="w-full flex items-center justify-center bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed" disabled={users.length === 0 || categories.length === 0}>
            <PlusIcon className="h-5 w-5 mr-2" />
            Añadir Tarea
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
