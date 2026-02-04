import React from 'react';
import { clsx } from 'clsx';
import { useDarkMode } from '../../context/DarkModeContext';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options?: {
    value: string;
    label: string;
  }[];
}

export function Input({
  label,
  error,
  helperText,
  className,
  required,
  ...props
}: InputProps) {
  const { isDark } = useDarkMode();
  const labelColor = isDark ? 'text-white/70' : 'text-[#2A372F]/70';
  const borderColor = isDark ? 'border-white/30 focus:border-white' : 'border-[#2A372F]/30 focus:border-[#2A372F]';
  const helperColor = isDark ? 'text-white/60' : 'text-[#2A372F]/60';

  return <div className="w-full">
      {label && <label className={`block text-xs tracking-widest uppercase mb-2 ${labelColor}`}>
          {label} {required && '*'}
        </label>}
      <input className={clsx(`w-full bg-transparent border-b ${borderColor} py-3 text-sm focus:outline-none transition-colors`, error && 'border-red-400 focus:border-red-400', className)} {...props} />
      {error && <p className="text-xs text-red-400 mt-2 tracking-wide">{error}</p>}
      {helperText && !error && <p className={`text-xs ${helperColor} mt-2 tracking-wide`}>{helperText}</p>}
    </div>;
}

export function TextArea({
  label,
  error,
  helperText,
  className,
  required,
  ...props
}: TextAreaProps) {
  const { isDark } = useDarkMode();
  const labelColor = isDark ? 'text-white/70' : 'text-[#2A372F]/70';
  const borderColor = isDark ? 'border-white/30 focus:border-white' : 'border-[#2A372F]/30 focus:border-[#2A372F]';
  const helperColor = isDark ? 'text-white/60' : 'text-[#2A372F]/60';

  return <div className="w-full">
      {label && <label className={`block text-xs tracking-widest uppercase mb-2 ${labelColor}`}>
          {label} {required && '*'}
        </label>}
      <textarea className={clsx(`w-full bg-transparent border ${borderColor} p-3 text-sm focus:outline-none transition-colors resize-none`, error && 'border-red-400 focus:border-red-400', className)} {...props} />
      {error && <p className="text-xs text-red-400 mt-2 tracking-wide">{error}</p>}
      {helperText && !error && <p className={`text-xs ${helperColor} mt-2 tracking-wide`}>{helperText}</p>}
    </div>;
}

export function Select({
  label,
  error,
  helperText,
  className,
  required,
  options,
  children,
  ...props
}: SelectProps) {
  const { isDark } = useDarkMode();
  const labelColor = isDark ? 'text-white/70' : 'text-[#2A372F]/70';
  const borderColor = isDark ? 'border-white/30 focus:border-white' : 'border-[#2A372F]/30 focus:border-[#2A372F]';
  const helperColor = isDark ? 'text-white/60' : 'text-[#2A372F]/60';
  const optionBgColor = isDark ? 'bg-[#1a3a3a]' : 'bg-[#CDD1CB]';

  return <div className="w-full">
      {label && <label className={`block text-xs tracking-widest uppercase mb-2 ${labelColor}`}>
          {label} {required && '*'}
        </label>}
      <select className={clsx(`w-full bg-transparent border-b ${borderColor} py-3 text-sm focus:outline-none transition-colors`, error && 'border-red-400 focus:border-red-400', className)} {...props}>
        {options ? options.map(option => <option key={option.value} value={option.value} className={optionBgColor}>
                {option.label}
              </option>) : children}
      </select>
      {error && <p className="text-xs text-red-400 mt-2 tracking-wide">{error}</p>}
      {helperText && !error && <p className={`text-xs ${helperColor} mt-2 tracking-wide`}>{helperText}</p>}
    </div>;
}
