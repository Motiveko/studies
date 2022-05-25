import React, {
  createRef,
  KeyboardEventHandler,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Text from "../../atoms/Text";
interface SelectOption {
  label: string;
  value: string;
}

interface RenderOptionProps {
  isSelected: boolean;
  option: SelectOption;
  getOptionRecommendedProps: (overrideProps?: Object) => Object;
}

interface SelectProps {
  onOptionSelected?: (option: SelectOption, optionIndex: number) => void;
  options?: SelectOption[];
  label?: string;
  renderOption?: (props: RenderOptionProps) => React.ReactNode;
}

const Select: React.FC<SelectProps> = ({
  options = [],
  label = "Please select an option ...",
  onOptionSelected: handler,
  renderOption,
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

  // 키보드에는 hover가 없으므로 hover와 키보드로 foucus 선택을 합치기 위한 state
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const highlightItem = (optionIndex: number | null) => {
    setHighlightedIndex(optionIndex);
  };

  // 이렇게 구현한 이유는 option이 open되고 요소가 랜더링이 된 상태일때에 focus를 해야 하기 때문이다. useEffect는 상태값 변경에 따른 랜더링 후 동작하기 때문
  useEffect(() => {
    if (highlightedIndex !== null && isOpen) {
      const ref = optionRefs[highlightedIndex];
      ref.current?.focus(); // focus: 스크린 리더의 focus 영역이 이동한다.
    }
  }, [highlightedIndex, isOpen]);

  const getNextOptionIndex = () =>
    ((highlightedIndex || 0) + 1) % options.length;

  const getPreviousOptionIndex = () => (highlightedIndex || options.length) - 1;
  const optionKeyDown: KeyboardEventHandler = (event) => {
    const { key } = event;
    if (key === "Escape") {
      setIsOpen(false);
      return;
    }

    if (key === "ArrowDown") {
      highlightItem(getNextOptionIndex());
      return;
    }

    if (key === "ArrowUp") {
      highlightItem(getPreviousOptionIndex());
      return;
    }

    if (key === "Enter" && highlightedIndex !== null) {
      onOptionSelected(options[highlightedIndex], highlightedIndex);
    }
  };

  const onButtonKeyDown: KeyboardEventHandler = (event) => {
    event.preventDefault();

    if (KEYS.includes(event.key)) {
      setIsOpen((prev) => !prev);
    }

    highlightItem(highlightedIndex || 0);
  };

  // 각 option 요소(li)에 대한 참조, 여러개이고 동적이기 때문에 useRef로는 좀 힘들다.
  const [optionRefs, setOptionRefs] = useState<
    React.RefObject<HTMLLIElement>[]
  >([]);
  useEffect(() => {
    setOptionRefs(options.map((_) => createRef<HTMLLIElement>()));
  }, [options.length]);

  return (
    <div className="dse-select">
      <button
        onKeyDown={onButtonKeyDown}
        className="dse-select__label"
        aria-controls="dse-select-list"
        aria-haspopup={true}
        aria-expanded={isOpen ? true : undefined}
        data-testid="DseSelectButton"
        onClick={() => onLabelClick()}
        ref={labelRef}
      >
        <Text>{selectedOption}</Text>
        {caretIcon(isOpen)}
      </button>
      {isOpen && (
        <ul
          id="dse-select-list"
          role="menu"
          style={{ top: overlayTop }}
          className="dse-select__overlay"
        >
          {options.map((option, optionIndex) => {
            const isSelected = selectedIndex === optionIndex;
            const isHighlighted = highlightedIndex === optionIndex;

            const ref = optionRefs[optionIndex];

            const renderOptionProps: RenderOptionProps = {
              isSelected,
              option,
              getOptionRecommendedProps: (overrideProps = {}) => {
                return {
                  ref,
                  role: "menuitemradio",
                  "aria-label": option.label,
                  "aria-checked": isSelected ? true : undefined,
                  onKeyDown: optionKeyDown,
                  tabIndex: isHighlighted ? -1 : 0, // tabIndex가 있어야 focus를 받을 수 있다.(기본으로 받을수 있는 요소도 있음)
                  onMouseEnter: () => highlightItem(optionIndex), // :hover를 js로 구현한다.
                  onMouseLeave: () => highlightItem(null),
                  className: `dse-select__option 
                  ${isSelected ? "dse-select__option--selected" : ""} 
                  ${isHighlighted ? "dse-select__option--highlighted" : ""}`,
                  onClick: () => onOptionSelected(option, optionIndex),
                  key: option.value,
                  ...overrideProps,
                };
              },
            };
            if (renderOption) {
              return renderOption(renderOptionProps);
            }
            return (
              <li {...renderOptionProps.getOptionRecommendedProps()}>
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

const KEYS = ["Enter", "ArrowDown", " "];

export default Select;
