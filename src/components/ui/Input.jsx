import React from 'react';

export const Input = React.forwardRef(({ label, error, ...props }, ref) => {
  return (
    <div className="flex flex-col space-y-1 mb-4">
      {label && <label className="text-sm font-medium text-slate-700">{label}</label>}
      <input
        ref={ref}
        className={`px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          error ? 'border-red-500' : 'border-slate-300'
        }`}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
});
Input.displayName = 'Input';

export const Textarea = React.forwardRef(({ label, error, ...props }, ref) => {
  return (
    <div className="flex flex-col space-y-1 mb-4">
      {label && <label className="text-sm font-medium text-slate-700">{label}</label>}
      <textarea
        ref={ref}
        rows={4}
        className={`px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          error ? 'border-red-500' : 'border-slate-300'
        }`}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
});
Textarea.displayName = 'Textarea';
