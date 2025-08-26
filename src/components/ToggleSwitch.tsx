type ToggleSwitchProps = {
  value: boolean;
  onChange: (value: boolean) => void;
};

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ value, onChange }) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={value}
      onClick={() => onChange(!value)}
      className={`${
        value ? "bg-purple-600" : "bg-gray-300"
      } relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2`}
    >
      <span
        className={`${
          value ? "translate-x-7" : "translate-x-1"
        } inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300 shadow-sm`}
      />
    </button>
  );
};

export default ToggleSwitch;
