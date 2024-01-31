"use client";

import styles from "./llm-tool.module.scss";
import { useCallback, useState } from "react";
import { useResizable } from "react-resizable-layout";
import { cn } from "./cn";
import Btn from "@/Elements/Buttons/Btn";
import CustomDropDown from "@/Components/Common/CustomDropDown/CustomDropDown";
import {Input, InputGroup} from "reactstrap";

const texttypes = [
  {
    name: "Prompt Text",
    value: 0,
  },
  {
    name: "Data Source",
    value: 1,
  },
  {
    name: "Query Text",
    value: 2,
  },
];

const modelChoiceItems = [
  {
    name: "Model Choice Item1",
    value: 0,
  },
  {
    name: "Model Choice Item2",
    value: 1,
  },
  {
    name: "Model Choice Item3",
    value: 2,
  },
];

const gptFlag = [
  {
    name: "No",
    value: 0,
  },
  {
    name: "Yes",
    value: 1,
  },
]

const duplicatedRemove = [
  {
    name: "No",
    value: 0,
  },
  {
    name: "Yes",
    value: 1,
  },
]

const rowsInject = [
  {
    name: "All",
    value: 0,
  },
  {
    name: "None",
    value: 1,
  },
  {
    name: "Custom",
    value: 2,
  },
]

