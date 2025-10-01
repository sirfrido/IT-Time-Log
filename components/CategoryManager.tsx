import React, { useState, useEffect } from 'react';
import { CloseIcon, PencilIcon, TrashIcon, PlusIcon } from './Icons';
import { Category } from '../types';

interface CategoryManagerProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  onAddCategory: (name: string) => void;
  onDeleteCategory: (id: string) => void;
  onEditCategory: (id: string, newName: string) => void;
}

const CategoryManager: React.FC<CategoryManagerProps> = ({
  isOpen,
  onClose,
  categories,
  onAddCategory,
  onDeleteCategory,
  onEditCategory,
}) => {
  const [newCategory, setNewCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editedName, setEditedName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setNewCategory('');
      setEditingCategory(null);
      setEditedName('');
      setError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAdd = () => {
    const name = newCategory.trim();
    if (name === '') {
      setError('El nombre de la categoría no puede estar vacío.');
      return;
    }
    if (categories.some(c => c.name.toLowerCase() === name.toLowerCase())) {
        setError('Esa categoría ya existe.');
        return;
    }
    onAddCategory(name);
    setNewCategory('');
    setError('');
  };

  const handleDelete = (category: Category) => {
    if (window.confirm(`¿Seguro que quieres eliminar la categoría "${category.name}"?`)) {
      onDeleteCategory(category.id);
    }
  };

  const handleStartEdit = (category: Category) => {
    setEditingCategory(category);
    setEditedName(category.name);
    setError('');
  };
  
  const handleSaveEdit = () => {
    const name = editedName.trim();
    if (name === '') {
        setError('El nombre de la categoría no puede estar vacío.');
        return;
    }
    if (editingCategory && name.toLowerCase() !== editingCategory.name.toLowerCase() && categories.some(c => c.name.toLowerCase() === name.toLowerCase())) {
        setError('Esa categoría ya existe.');
        return;
    }
    if (editingCategory) {
        onEditCategory(editingCategory.id, name);
    }
    setEditingCategory(null);
    setEditedName('');
    setError('');
  };
  
  const handleCancelEdit = () => {
    setEditingCategory(null);
    setEditedName('');
    setError('');
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="category-manager-title">
      <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-2xl w-full max-w-md" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <h2 id="category-manager-title" className="text-xl font-bold text-cyan-300">Gestionar Categorías</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors" aria-label="Cerrar modal">
            <CloseIcon />
          </button>
        </div>
        
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {error && <p className="bg-red-500/20 text-red-300 p-3 rounded-md mb-4 text-sm">{error}</p>}
          <ul className="space-y-2">
            {categories.map(cat => (
              <li key={cat.id} className="flex items-center justify-between bg-slate-700/50 p-3 rounded-md">
                {editingCategory?.id === cat.id ? (
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
                  <span className="text-slate-200 flex-grow">{cat.name}</span>
                )}
                <div className="flex items-center space-x-2 ml-4 flex-shrink-0">
                  {editingCategory?.id === cat.id ? (
                    <>
                      <button onClick={handleSaveEdit} className="text-green-400 hover:text-green-300 font-semibold text-sm">Guardar</button>
                      <button onClick={handleCancelEdit} className="text-slate-400 hover:text-slate-200 text-sm">Cancelar</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleStartEdit(cat)} className="text-slate-400 hover:text-cyan-300" aria-label={`Editar ${cat.name}`}>
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(cat)} className="text-slate-400 hover:text-red-400" aria-label={`Eliminar ${cat.name}`}>
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
             {categories.length === 0 && <p className="text-slate-500 text-center py-4">No hay categorías. Añade una para empezar.</p>}
          </ul>
        </div>

        <div className="p-4 border-t border-slate-700 bg-slate-800/50 rounded-b-xl">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newCategory}
              onChange={e => setNewCategory(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAdd()}
              placeholder="Añadir nueva categoría"
              className="flex-grow bg-slate-700 border border-slate-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              aria-label="Nueva categoría"
            />
            <button onClick={handleAdd} className="flex items-center bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-3 rounded-md transition" aria-label="Añadir categoría">
              <PlusIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryManager;
