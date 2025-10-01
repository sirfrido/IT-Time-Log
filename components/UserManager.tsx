import React, { useState, useEffect } from 'react';
import { CloseIcon, PencilIcon, TrashIcon, PlusIcon } from './Icons';
import { User } from '../types';

interface UserManagerProps {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
  onAddUser: (name: string) => void;
  onDeleteUser: (id: string) => void;
  onEditUser: (id: string, newName: string) => void;
}

const UserManager: React.FC<UserManagerProps> = ({
  isOpen,
  onClose,
  users,
  onAddUser,
  onDeleteUser,
  onEditUser,
}) => {
  const [newUser, setNewUser] = useState('');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editedName, setEditedName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setNewUser('');
      setEditingUser(null);
      setEditedName('');
      setError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAdd = () => {
    const name = newUser.trim();
    if (name === '') {
      setError('El nombre del usuario no puede estar vacío.');
      return;
    }
    if (users.some(u => u.name.toLowerCase() === name.toLowerCase())) {
        setError('Ese usuario ya existe.');
        return;
    }
    onAddUser(name);
    setNewUser('');
    setError('');
  };

  const handleDelete = (user: User) => {
    if (window.confirm(`¿Seguro que quieres eliminar al usuario "${user.name}"? Sus tareas registradas no se borrarán.`)) {
      onDeleteUser(user.id);
    }
  };

  const handleStartEdit = (user: User) => {
    setEditingUser(user);
    setEditedName(user.name);
    setError('');
  };
  
  const handleSaveEdit = () => {
    const name = editedName.trim();
    if (name === '') {
        setError('El nombre del usuario no puede estar vacío.');
        return;
    }
    if (editingUser && name.toLowerCase() !== editingUser.name.toLowerCase() && users.some(u => u.name.toLowerCase() === name.toLowerCase())) {
        setError('Ese usuario ya existe.');
        return;
    }
    if (editingUser) {
        onEditUser(editingUser.id, name);
    }
    setEditingUser(null);
    setEditedName('');
    setError('');
  };
  
  const handleCancelEdit = () => {
    setEditingUser(null);
    setEditedName('');
    setError('');
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="user-manager-title">
      <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-2xl w-full max-w-md" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <h2 id="user-manager-title" className="text-xl font-bold text-cyan-300">Gestionar Usuarios</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors" aria-label="Cerrar modal">
            <CloseIcon />
          </button>
        </div>
        
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {error && <p className="bg-red-500/20 text-red-300 p-3 rounded-md mb-4 text-sm">{error}</p>}
          <ul className="space-y-2">
            {users.map(user => (
              <li key={user.id} className="flex items-center justify-between bg-slate-700/50 p-3 rounded-md">
                {editingUser?.id === user.id ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={e => setEditedName(e.target.value)}
                    onKeyDown={e => {
                        if(e.key === 'Enter') handleSaveEdit();
                        if(e.key === 'Escape') handleCancelEdit();
                    }}
                    className="flex-grow bg-slate-600 border border-slate-500 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    autoFocus
                  />
                ) : (
                  <span className="text-slate-200 flex-grow">{user.name}</span>
                )}
                <div className="flex items-center space-x-2 ml-4 flex-shrink-0">
                  {editingUser?.id === user.id ? (
                    <>
                      <button onClick={handleSaveEdit} className="text-green-400 hover:text-green-300 font-semibold text-sm">Guardar</button>
                      <button onClick={handleCancelEdit} className="text-slate-400 hover:text-slate-200 text-sm">Cancelar</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleStartEdit(user)} className="text-slate-400 hover:text-cyan-300" aria-label={`Editar ${user.name}`}>
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(user)} className="text-slate-400 hover:text-red-400" aria-label={`Eliminar ${user.name}`}>
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
             {users.length === 0 && <p className="text-slate-500 text-center py-4">No hay usuarios. Añade uno para empezar.</p>}
          </ul>
        </div>

        <div className="p-4 border-t border-slate-700 bg-slate-800/50 rounded-b-xl">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newUser}
              onChange={e => setNewUser(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAdd()}
              placeholder="Añadir nuevo usuario"
              className="flex-grow bg-slate-700 border border-slate-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              aria-label="Nuevo usuario"
            />
            <button onClick={handleAdd} className="flex items-center bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-3 rounded-md transition" aria-label="Añadir usuario">
              <PlusIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManager;