const LLMTool = () => {
  const [selectedTextType, setSelectedTextType] = useState("");
  const [modelChoice, setModelChoice] = useState("")
  const [maxRow, setMaxRow] = useState(10);
  const [timeMax, setTimeMax] = useState(100);
  const [tokenMax, setTokenMax] = useState(20);
  const [isEnableGPT, setIsEnableGPT] = useState(0);
  const [isRemoveDuplicated, setIsRemoveDuplicated] = useState(0);
  const [rowInject, setRowInject] = useState("");
  const [textBoxes, setTextBoxes] = useState([0, 1, 2]);
  const [isRunning, setIsRunning] = useState(false);
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
    if (selectedTextType === "") {
      alert("Please select the Box type...");
      return;
    }
    setTextBoxes((prev) => {
      return [...prev, selectedTextType];
    });
  }, [selectedTextType, setSelectedTextType]);

  const handleRemoveTextBox = (index) => {
    const update = textBoxes.filter((_, i) => i !== index);
    setTextBoxes(update);
  };

  const handleRunStop = useCallback(() => {
    setIsRunning(!isRunning);
  }, [setIsRunning, isRunning]);

  return (
    <div className="d-flex justify-content-center">
      <div
        className={"flex flex-column w-75 overflow-hidden border border-black"}
      >
        <div
          className="w-100 border-bottom border-black d-flex"
          style={{ height: "50px" }}
        >
          <div className="w-25 border-end border-black d-flex text-center">
            <span className="m-auto">Set UP File name</span>
          </div>
          <div className="w-25 border-end border-black d-flex text-center">
            <span className="m-auto">Save/Load Set Up</span>
          </div>
          <div className="w-25 border-end border-black d-flex text-center">
            <span className="m-auto">Data File Name</span>
          </div>
          <div className="w-25 text-center d-flex">
            <span className="m-auto">Export Data</span>
          </div>
        </div>
        <div
          className="w-100 border-bottom border-black d-flex"
          style={{ height: "60px" }}
        >
          <div
            className="border-end border-black d-flex text-center"
            style={{ width: "14%" }}
          >
            <div className="d-flex flex-column w-100">
              <div className="h-50 flex border-bottom border-black">
                <span className="m-auto text-center">Model Choice</span>
              </div>
              <div className="h-50">
                <CustomDropDown items={modelChoiceItems} value={modelChoice} handleSelectChange={setModelChoice} placeholder={"Select Model Choice..."} toggleStyle={{height: "30px"}} toggleClassName={"w-100 select-dropdown border-none rounded-0"} />
              </div>
            </div>
          </div>
          <div
            className="border-end border-black d-flex text-center"
            style={{ width: "14%" }}
          >
            <div className="d-flex flex-column w-100">
              <div className="h-50 flex border-bottom border-black">
                <span className="m-auto text-center">Rows Max</span>
              </div>
              <div className="h-50">
                <Input type='number' value={maxRow} onChange={(e) => setMaxRow(e.target.value)} style={{height: "29px", border: "none"}} className="text-center" />
              </div>
            </div>
          </div>
          <div
            className="border-end border-black d-flex text-center"
            style={{ width: "14%" }}
          >
            <div className="d-flex flex-column w-100">
              <div className="h-50 flex border-bottom border-black">
                <span className="m-auto text-center">Time Max</span>
              </div>
              <div className="h-50">
                <Input type='number' value={timeMax} onChange={(e) => setTimeMax(e.target.value)} style={{height: "29px", border: "none"}} className="text-center" />
              </div>
            </div>
          </div>
          <div
            className="border-end border-black d-flex text-center"
            style={{ width: "15%" }}
          >
            <div className="d-flex flex-column w-100">
              <div className="h-50 flex border-bottom border-black">
                <span className="m-auto text-center">Token Max</span>
              </div>
              <div className="h-50">
                <Input type='number' value={tokenMax} onChange={(e) => setTokenMax(e.target.value)} style={{height: "29px", border: "none"}} className="text-center" />
              </div>
            </div>
          </div>
          <div
            className="border-end border-black d-flex text-center"
            style={{ width: "14%" }}
          >
            <div className="d-flex flex-column w-100">
              <div className="h-50 flex border-bottom border-black">
                <span className="m-auto text-center">Enable GPT</span>
              </div>
              <div className="h-50">
                <CustomDropDown items={gptFlag} value={isEnableGPT} handleSelectChange={setIsEnableGPT} placeholder={"Set Enable GPT Flag..."} toggleStyle={{height: "30px"}} toggleClassName={"w-100 select-dropdown border-none rounded-0"} />
              </div>
            </div>
          </div>
          <div
            className="border-end border-black d-flex text-center"
            style={{ width: "15%" }}
          >
            <div className="d-flex flex-column w-100">
              <div className="h-50 flex border-bottom border-black">
                <span className="m-auto text-center">Remove Duplicated?</span>
              </div>
              <div className="h-50">
                <CustomDropDown items={duplicatedRemove} value={isRemoveDuplicated} handleSelectChange={setIsRemoveDuplicated} placeholder={"Remove Duplicated?"} toggleStyle={{height: "30px"}} toggleClassName={"w-100 select-dropdown border-none rounded-0"} />
              </div>
            </div>
          </div>
          <div className="text-center d-flex" style={{ width: "15%" }}>
            <div className="d-flex flex-column w-100">
              <div className="h-50 flex border-bottom border-black">
                <span className="m-auto text-center">How many rows to inject?</span>
              </div>
              <div className="h-50 flex">
                <div className={rowInject === 2 ? "w-75" : "w-100"}>
                  <CustomDropDown items={rowsInject} value={rowInject} handleSelectChange={setRowInject} placeholder={"Set rows to inject..."} toggleStyle={{height: "30px"}} toggleClassName={"w-100 select-dropdown border-none rounded-0"} />
                </div>
                {rowInject === 2 && <div className="w-25">
                  <Input type='number' value={tokenMax} onChange={(e) => setTokenMax(e.target.value)} style={{height: "29px", border: "none"}} className="border-start border-black rounded-0 text-center" />
                </div>}
              </div>
            </div>
          </div>
        </div>
        <Btn
          className="btn-sm w-100 border border-black mt-1 mb-1"
          title={isRunning ? "Stop" : "Run"}
          onClick={handleRunStop}
        ></Btn>
        <div className={"flex grow"}>
          <div className={"shrink-0 contents"} style={{ width: fileW - 240 }}>
            <div
              className={"flex flex-column w-100"}
              style={{ height: "700px", width: fileW - 240 }}
            >
              <CustomDropDown items={texttypes} value={selectedTextType} handleSelectChange={setSelectedTextType} placeholder={"Select Text Box Type...."} />
              <Btn
                className="btn-sm w-100 border border-black mt-1 mb-1"
                title={"Add Text Box"}
                onClick={handleAddTextBox}
              ></Btn>
              <div className="overflow-auto">
                {textBoxes.map((box, index) => (
                  <div
                    style={{ position: "relative" }}
                    className="border border-black rounded p-1"
                  >
                    {box === 0 && <PromptTextBox />}
                    {box === 1 && <DataSourceTextBox />}
                    {box === 2 && <QueryTextBox />}
                    <span
                      style={{
                        position: "absolute",
                        top: "0px",
                        right: "6px",
                        width: "10px",
                        height: "10px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleRemoveTextBox(index)}
                    >
                      x
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <SampleSplitter isDragging={isFileDragging} {...fileDragBarProps} />
          <div className={"flex grow border-top border-start border-black"}>
            <div className={"grow contents p-3"}>
              <div className="border-bottom border-black h-100 w-100">
                Inter Milan
              </div>
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
    <textarea
      style={{
        resize: "none",
        width: "100%",
        height: "100px",
        padding: "8px",
        border: "none",
      }}
      placeholder={"Enter Prompt Text..."}
    />
  );
};

const DataSourceTextBox = () => {
  return (
    <div>
      <textarea
        style={{
          resize: "none",
          width: "100%",
          height: "65px",
          padding: "8px",
          border: "none",
        }}
        placeholder={"Enter Data Source Address..."}
      />
      <textarea
        style={{
          resize: "none",
          width: "100%",
          height: "100px",
          padding: "8px",
          border: "none",
          borderTop: "solid 1px grey",
        }}
        placeholder={"Enter Data Source OutPut..."}
      />
    </div>
  );
};

const QueryTextBox = () => {
  return (
    <div>
      <textarea
        style={{
          resize: "none",
          width: "100%",
          height: "65px",
          padding: "8px",
          border: "none",
        }}
        placeholder={"Enter Query Text..."}
      />
      <textarea
        style={{
          resize: "none",
          width: "100%",
          height: "80",
          padding: "8px",
          border: "none",
          borderTop: "solid 1px grey",
        }}
        placeholder={"Enter Data Source Address..."}
      />
      <textarea
        style={{
          resize: "none",
          width: "100%",
          height: "80px",
          padding: "8px",
          border: "none",
          borderTop: "solid 1px grey",
        }}
        placeholder={"Enter Data Source OutPut..."}
      />
    </div>
  );
};

export default LLMTool;
