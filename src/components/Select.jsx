import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowDown, IoMdClose } from "react-icons/io";

const SelectMenu = () => {
  const [isActive, setIsActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select your option");
  const menuRef = useRef(null);

  const options = [
    { text: "Instagram" },
    { text: "Linkedin" },
    { text: "Facebook" },
    { text: "Twitter" },
  ];

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  const handleOptionClick = (optionText) => {
    setSelectedOption(optionText);
    setIsActive(false);
  };

  const handleClearSelection = () => {
    setSelectedOption("Select your option");
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative max-w-xs mx-auto mt-12">
      <div
        className="flex bg-white py-2 px-4 text-sm font-normal rounded-md items-center cursor-pointer justify-between transition-all duration-300"
        onClick={toggleMenu}
      >
        <span>{selectedOption}</span>
        {selectedOption === "Select your option" ? (
          <IoIosArrowDown
            className={`transform transition-transform duration-300 ${
              isActive ? "rotate-180" : ""
            }`}
            size={16}
          />
        ) : (
          <IoMdClose
            className="cursor-pointer bg-gray-200 rounded-full p-[0.5px]"
            size={16}
            onClick={(e) => {
              e.stopPropagation();
              handleClearSelection();
            }}
          />
        )}
      </div>

      <ul
        className={`absolute w-full max-h-72 overflow-y-auto py-2 px-2 mt-[2px] rounded-md bg-white transition-opacity duration-300 transform ${
          isActive
            ? "opacity-100 translate-y-0 animate-fadeInDown"
            : "opacity-0 translate-y-2 pointer-events-none animate-fadeInUp"
        }`}
      >
        {options.map((option, index) => (
          <li
            key={index}
            className="flex cursor-pointer p-2 rounded-md items-center transition-all duration-200 bg-white hover:bg-gray-100"
            onClick={() => handleOptionClick(option.text)}
          >
            <span className="text-sm text-gray-800">{option.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectMenu;
