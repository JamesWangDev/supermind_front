import { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const CustomDropDown = ({ items, value, handleSelectChange, placeholder, toggleStyle, toggleClassName }) => {
  const [dropdown, setDropDown] = useState(false);
  const toggle = () => setDropDown((prevState) => !prevState);

  return (
    <Dropdown isOpen={dropdown} toggle={toggle}>
      <DropdownToggle
        caret
        className={toggleClassName ? toggleClassName : "w-100 select-dropdown border border-black"}
        type="button"
        size="sm"
        style={toggleStyle}
      >
        {items.filter(item => item.value === value).length > 0 ? items.filter(item => item.value === value)[0].name : placeholder}
      </DropdownToggle>
      {
        <DropdownMenu className="dropdown-menu-end sm-dropdown-menu w-100">
          {items.map((item, index) => (
            <DropdownItem
              id={`${item.name}${index}-1`}
              key={`${item.name}${index}-1`}
              onClick={() => handleSelectChange(item.value)}
            >
              {item.name}
            </DropdownItem>
          ))}
        </DropdownMenu>
      }
    </Dropdown>
  );
};

export default CustomDropDown;
