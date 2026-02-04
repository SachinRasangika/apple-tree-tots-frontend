import React, { Fragment } from 'react';
import { Check } from 'lucide-react';
import { clsx } from 'clsx';
import { useDarkMode } from '../../context/DarkModeContext';

interface Step {
  label: string;
  completed?: boolean;
}

interface ProgressIndicatorProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export function ProgressIndicator({
  steps,
  currentStep,
  className
}: ProgressIndicatorProps) {
  const { isDark } = useDarkMode();

  return <div className={clsx('flex items-center justify-between', className)}>
      {steps.map((step, index) => {
      const stepNumber = index + 1;
      const isCompleted = stepNumber < currentStep;
      const isCurrent = stepNumber === currentStep;
      const isUpcoming = stepNumber > currentStep;

      const completedColor = isDark ? 'bg-white border-white text-[#1a3a3a]' : 'bg-[#2A372F] border-[#2A372F] text-[#CDD1CB]';
      const currentColor = isDark ? 'bg-[#1a3a3a] border-white text-white' : 'bg-[#CDD1CB] border-[#CDD1CB] text-[#2A372F]';
      const upcomingColor = isDark ? 'bg-transparent border-white/20 text-white/40' : 'bg-transparent border-[#2A372F]/20 text-[#2A372F]/40';

      const lineColor = isDark ? 'bg-white' : 'bg-[#2A372F]';
      const lineInactiveColor = isDark ? 'bg-white/20' : 'bg-[#2A372F]/20';

      return <Fragment key={stepNumber}>
            <div className="flex flex-col items-center">
              <div className={clsx('w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500', {
            [completedColor]: isCompleted,
            [currentColor]: isCurrent,
            [upcomingColor]: isUpcoming
          })}>
                {isCompleted ? <Check size={20} /> : <span className="text-sm font-medium">{stepNumber}</span>}
              </div>
              <span className="text-[10px] tracking-widest uppercase mt-2 opacity-60">
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && <div className={clsx('flex-1 h-0.5 mx-2 transition-all duration-500', {
          [lineColor]: stepNumber < currentStep,
          [lineInactiveColor]: stepNumber >= currentStep
        })} />}
          </Fragment>;
    })}
    </div>;
}
