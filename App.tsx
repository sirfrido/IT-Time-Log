import React, { useState, useMemo, useEffect } from 'react';
import { Task, Category, User } from './types';
import * as cloudStorage from './services/cloudStorage';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import CategoryManager from './components/CategoryManager';
import UserManager from './components/UserManager';
import FilterBar from './components/FilterBar';
import { DownloadIcon, CogIcon, UsersIcon } from './components/Icons';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  // Filters State
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [userFilter, setUserFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [durationFilter, setDurationFilter] = useState('');

  useEffect(() => {
    // Set up real-time listeners for all collections
    const unsubscribeTasks = cloudStorage.onCollectionUpdate<Task>('tasks', (tasksData) => {
      setTasks(tasksData.sort((a,b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime()));
      setIsLoading(false); // Consider loading finished after first data received
    });
    
    const unsubscribeCategories = cloudStorage.onCollectionUpdate<Category>('categories', (categoriesData) => {
      setCategories(categoriesData.sort((a,b) => a.name.localeCompare(b.name)));
    });

    const unsubscribeUsers = cloudStorage.onCollectionUpdate<User>('users', (usersData) => {
      setUsers(usersData.sort((a,b) => a.name.localeCompare(b.name)));
    });

    // Cleanup listeners on component unmount
    return () => {
      unsubscribeTasks();
      unsubscribeCategories();
      unsubscribeUsers();
    };
  }, []);

  const handleAddTask = async (taskData: { user: string; category: string; description: string; duration: number }) => {
    const { user, category, description, duration } = taskData;
    const startDateTime = new Date();
    const endDateTime = new Date(startDateTime.getTime() + duration * 60000);
    const newTask: Omit<Task, 'id'> = {
      user,
      category,
      description,
      startTime: startDateTime.toISOString(),
      endTime: endDateTime.toISOString(),
    };
    await cloudStorage.addDocument('tasks', newTask);
    // State will be updated by the real-time listener
  };

  const handleDeleteTask = async (id: string) => {
    await cloudStorage.deleteDocument('tasks', id);
  };
  
  const handleAddCategory = async (name: string) => {
    await cloudStorage.addDocument('categories', { name });
  };

  const handleDeleteCategory = async (id: string) => {
    await cloudStorage.deleteDocument('categories', id);
  };
  
  const handleEditCategory = async (id: string, newName: string) => {
    const oldCategory = categories.find(c => c.id === id);
    if(oldCategory && oldCategory.name !== newName) {
       await cloudStorage.updateTasksByField('category', oldCategory.name, newName);
    }
    await cloudStorage.updateDocument('categories', id, { name: newName });
  };

  const handleAddUser = async (name: string) => {
    await cloudStorage.addDocument('users', { name });
  };

  const handleDeleteUser = async (id: string) => {
    await cloudStorage.deleteDocument('users', id);
  };

  const handleEditUser = async (id: string, newName: string) => {
    const oldUser = users.find(u => u.id === id);
    if(oldUser && oldUser.name !== newName) {
        await cloudStorage.updateTasksByField('user', oldUser.name, newName);
    }
    await cloudStorage.updateDocument('users', id, { name: newName });
  };
  
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const taskDate = new Date(task.startTime);
      if (taskDate.toDateString() !== selectedDate.toDateString()) {
        return false;
      }
      if (userFilter !== 'all' && task.user !== userFilter) {
        return false;
      }
      if (categoryFilter !== 'all' && task.category !== categoryFilter) {
        return false;
      }
      if (durationFilter && !isNaN(parseInt(durationFilter, 10))) {
        const minDuration = parseInt(durationFilter, 10);
        const taskDuration = (new Date(task.endTime).getTime() - new Date(task.startTime).getTime()) / 60000;
        if (taskDuration < minDuration) {
          return false;
        }
      }
      return true;
    });
  }, [tasks, selectedDate, userFilter, categoryFilter, durationFilter]);

  const handleExportCSV = () => {
    const tasksToExport = filteredTasks;
    if (tasksToExport.length === 0) {
      alert("No hay tareas para exportar con los filtros actuales.");
      return;
    }
    const headers = ['ID', 'Usuario', 'Categoría', 'Descripción', 'Fecha de Inicio', 'Hora de Inicio', 'Fecha de Fin', 'Hora de Fin'];
    const rows = tasksToExport.map(task => {
        const startDate = new Date(task.startTime);
        const endDate = new Date(task.endTime);
        return [
            task.id, `"${task.user.replace(/"/g, '""')}"`, `"${task.category.replace(/"/g, '""')}"`,
            `"${task.description.replace(/"/g, '""')}"`, startDate.toLocaleDateString('es-ES'),
            startDate.toLocaleTimeString('es-ES'), endDate.toLocaleDateString('es-ES'), endDate.toLocaleTimeString('es-ES')
        ].join(',');
    });
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    const date = selectedDate.toISOString().slice(0, 10);
    link.setAttribute("download", `registro_tareas_it_${date}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading && tasks.length === 0) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-slate-300">
        <p className="mt-4 text-lg">Conectando con la base de datos...</p>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-slate-900 font-sans p-4 sm:p-6 lg:p-8">
        <div className="container mx-auto max-w-5xl">
          <header className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-2xl font-bold text-white">HAMPA Studio</h1>
                <p className="text-slate-400">Registro de Tareas IT</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={() => setIsUserModalOpen(true)} className="flex items-center bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-md transition duration-300" title="Gestionar Usuarios">
                <UsersIcon className="h-5 w-5 mr-2" /> Usuarios
              </button>
              <button onClick={() => setIsCategoryModalOpen(true)} className="flex items-center bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-md transition duration-300" title="Gestionar Categorías">
                <CogIcon className="h-5 w-5 mr-2" /> Categorías
              </button>
              <button onClick={handleExportCSV} className="flex items-center bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed" disabled={filteredTasks.length === 0} title="Exportar a CSV para Google Sheets">
                <DownloadIcon className="h-5 w-5 mr-2" /> Exportar
              </button>
            </div>
          </header>
          <main>
            <TaskForm users={users} categories={categories} onAddTask={handleAddTask} />
            <FilterBar 
              date={selectedDate} onDateChange={setSelectedDate}
              users={users} userFilter={userFilter} onUserFilterChange={setUserFilter}
              categories={categories} categoryFilter={categoryFilter} onCategoryFilterChange={setCategoryFilter}
              durationFilter={durationFilter} onDurationFilterChange={setDurationFilter}
            />
            <TaskList tasks={filteredTasks} onDeleteTask={handleDeleteTask} />
          </main>
          <footer className="text-center mt-12 text-slate-500 text-sm">
            <p>&copy; {new Date().getFullYear()} HAMPA Studio. Desarrollado para el equipo de IT.</p>
          </footer>
        </div>
      </div>
      <CategoryManager
        isOpen={isCategoryModalOpen} onClose={() => setIsCategoryModalOpen(false)}
        categories={categories} onAddCategory={handleAddCategory}
        onDeleteCategory={handleDeleteCategory} onEditCategory={handleEditCategory}
      />
      <UserManager
        isOpen={isUserModalOpen} onClose={() => setIsUserModalOpen(false)}
        users={users} onAddUser={handleAddUser}
        onDeleteUser={handleDeleteUser} onEditUser={handleEditUser}
      />
    </>
  );
};

export default App;