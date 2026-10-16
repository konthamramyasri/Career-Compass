
import React, { useEffect } from 'react';

// Feather Icons are not React components, they are rendered imperatively.
// This component creates the `<i>` tag and then calls feather.replace()
// See: https://github.com/feathericons/feather#browser

declare global {
    interface Window {
      feather: {
        replace: () => void;
      };
    }
}
interface IconProps {
  name: string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, className }) => {
  useEffect(() => {
    if (window.feather) {
      window.feather.replace();
    }
  }, [name, className]);

  return <i data-feather={name} className={className} />;
};
