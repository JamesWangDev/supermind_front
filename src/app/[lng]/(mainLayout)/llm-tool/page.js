"use client";

import styles from "./llm-tool.module.scss";
import { useCallback, useState } from "react";
import { useResizable } from "react-resizable-layout";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"
import { cn } from "./cn";
import Btn from "@/Elements/Buttons/Btn"

const texttypes = [
  {
    name: "Prompt Text",
    value: 0
  },
  {
    name: "Data Source",
    value: 1
  },
  {
    name: "Query Text",
    value: 2
  }
]

const placeHolderText = [
  "Enter Prompt Text...",
  "Enter Data Source...",
  "Enter Query Text...",
]

const LLMTool = () => {
  const [dropdown1, setDropdown1] = useState(false);
  const toggle1 = () => setDropdown1((prevState) => !prevState);
  const [selectedTextType, setSelectedTextType] = useState("");
  const [textBoxes, setTextBoxes] = useState([0, 1, 2])
  const {
    isDragging: isFileDragging,
    position: fileW,
    separatorProps: fileDragBarProps,
  } = useResizable({
    axis: "x",
    initial: 500,
    min: 50,
  });

  const handleAddTextBox = useCallback(() => {
    if(selectedTextType === "") {
      alert("Please select the Box type...")
      return;
    }
    setTextBoxes((prev) => {
      return [...prev, selectedTextType]
    })
  }, [selectedTextType, setSelectedTextType])

  const handleRemoveTextBox = (index) => {
    const update = textBoxes.filter((_, i) => i !== index)
    setTextBoxes(update)
  }

  return (
    <div className="d-flex justify-content-center">
      <div
        className={"flex flex-column w-75 overflow-hidden border border-black"}
      >
        <div className={"flex grow"}>
          <div className={"shrink-0 contents"} style={{ width: fileW - 240 }}>
            <div
              className={"flex flex-column w-100"}
              style={{ height: "700px", width: fileW - 240 }}
            >
              <Dropdown isOpen={dropdown1} toggle={toggle1}>
                <DropdownToggle
                  caret
                  className="w-100 select-dropdown border border-black"
                  type="button"
                  size="sm"
                >
                  {texttypes[selectedTextType]
                    ? texttypes[selectedTextType].name
                    : "Select Text Box Type...."}
                </DropdownToggle>
                {
                  <DropdownMenu className="dropdown-menu-end sm-dropdown-menu w-100">
                    {texttypes.map((item, index) => (
                        <DropdownItem
                          id={`${item.name}${index}-1`}
                          key={`${item.name}${index}-1`}
                          onClick={() => setSelectedTextType(item.value)}
                        >
                          {item.name}
                        </DropdownItem>
                      ))}
                  </DropdownMenu>
                }
              </Dropdown>
              <Btn
                  className='btn-sm w-100 border border-black mt-1 mb-1'
                  title={'Add Text Box'}
                  onClick={handleAddTextBox}>
              </Btn>
              <div className="overflow-auto">
                {textBoxes.map((box, index) => (
                  <div style={{position: "relative"}}>
                    <textarea style={{resize: "none", width: "100%", height: "100px", padding: "8px", marginTop: index !==0 && "-7px"}} placeholder={placeHolderText[box]} />
                    <span style={{position: "absolute", top: index !==0 ? "-8px": "0px", right: "6px", width: "10px", height: "10px", cursor: "pointer"}} onClick={() => handleRemoveTextBox(index)}>x</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <SampleSplitter isDragging={isFileDragging} {...fileDragBarProps} />
          <div className={"flex grow"}>
            <div className={"grow contents"}>Right Panel</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SampleSplitter = ({ id = "drag-bar", dir, isDragging, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      id={id}
      data-testid={id}
      tabIndex={0}
      className={cn(
        styles.sampleDragBar,
        dir === "horizontal" && styles.sampleDragBarHorizontal,
        (isDragging || isFocused) && styles.sampleDragBarDragging
      )}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...props}
    />
  );
};

export default LLMTool;
