import React, { useState, useRef, useEffect } from 'react';

const Select = ({ options = [], label = "Please select an option ...", onOptionSelected: handler, }) => {
    const [isOpen, setIsOpen] = useState(false);
    const labelRef = useRef(null);
    const [overlayTop, setOverlayTop] = useState(undefined);
    useEffect(() => {
        setOverlayTop((labelRef.current?.offsetHeight || 0) + 10);
    }, [labelRef.current?.offsetHeight]);
    const onOptionSelected = (option, optionIndex) => {
        setIsOpen(!isOpen);
        if (handler) {
            handler(option, optionIndex);
        }
    };
    const onLabelClick = () => {
        setIsOpen(!isOpen);
    };
    return (React.createElement("div", { className: "dse-select" },
        React.createElement("button", { className: "dse-select__label", onClick: () => onLabelClick(), ref: labelRef },
            React.createElement("span", null, label),
            React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", width: "1rem", height: "1rem", strokeWidth: 2 },
                React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M19 9l-7 7-7-7" }))),
        isOpen && (React.createElement("ul", { style: { top: overlayTop }, className: "dse-select__overlay" }, options.map((option, optionIndex) => (React.createElement("li", { onClick: () => onOptionSelected(option, optionIndex), key: option.value }, option.label)))))));
};

export { Select as default };
//# sourceMappingURL=Select.js.map
