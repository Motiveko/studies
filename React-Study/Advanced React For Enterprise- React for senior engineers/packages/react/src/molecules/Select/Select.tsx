import React, { useEffect, useMemo, useRef, useState } from "react";
import Text from "../../atoms/Text";
interface SelectOption {
  label: string;
  value: string;
}
interface SelectProps {
  onOptionSelected?: (option: SelectOption, optionIndex: number) => void;
  options?: SelectOption[];
  label?: string;
}

const Select: React.FC<SelectProps> = ({
  options = [],
  label = "Please select an option ...",
  onOptionSelected: handler,
}) => {
  const labelRef = useRef<HTMLButtonElement>(null);
  const [overlayTop, setOverlayTop] = useState<number | undefined>(undefined);
  useEffect(() => {
    setOverlayTop((labelRef.current?.offsetHeight || 0) + 10);
  }, [labelRef.current?.offsetHeight]);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(
    undefined
  );
  const onOptionSelected = (option: SelectOption, optionIndex: number) => {
    setIsOpen(false);
    setSelectedIndex(optionIndex);
    if (handler) {
      handler(option, optionIndex);
    }
  };
  const onLabelClick = () => {
    setIsOpen(!isOpen);
  };

  const selectedOption = useMemo(
    () => (selectedIndex === undefined ? label : options[selectedIndex].label),
    [options, selectedIndex]
  );

  return (
    <div className="dse-select">
      <button
        className="dse-select__label"
        onClick={() => onLabelClick()}
        ref={labelRef}
      >
        <Text>{selectedOption}</Text>
        {caretIcon(isOpen)}
      </button>
      {isOpen && (
        <ul style={{ top: overlayTop }} className="dse-select__overlay">
          {options.map((option, optionIndex) => {
            const isSelected = selectedIndex === optionIndex;
            return (
              <li
                className={`dse-select__option ${
                  isSelected ? "dse-select__option--selected" : ""
                }`}
                onClick={() => onOptionSelected(option, optionIndex)}
                key={option.value}
              >
                <Text>{option.label}</Text>
                {isSelected && checkIcon}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
const caretIcon = (isOpen: boolean) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-6 w-6 dse-select__caret ${
        isOpen ? "dse-select__caret--open" : "dse-select__caret--closed"
      }`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      width="1rem"
      height="1rem"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
};
const checkIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    width="1rem"
    height="1rem"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);
export default Select;
