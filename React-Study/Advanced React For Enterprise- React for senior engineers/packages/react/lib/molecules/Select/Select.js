import React, { useRef, useState, useEffect, useMemo } from 'react';
import Text from '../../atoms/Text/Text.js';

const Select = ({ options = [], label = "Please select an option ...", onOptionSelected: handler, renderOption, }) => {
    const labelRef = useRef(null);
    const [overlayTop, setOverlayTop] = useState(undefined);
    useEffect(() => {
        setOverlayTop((labelRef.current?.offsetHeight || 0) + 10);
    }, [labelRef.current?.offsetHeight]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(undefined);
    const onOptionSelected = (option, optionIndex) => {
        setIsOpen(false);
        setSelectedIndex(optionIndex);
        if (handler) {
            handler(option, optionIndex);
        }
    };
    const onLabelClick = () => {
        setIsOpen(!isOpen);
    };
    const selectedOption = useMemo(() => (selectedIndex === undefined ? label : options[selectedIndex].label), [options, selectedIndex]);
    return (React.createElement("div", { className: "dse-select" },
        React.createElement("button", { className: "dse-select__label", onClick: () => onLabelClick(), ref: labelRef },
            React.createElement(Text, null, selectedOption),
            caretIcon(isOpen)),
        isOpen && (React.createElement("ul", { style: { top: overlayTop }, className: "dse-select__overlay" }, options.map((option, optionIndex) => {
            const isSelected = selectedIndex === optionIndex;
            const renderOptionProps = {
                isSelected,
                option,
                getOptionRecommendedProps: (overrideProps = {}) => {
                    return {
                        className: `dse-select__option ${isSelected ? "dse-select__option--selected" : ""}`,
                        onClick: () => onOptionSelected(option, optionIndex),
                        key: option.value,
                        ...overrideProps,
                    };
                },
            };
            if (renderOption) {
                return renderOption(renderOptionProps);
            }
            return (React.createElement("li", { className: `dse-select__option ${isSelected ? "dse-select__option--selected" : ""}`, onClick: () => onOptionSelected(option, optionIndex), key: option.value },
                React.createElement(Text, null, option.label),
                isSelected && checkIcon));
        })))));
};
const caretIcon = (isOpen) => {
    return (React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: `h-6 w-6 dse-select__caret ${isOpen ? "dse-select__caret--open" : "dse-select__caret--closed"}`, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", width: "1rem", height: "1rem", strokeWidth: 2 },
        React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M19 9l-7 7-7-7" })));
};
const checkIcon = (React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", width: "1rem", height: "1rem", strokeWidth: 2 },
    React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M5 13l4 4L19 7" })));

export { Select as default };
//# sourceMappingURL=Select.js.map
