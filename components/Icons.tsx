import React from 'react';

export const TrashIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.036-2.134H8.716c-1.126 0-2.037.955-2.037 2.134v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
  </svg>
);

export const DownloadIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

export const PlusIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

export const PencilIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
    </svg>
);

export const CloseIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
);

export const CogIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-1.007 1.11-1.227l.952-.381c.556-.222 1.192.038 1.488.553l.41 1.026c.26.65.83 1.134 1.522 1.298l1.07.267c.642.16 1.074.76 1.074 1.417v.952c0 .657-.432 1.257-1.074 1.416l-1.07.268c-.692.164-1.262.648-1.522 1.298l-.41 1.026c-.296.515-.932.775-1.488.553l-.952-.381c-.55-.22-.99-.685-1.11-1.227l-.268-1.07c-.164-.692-.648-1.262-1.298-1.522l-1.026-.41c-.515-.296-.775-.932-.553-1.488l.381-.952c.22-.55.685-.99 1.227-1.11l1.07-.268c.692-.164 1.262-.648 1.522-1.298l.41-1.026Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5Z" />
  </svg>
);

export const UsersIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-2.453M15 19.128v-3.873M15 19.128A9.37 9.37 0 0 1 12.125 21a9.37 9.37 0 0 1-2.875-.872M15 19.128a9.337 9.337 0 0 0 4.121-2.453c1.152-1.002 1.953-2.348 2.226-3.823M15 19.128V14.25a9.364 9.364 0 0 0-3.375-7.125m3.375 7.125c1.152-1.002 1.953-2.348 2.226-3.823M12.125 21a9.37 9.37 0 0 1-2.875-.872M12.125 21a9.37 9.37 0 0 0-2.875-.872M12.125 21V3.873M12.125 21a9.364 9.364 0 0 0-3.375-7.125M8.625 14.25c-1.152-1.002-1.953-2.348-2.226-3.823M8.625 14.25V19.128a9.37 9.37 0 0 0 2.875.872M8.625 14.25a9.364 9.364 0 0 1-3.375-7.125M12 3.873c0-.621.504-1.125 1.125-1.125h.001c.621 0 1.125.504 1.125 1.125v3.375M12 3.873c0-.621-.504-1.125-1.125-1.125h-.001C10.374 2.75 9.87 3.254 9.87 3.873v3.375m0 0c1.152 1.002 1.953 2.348 2.226 3.823" />
    </svg>
);

export const CalendarIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0h18" />
    </svg>
);