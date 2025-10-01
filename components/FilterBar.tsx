import React from 'react';
import { CalendarIcon } from './Icons';
import { User, Category } from '../types';

interface FilterBarProps {
  date: Date;
  onDateChange: (date: Date) => void;
  users: User[];
  userFilter: string;
  onUserFilterChange: (user: string) => void;
  categories: Category[];
  categoryFilter: string;
  onCategoryFilterChange: (category: string) => void;
  durationFilter: string;
  onDurationFilterChange: (duration: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  date,
  onDateChange,
  users,
  userFilter,
  onUserFilterChange,
  categories,
  categoryFilter,
  onCategoryFilterChange,
  durationFilter,
  onDurationFilterChange,
}) => {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    const [year, month, day] = dateValue.split('-').map(Number);
    onDateChange(new Date(year, month - 1, day));
  };
  
  const dateToInputValue = (d: Date) => {
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm mt-8 p-4 rounded-xl shadow-lg border border-slate-700">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div>
          <label htmlFor="date-filter" className="flex items-center text-sm font-medium text-slate-400 mb-1">
            <CalendarIcon className="h-4 w-4 mr-2" />
            Fecha
          </label>
          <input
            id="date-filter"
            type="date"
            value={dateToInputValue(date)}
            onChange={handleDateChange}
            className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
          />
        </div>

        <div>
          <label htmlFor="user-filter" className="block text-sm font-medium text-slate-400 mb-1">Usuario</label>
          <select
            id="user-filter"
            value={userFilter}
            onChange={(e) => onUserFilterChange(e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
          >
            <option value="all">Todos los usuarios</option>
            {users.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="category-filter" className="block text-sm font-medium text-slate-400 mb-1">Categoría</label>
          <select
            id="category-filter"
            value={categoryFilter}
            onChange={(e) => onCategoryFilterChange(e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
          >
            <option value="all">Todas las categorías</option>
            {categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="duration-filter" className="block text-sm font-medium text-slate-400 mb-1">Duración Mínima (min)</label>
          <input
            id="duration-filter"
            type="number"
            value={durationFilter}
            onChange={(e) => onDurationFilterChange(e.target.value)}
            placeholder="Ej: 30"
            min="0"
            className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
          />
        </div>

      </div>
    </div>
  );
};

export default FilterBar;
