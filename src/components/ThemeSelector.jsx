import { PaletteIcon } from 'lucide-react'
import React from 'react'
import { THEMES } from '../constants';
import { useThemeStore } from '../store/useThemeStore';

function ThemeSelector() {
  const { theme, setTheme } = useThemeStore();

  const handleThemeChange = (newTheme) => {
    console.log('Changing theme to:', newTheme);
    setTheme(newTheme);
  };

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <PaletteIcon className="size-5" />
      </div>

      <div
        tabIndex={0}
        className="dropdown-content z-[1] p-4 shadow-2xl bg-base-200 backdrop-blur-lg rounded-2xl
        w-80 border border-base-content/10 max-h-96 overflow-y-auto
      "
      >
        <div className="grid grid-cols-2 gap-2">
          {THEMES.map((themeOption) => (
            <button
              key={themeOption.name}
              className={`
                p-3 rounded-xl flex flex-col items-center gap-2 transition-all duration-200
                ${theme === themeOption.name
                  ? "bg-primary/20 text-primary ring-2 ring-primary/30"
                  : "hover:bg-base-content/5 hover:scale-105"
                }
                `}
              onClick={() => handleThemeChange(themeOption.name)}
            >
              {/* Theme preview colors */}
              <div className="flex gap-1">
                {themeOption.colors.map((color, i) => (
                  <span
                    key={i}
                    className="size-3 rounded-full border border-base-content/20"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              <span className="text-xs font-medium text-center">
                {themeOption.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ThemeSelector