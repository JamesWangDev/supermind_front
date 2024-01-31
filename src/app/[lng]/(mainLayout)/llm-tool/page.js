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

const LLMTool = () => {
  const [dropdown1, setDropdown1] = useState(false);
  const toggle1 = () => setDropdown1((prevState) => !prevState);
  const [selectedTextType, setSelectedTextType] = useState("");
  const [textBoxes, setTextBoxes] = useState([0, 1, 2])
  const [isRunning, setIsRunning] = useState(false)
  const {
    isDragging: isFileDragging,
    position: fileW,
    separatorProps: fileDragBarProps,
  } = useResizable({
    axis: "x",
    initial: 550,
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

  const handleRunStop = useCallback(() => {
    setIsRunning(!isRunning)
  }, [setIsRunning, isRunning])

  return (
    <div className="d-flex justify-content-center">
      <div
        className={"flex flex-column w-75 overflow-hidden border border-black"}
      >
        <div className="w-100 border-bottom border-black d-flex" style={{height: "70px"}}>
          <div className="w-25 border-end border-black d-flex text-center"><span className="m-auto">Set UP File name</span></div>
          <div className="w-25 border-end border-black d-flex text-center"><span className="m-auto">Save/Load Set Up</span></div>
          <div className="w-25 border-end border-black d-flex text-center"><span className="m-auto">Data File Name</span></div>
          <div className="w-25 text-center d-flex"><span className="m-auto">Export Data</span></div>
        </div>
        <div className="w-100 border-bottom border-black d-flex" style={{height: "60px"}}>
          <div className="border-end border-black d-flex text-center" style={{width: "14%"}}><span className="m-auto">Model Choice</span></div>
          <div className="border-end border-black d-flex text-center" style={{width: "14%"}}>
            <div className="d-block m-auto">
              <div>Iteration Max</div>
              <div>Rows Max</div>
            </div>
          </div>
          <div className="border-end border-black d-flex text-center" style={{width: "14%"}}>
            <div className="d-block m-auto">
              <div>Iteration Max</div>
              <div>Time Max</div>
            </div>
          </div>
          <div className="border-end border-black d-flex text-center" style={{width: "15%"}}>
            <div className="d-block m-auto">
              <div>Iteration Max</div>
              <div>rows max</div>
            </div>
          </div>
          <div className="border-end border-black d-flex text-center" style={{width: "14%"}}>
            <div className="d-block m-auto">
              <div>Enable GPT</div>
              <div>complete Flag</div>
            </div>
          </div>
          <div className="border-end border-black d-flex text-center" style={{width: "15%"}}>
            <div className="d-block m-auto">
              <div>Remove</div>
              <div>Duplicated</div>
            </div>
          </div>
          <div className="text-center d-flex" style={{width: "15%"}}>
            <div className="d-block m-auto">
              <div>How many</div>
              <div>rows to inject</div>
            </div>
          </div>
        </div>
        <Btn
            className='btn-sm w-100 border border-black mt-1 mb-1'
            title={isRunning ? 'Stop' : 'Run'}
            onClick={handleRunStop}>
        </Btn>
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
                  <div style={{position: "relative"}} className="border border-black rounded p-1">
                    {box === 0 && <PromptTextBox />}
                    {box === 1 && <DataSourceTextBox />}
                    {box === 2 && <QueryTextBox />}
                    <span style={{position: "absolute", top: "0px", right: "6px", width: "10px", height: "10px", cursor: "pointer"}} onClick={() => handleRemoveTextBox(index)}>x</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <SampleSplitter isDragging={isFileDragging} {...fileDragBarProps} />
          <div className={"flex grow"}>
            <div className={"grow contents p-3"}>
                  <div className="border-bottom border-black h-100 w-100">Inter Milan</div>
                  <div className="pt-2 h-100 w-100">Manchester United</div>
            </div>
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

const PromptTextBox = () => {
  return (
    <textarea style={{resize: "none", width: "100%", height: "100px", padding: "8px", border: "none"}} placeholder={"Enter Prompt Text..."} />
  )
}

const DataSourceTextBox = () => {
  return (
    <div>
      <textarea style={{resize: "none", width: "100%", height: "65px", padding: "8px", border: "none"}} placeholder={"Enter Data Source Address..."} />
      <textarea style={{resize: "none", width: "100%", height: "100px", padding: "8px", border: "none", borderTop: "solid 1px grey"}} placeholder={"Enter Data Source OutPut..."} />
    </div>
  )
}

const QueryTextBox = () => {
  return (
    <div>
      <textarea style={{resize: "none", width: "100%", height: "65px", padding: "8px", border: "none"}} placeholder={"Enter Query Text..."} />
      <textarea style={{resize: "none", width: "100%", height: "80", padding: "8px", border: "none", borderTop: "solid 1px grey"}} placeholder={"Enter Data Source Address..."} />
      <textarea style={{resize: "none", width: "100%", height: "80px", padding: "8px", border: "none", borderTop: "solid 1px grey"}} placeholder={"Enter Data Source OutPut..."} />
    </div>
  )
}

export default LLMTool;
