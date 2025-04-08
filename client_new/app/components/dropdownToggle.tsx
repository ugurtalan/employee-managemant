import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

// Props yapısını doğru tanımlıyoruz.
type DropdownProps = {
   
    children: React.ReactNode;
    isOpen:boolean;
    change:()=>void;
};

const DropdownToggle = ({ children,isOpen,change }: DropdownProps) => {

    return (
        <div className=" flex flex-row relative" id="dropdown-toggle">
            <button
                onClick={change}
                className="cursor-pointer my-auto flex items-center transition-all duration-300"
            >
                İşçiler
                <span className={` px-2 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}>
                    <FontAwesomeIcon icon={faChevronDown} />
                </span>
            </button>

            {isOpen && (
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 absolute top-full -left-3 min-w-36 min-h-36 z-50  ">
                    {children}
                </div>
            )}
        </div>
    );
};

export default DropdownToggle;
