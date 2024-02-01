"use client";

import styles from "./llm-tool.module.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import { useResizable } from "react-resizable-layout";
import { cn } from "./cn";
import Btn from "@/Elements/Buttons/Btn";
import CustomDropDown from "@/Components/Common/CustomDropDown/CustomDropDown";
import {Input} from "reactstrap";

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

const rowsInjectItem = [
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
  const fileInputRef = useRef(null);
  const outputfileInputRef = useRef(null);
  const [selectedTextType, setSelectedTextType] = useState("");
  const [modelChoice, setModelChoice] = useState("")
  const [maxRow, setMaxRow] = useState(10);
  const [timeMax, setTimeMax] = useState(100);
  const [tokenMax, setTokenMax] = useState(20);
  const [isEnableGPT, setIsEnableGPT] = useState(0);
  const [isRemoveDuplicated, setIsRemoveDuplicated] = useState(0);
  const [rowInject, setRowInject] = useState("");
  const [customRowsInject, setCustomRowsInject] = useState(10)
  const [textBoxes, setTextBoxes] = useState([0, 1, 2]);
  const [textBoxesData, setTextBoxesData]= useState([
    {
      type: 0,
      text: ""
    },
    {
      type: 1,
      dataSource: "",
      output: ""
    },
    {
      type: 2,
      text: "",
      dataSource: "",
      output: ""
    },
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const [outputData, setOutputdata] = useState([])
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
    const updatedTextBoxData = textBoxesData.filter((_, i) => i !== index);
    setTextBoxes(update)
    setTextBoxesData(updatedTextBoxData)
  };

  const handleRunStop = useCallback(() => {
    setIsRunning(!isRunning);
  }, [setIsRunning, isRunning]);

  const handleChangeTextBoxData = useCallback((boxIndex, data) => {
    setTextBoxesData(prev => {
      const newArray = [...prev];
      newArray[boxIndex] = data;
      return newArray
    })
  }, [setTextBoxesData])

  const handleSaveData = useCallback(() => {
    const data = {
      textBoxes,
      textBoxesData,
      modelChoice,
      maxRow,
      timeMax,
      tokenMax,
      isEnableGPT,
      isRemoveDuplicated,
      rowInject,
      customRowsInject
    }

    const blob = new Blob([JSON.stringify(data)], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.txt';
    link.click();
    URL.revokeObjectURL(url);
  }, [textBoxes, textBoxesData, modelChoice, maxRow, timeMax, tokenMax, isEnableGPT, isRemoveDuplicated, rowInject, customRowsInject])

  const handleLoadData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const contents = e.target.result;
          const jsonData = JSON.parse(contents);
          const keyArray = ["textBoxesData", "textBoxes", "modelChoice", "maxRow", "timeMax", "tokenMax", "isEnableGPT", "isRemoveDuplicated", "rowInject", "customRowsInject"]
          if (keyArray.every(key => jsonData.hasOwnProperty(key))) {
            setTextBoxes(jsonData.textBoxes)
            setTextBoxesData(jsonData.textBoxesData)
            setModelChoice(jsonData.modelChoice)
            setMaxRow(jsonData.maxRow)
            setTimeMax(jsonData.timeMax)
            setTokenMax(jsonData.tokenMax)
            setIsEnableGPT(jsonData.isEnableGPT)
            setIsRemoveDuplicated(jsonData.isRemoveDuplicated)
            setRowInject(jsonData.rowInject)
            setCustomRowsInject(jsonData.customRowsInject)
          } else {
            alert("File Data is unacceptable format.");
            return;
          }
        } catch (error) {
          alert("Cannot parse this file content to JSON data. Please check your file content.....")
          console.error('Error parsing JSON:', error.message);
        }
      };

      reader.readAsText(file);
    }
  }

  const handleLoadBtnClick = useCallback(() => {
    fileInputRef.current.click();
  }, [fileInputRef])

  const handleLoadOutputDataBtnClick = useCallback(() => {
    outputfileInputRef.current.click();
  }, [outputfileInputRef])

  const handleClearData = useCallback(() => {
    setTextBoxes([0,1,2])
    setTextBoxesData([
      {
        type: 0,
        text: ""
      },
      {
        type: 1,
        dataSource: "",
        output: ""
      },
      {
        type: 2,
        text: "",
        dataSource: "",
        output: ""
      },
    ])
    setIsEnableGPT(0)
    setIsRemoveDuplicated(0)
    setMaxRow(10)
    setTimeMax(100)
    setTokenMax(10)
    setRowInject("")
    setOutputdata([])
    fileInputRef.current.value = null;
    outputfileInputRef.current.value = null;
  }, [setTextBoxesData, setIsEnableGPT, setIsRemoveDuplicated, setMaxRow, setModelChoice, setRowInject, setTokenMax, setTimeMax, setTextBoxes, setOutputdata, fileInputRef, outputfileInputRef])

  const handleSaveOutputData = useCallback(() => {
    const data = {
      output: outputData
    }

    const blob = new Blob([JSON.stringify(data)], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'outputData.txt';
    link.click();
    URL.revokeObjectURL(url);
  }, [outputData])

  const handleLoadOutputData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const contents = e.target.result;
          const jsonData = JSON.parse(contents);
          if (jsonData.hasOwnProperty("output")) {
          setOutputdata(jsonData.output)
          } else {
            alert("File Data is unacceptable format.");
            return;
          }
        } catch (error) {
          alert("Cannot parse this file content to JSON data. Please check your file content.....")
          console.error('Error parsing JSON:', error.message);
        }
      };

      reader.readAsText(file);
    }
  }

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleLoadData}
      />
      <input
        type="file"
        ref={outputfileInputRef}
        style={{ display: 'none' }}
        onChange={handleLoadOutputData}
      />
      <div
        className={"flex flex-column w-75 m-auto overflow-hidden border border-black"}
      >
        <div
          className="w-100 border-bottom border-black d-flex"
          style={{ height: "40px" }}
        >
          <div className="d-flex text-center" style={{width: "25%"}}>
            <Btn
              className="btn-sm border border-black w-100"
              title={"Load Setup Data"}
              onClick={handleLoadBtnClick}
            ></Btn>
          </div>
          <div className="d-flex text-center" style={{width: "25%"}}>
            <Btn
              className="btn-sm border border-black w-100"
              title={"Export Setup Data"}
              onClick={handleSaveData}
            ></Btn>
          </div>
          <div className="d-flex text-center" style={{width: "25%"}}>
            <Btn
              className="btn-sm border border-black w-100"
              title={"Clear Setup Data"}
              onClick={handleClearData}
            ></Btn>
          </div>
          <div className="d-flex text-center" style={{width: "25%"}}>
            <Btn
              className="btn-sm border border-black w-100"
              title={"Load Output Data"}
              onClick={handleLoadOutputDataBtnClick}
            ></Btn>
          </div>
          <div className="d-flex text-center" style={{width: "25%"}}>
            <Btn
              className="btn-sm border border-black w-100"
              title={"Save Output Data"}
              onClick={handleSaveOutputData}
            ></Btn>
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
                <div className={rowInject === 2 ? "w-60" : "w-100"}>
                  <CustomDropDown items={rowsInjectItem} value={rowInject} handleSelectChange={setRowInject} placeholder={"Set rows to inject..."} toggleStyle={{height: "30px"}} toggleClassName={"w-100 select-dropdown border-none rounded-0"} />
                </div>
                {rowInject === 2 && <div className="w-50">
                  <Input type='number' value={customRowsInject} onChange={(e) => setCustomRowsInject(e.target.value)} style={{height: "29px", border: "none"}} className="border-start border-black rounded-0 text-center" />
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
                    {box === 0 && <PromptTextBox boxIndex={index} data={textBoxesData[index]} handleChangeTextBoxData={handleChangeTextBoxData} />}
                    {box === 1 && <DataSourceTextBox boxIndex={index} data={textBoxesData[index]} handleChangeTextBoxData={handleChangeTextBoxData} />}
                    {box === 2 && <QueryTextBox boxIndex={index} data={textBoxesData[index]} handleChangeTextBoxData={handleChangeTextBoxData} />}
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
          <div className={"w-100 border-top border-start border-black p-1"} style={{height: "700px", width: "200", fontSize: 16}}>
            {outputData.length > 0 ? outputData.map((data, index) => (
              <div className={`${index < outputData.length - 1 && "border-bottom border-black"} w-100 p-2 d-flex flex-column`} style={{height: `${100 / outputData.length}%` }}>
                <div className="fw-bold">{data.label}</div>
                <hr className="mt-2 mb-1"/>
                <div className="text-wrap overflow-auto ps-1 pe-1" style={{fontSize: 15}}>
                  {data.text}
                </div>
              </div>
            )) : 
            <div className="w-100 h-100 d-flex">
              <span className="m-auto">No OutPut Data</span>
            </div>}
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

const PromptTextBox = ({boxIndex, data, handleChangeTextBoxData}) => {
  const [text, setText] = useState();

  useEffect(() => {
    handleChangeTextBoxData(boxIndex, {type:0, text})
  }, [text])

  return (
    <textarea
      style={{
        resize: "none",
        width: "100%",
        height: "100px",
        padding: "8px",
        border: "none",
      }}
      value={data && Object.keys(data).includes("text") ? data.text : ""}
      onChange={(e) => setText(e.target.value)}
      placeholder={"Enter Prompt Text..."}
    />
  );
};

const DataSourceTextBox = ({boxIndex, data, handleChangeTextBoxData}) => {
  const [dataSource, setDataSource] = useState()
  const [output, setOutput] = useState()

  useEffect(() => {
    handleChangeTextBoxData(boxIndex, {type:1, dataSource, output})
  }, [dataSource, output])

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
        value={data && Object.keys(data).includes("dataSource") ? data.dataSource : ""}
        onChange={(e) => setDataSource(e.target.value)}
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
        value={data && Object.keys(data).includes("output") ? data.output : ""}
        onChange={(e) => setOutput(e.target.value)}
        placeholder={"Enter Data Source OutPut..."}
      />
    </div>
  );
};

const QueryTextBox = ({boxIndex, data, handleChangeTextBoxData}) => {
  const [text, setText] = useState();
  const [dataSource, setDataSource] = useState()
  const [output, setOutput] = useState()

  useEffect(() => {
    handleChangeTextBoxData(boxIndex, {type:2, text, dataSource, output})
  }, [dataSource, output, text])

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
        value={data && Object.keys(data).includes("text") ? data.text : ""}
        onChange={(e) => setText(e.target.value)}
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
        value={data && Object.keys(data).includes("dataSource") ? data.dataSource : ""}
        onChange={(e) => setDataSource(e.target.value)}
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
        value={data && Object.keys(data).includes("output") ? data.output : ""}
        onChange={(e) => setOutput(e.target.value)}
        placeholder={"Enter Data Source OutPut..."}
      />
    </div>
  );
};

export default LLMTool;
