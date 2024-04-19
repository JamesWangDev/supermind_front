"use client";

import styles from "./llm-tool.module.scss";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useResizable } from "react-resizable-layout";
import { cn } from "./cn";
import Btn from "@/Elements/Buttons/Btn";
import CustomDropDown from "@/Components/Common/CustomDropDown/CustomDropDown";
import {Input} from "reactstrap";
import Switch from "@/Components/Common/Switch/Switch";
import axios from "axios";

// const prePrompt = `\n Just need only JSON Array output and the id, label, text properties must exist in the each array element in the following structure.\n [
//   {
//     "id": number,
//     "label": string,
//     "text": string,
//   },
//   {
//     "id": number,
//     "label": string,
//     "text": string,
//   },
//   ...
// ]`

// const secondPrompt = `\n BEGIN_DIRECTIVE
// MODE: "Iterative Data Generation and Format Correction"
// INSTRUCTION: """
// 1. Review the input from the last GPT output, ensuring it matches the desired JSON format with 'id', 'label', and 'text' fields for data continuation.
// 2. Correct any JSON format errors from the previous output to align with the specified structure.
// 3. Increment the last 'id' value based on the highest 'id' found in the corrected data.
// 4. Generate new JSON objects for additional data requested, ensuring each has a unique 'id', and appropriate 'label' and 'text' fields.
// 5. Avoid duplication with existing data, maintaining a clean and unique dataset.
// 6. Output only new JSON objects, directly appending them to the corrected dataset without including explanatory text.
// 7. Ensure the output strictly consists of a JSON Array with the elements adhering to the specified properties: 'id', 'label', 'text'.
// 8. After processing, if the current dataset does not yet meet the desired quantity (e.g., 100 pet names), prepare the output for a potential next iteration by including a special 'Fix Format' directive for the next LLM process.
// 9. This directive should guide the next GPT instance to correct any format issues and continue data generation, aiming for the project goal without exceeding response length limits.
// """
// JUST_NEED: "Output should be a JSON Array with only the new data appended, following the defined id, label, text schema."
// END_DIRECTIVE`

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
    name: "gpt-3.5-turbo",
    value: 0,
  },
  {
    name: "gpt-3.5-turbo-0125",
    value: 1,
  },
  {
    name: "gpt-3.5-turbo-1106",
    value: 2,
  },
  {
    name: "gpt-3.5-turbo-instruct",
    value: 3,
  },
  {
    name: "gpt-3.5-turbo-16k-0613",
    value: 4,
  },
  {
    name: "gpt-4-0125-preview",
    value: 5,
  },
  {
    name: "gpt-4-turbo-preview",
    value: 6,
  },
  {
    name: "gpt-4-vision-preview",
    value: 7,
  }
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
  const [selectedTextType, setSelectedTextType] = useState(0);
  const [modelChoice, setModelChoice] = useState(0)
  const [maxRow, setMaxRow] = useState(10);
  const [timeMax, setTimeMax] = useState(10);
  const [tokenMax, setTokenMax] = useState(20);
  const [isEnableGPT, setIsEnableGPT] = useState(0);
  const [isRemoveDuplicated, setIsRemoveDuplicated] = useState(0);
  const [rowInject, setRowInject] = useState("");
  const [customRowsInject, setCustomRowsInject] = useState(10)
  const [textBoxes, setTextBoxes] = useState([0, 0]);
  const [textBoxesData, setTextBoxesData]= useState([
    {
      type: 0,
      text: ""
    },
    {
      type: 0,
      text: ""
    }
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
  const [promptText, setPromptText] = useState("");
  const [dataString, setDataString] = useState("");
  const [currentLoop, setCurrentLoop] = useState(0);

  useEffect(() => {
    if(textBoxesData.length === 0) return;
    let promptText = "";
    let isPromtAdded = false;

    textBoxesData.map(box => {
      if(box.type === 0 && box.text) {
        if(!isPromtAdded) {
          promptText +=  `Prompt Text:\n`;
          isPromtAdded = true;
        }
        promptText += `${box.text}\n`;
      }
    })

    setPromptText(promptText)
  }, [textBoxesData])

  const handleSetDataString = (outputData) => {
    if(outputData.length == 0) return;
    let dataString = "";
    let isDataAdded = false;

    if(outputData.length > 0) {
      outputData.map((data, index) => {
        if(data.label || data.text) {
          if(!isDataAdded) {
            dataString +=  `BEGIN PDB(Previous Data Block//This is the data you produced on the last iteration of this prompt. Do not items duplicate in this response. check the data above for duplicates and replace any duplicated JSON packages with new ones with the same ID\n`;
            isDataAdded = true;
          }
          dataString += `ID: ${(index + 1)}: Label: ${data.label}\n`;
          dataString += `ID: ${(index + 1)}: Data: ${data.text}\n`;
          if(index === outputData.length - 1) {
            dataString += `\n\nEND PDB`;
          }
        }
      })
    }
    setDataString(dataString)
  }

  useEffect(() => {
    if(!isRunning || currentLoop > timeMax - 1) {
      setIsRunning(false);
      return;
    };
    if(modelChoice === "") {
      alert("Please select Model Choice you want...");
      return;
    }

    if(!promptText) {
      alert("Please enter the prompt text...")
      return;
    }

    callGPT();
  }, [currentLoop, isRunning])

  const callGPT = async () => {
    try {
      const apiKey = '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'; // Replace with your ChatGPT 4.0 API key
      const apiUrl = 'https://api.openai.com/v1/chat/completions'; // Endpoint for ChatGPT 4.0 completions
      const requestBody = {
        model: modelChoiceItems[modelChoice].name,
        messages: [
          {
            role: 'user',
            content: `${dataString}${promptText}`
          }
        ]
      };
      
      const response = await axios.post(apiUrl, requestBody, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      });

      try {
        const responseData = JSON.parse(response.data.choices[0].message.content.trim());
        if(Array.isArray(responseData) && responseData.every(item => typeof item === 'object' && 'label' in item && 'text' in item)) {
          setOutputdata((prev) => {
            const updatedOutPutData = [...prev, ...responseData]
            handleSetDataString(updatedOutPutData)
            return updatedOutPutData;
          });
        } else {
          setOutputdata((prev) => {
            const updatedOutPutData = [...prev, {id: "none", label: "wrong response form from GPT", text: response.data.choices[0].message.content.trim()}]
            handleSetDataString(updatedOutPutData)
            return updatedOutPutData;
          });
        }
        setCurrentLoop(prev => prev + 1)
      } catch (error) {
        console.log("cannot parse to JSON");
        setOutputdata((prev) => {
          const updatedOutPutData = [...prev, {id: "none", label: "Not JSON response", text: response.data.choices[0].message.content.trim()}]
          handleSetDataString(updatedOutPutData)
          return updatedOutPutData;
        });
        setCurrentLoop(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error fetching response:', error);
      alert('Error fetching response. Please try again.');
      setIsRunning(false);
      setCurrentLoop(0);
    }
  }

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
            fileInputRef.current.value = null;
          } else {
            alert("File Data is unacceptable format.");
            fileInputRef.current.value = null;
            return;
          }
        } catch (error) {
          alert("Cannot parse this file content to JSON data. Please check your file content.....")
          console.error('Error parsing JSON:', error.message);
          fileInputRef.current.value = null;
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
    setTextBoxes([0,0])
    setTextBoxesData([
      {
        type: 0,
        text: ""
      },
      {
        type: 0,
        text: ""
      }
    ])
    setIsEnableGPT(0)
    setIsRemoveDuplicated(0)
    setMaxRow(10)
    setTimeMax(10)
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

  const clearOutputData = useCallback(() => {
    setOutputdata([]);
    setCurrentLoop(0);
    setDataString("");
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
            handleSetDataString(jsonData.output)
            outputfileInputRef.current.value = null;
          } else {
            alert("File Data is unacceptable format.");
            outputfileInputRef.current.value = null;
            return;
          }
        } catch (error) {
          alert("Cannot parse this file content to JSON data. Please check your file content.....")
          console.error('Error parsing JSON:', error.message);
          outputfileInputRef.current.value = null;
        }
      };

      reader.readAsText(file);
    }
  }
  
  const exportPromptText = useCallback(() => {
    if(!promptText) {
      alert("Please enter the prompt text...")
      return;
    }

    // if(!dataString) {
    //   alert("Load output data first....")
    //   return
    // }

    const blob = new Blob([dataString + promptText], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'prompt_text.txt';
    link.click();
    URL.revokeObjectURL(url);
  }, [promptText, dataString]) 

  const stopCallGPT = useCallback(() => {
    setIsRunning(false);
  }, [])

  const handleOnClickRun = useCallback(() => {
    if(currentLoop > timeMax - 1) {
      const rv = confirm("You reached to Max loop already, Do you want to clear the current loop and continue?");
      if (rv) {
        setCurrentLoop(0);
      }
    }
    setIsRunning(true);
  }, [setIsRunning, currentLoop, timeMax])

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
        className={"flex flex-column w-75 m-auto mb-4 rounded-3 overflow-hidden"}
        style={{backgroundColor: "#28243D"}}
      >
        <div
          className="w-100 d-flex"
          style={{ height: "40px" }}
        >
          <div className="d-flex text-center" style={{width: "17%"}}>
            <Btn
              className="btn-sm rounded-3 me-1 w-100"
              title={"Load Setup Data"}
              onClick={handleLoadBtnClick}
            ></Btn>
          </div>
          <div className="d-flex text-center" style={{width: "16%"}}>
            <Btn
              className="btn-sm rounded-3 me-1 w-100"
              title={"Export Setup Data"}
              onClick={handleSaveData}
            ></Btn>
          </div>
          <div className="d-flex text-center" style={{width: "16%"}}>
            <Btn
              className="btn-sm rounded-3 me-1 w-100"
              title={"Clear Setup Data"}
              onClick={handleClearData}
            ></Btn>
          </div>
          <div className="d-flex text-center" style={{width: "16%"}}>
            <Btn
              className="btn-sm rounded-3 me-1 w-100"
              title={"Load Output Data"}
              onClick={handleLoadOutputDataBtnClick}
            ></Btn>
          </div>
          <div className="d-flex text-center" style={{width: "17%"}}>
            <Btn
              className="btn-sm rounded-3 me-1 w-100"
              title={"Save Output Data"}
              onClick={handleSaveOutputData}
            ></Btn>
          </div>
          <div className="d-flex text-center" style={{width: "17%"}}>
            <Btn
              className="btn-sm rounded-3 me-1 w-100"
              title={"Clear Output Data"}
              onClick={clearOutputData}
            ></Btn>
          </div>
          <div className="d-flex text-center" style={{width: "17%"}}>
            <Btn
              className="btn-sm rounded-3 w-100"
              title={"Export Prompt Data"}
              onClick={exportPromptText}
            ></Btn>
          </div>
        </div>
        <div
          className="w-100 d-flex gap-1"
          style={{ height: "80px" }}
        >
          <div
            className="d-flex text-center"
            style={{ width: "15%" }}
          >
            <div className="d-flex flex-column w-100">
              <div className="h-50 flex">
                <span className="m-auto text-center">Model Choice</span>
              </div>
              <div className="h-50">
                <CustomDropDown items={modelChoiceItems} value={modelChoice} handleSelectChange={setModelChoice} placeholder={"Select Model Choice..."} toggleStyle={{height: "40px"}} toggleClassName={"w-100 select-dropdown rounded-3"} />
              </div>
            </div>
          </div>
          <div
            className="d-flex text-center"
            style={{ width: "14%" }}
          >
            <div className="d-flex flex-column w-100">
              <div className="h-50 flex">
                <span className="m-auto text-center">Rows Max</span>
              </div>
              <div className="h-50">
                <Input type='number' value={maxRow} onChange={(e) => setMaxRow(e.target.value)} style={{height: "40px", border: "none"}} className="text-center" />
              </div>
            </div>
          </div>
          <div
            className="d-flex text-center"
            style={{ width: "14%" }}
          >
            <div className="d-flex flex-column w-100">
              <div className="h-50 flex">
                <span className="m-auto text-center">Max Loops</span>
              </div>
              <div className="h-50">
                <Input type='number' value={timeMax} onChange={(e) => setTimeMax(e.target.value)} style={{height: "40px", border: "none"}} className="text-center" />
              </div>
            </div>
          </div>
          <div
            className="d-flex text-center"
            style={{ width: "14%" }}
          >
            <div className="d-flex flex-column w-100">
              <div className="h-50 flex">
                <span className="m-auto text-center">Token Max</span>
              </div>
              <div className="h-50">
                <Input type='number' value={tokenMax} onChange={(e) => setTokenMax(e.target.value)} style={{height: "40px", border: "none"}} className="text-center" />
              </div>
            </div>
          </div>
          <div
            className="d-flex text-center"
            style={{ width: "14%" }}
          >
            <div className="d-flex flex-column w-100">
              <div className="h-50 flex">
                <span className="m-auto text-center">Enable GPT</span>
              </div>
              <div className="h-50">
                <CustomDropDown items={gptFlag} value={isEnableGPT} handleSelectChange={setIsEnableGPT} placeholder={"Set Enable GPT Flag..."} toggleStyle={{height: "40px"}} toggleClassName={"w-100 select-dropdown rounded-3"} />
              </div>
            </div>
          </div>
          <div
            className="d-flex text-center"
            style={{ width: "15%" }}
          >
            <div className="d-flex flex-column w-100">
              <div className="h-50 flex">
                <span className="m-auto text-center">Remove Duplicated?</span>
              </div>
              <div className="h-50">
                <CustomDropDown items={duplicatedRemove} value={isRemoveDuplicated} handleSelectChange={setIsRemoveDuplicated} placeholder={"Remove Duplicated?"} toggleStyle={{height: "40px"}} toggleClassName={"w-100 select-dropdown rounded-3"} />
              </div>
            </div>
          </div>
          <div className="text-center d-flex" style={{ width: "15%" }}>
            <div className="d-flex flex-column w-100">
              <div className="h-50 flex">
                <span className="m-auto text-center">How many rows to inject?</span>
              </div>
              <div className="h-50 flex">
                <div className={rowInject === 2 ? "w-60" : "w-100"}>
                  <CustomDropDown items={rowsInjectItem} value={rowInject} handleSelectChange={setRowInject} placeholder={"Set rows to inject..."} toggleStyle={{height: "40px"}} toggleClassName={"w-100 select-dropdown rounded-3"} />
                </div>
                {rowInject === 2 && <div className="w-50">
                  <Input type='number' value={customRowsInject} onChange={(e) => setCustomRowsInject(e.target.value)} style={{height: "40px", border: "none"}} className="border-start border-grey rounded-3 text-center" />
                </div>}
              </div>
            </div>
          </div>
        </div>
        <div className="w-100 flex" style={{height: 56, fontSize: 16}}>
          <div className="d-flex justify-content-center" style={{width: "25%"}}>
            {<span className="m-auto">Model: <span style={{color: "red", fontWeight: "bold"}}>{modelChoice !== "" ? modelChoiceItems[modelChoice].name : "Not selected"}</span></span>}
          </div>
          <div className="d-flex justify-content-center" style={{width: "25%"}}>
            <span className="m-auto">Rows Affected: <span style={{color: "red", fontWeight: "bold"}}>{outputData.length}</span></span>
          </div>
          <div className="d-flex justify-content-center" style={{width: "25%"}}>
            <span className="m-auto">Current Loop Index: <span style={{color: "red", fontWeight: "bold"}}>{currentLoop}</span></span>
          </div>
          <div className="d-flex justify-content-center" style={{width: "25%"}}>
            <span className="m-auto">Max Token: <span style={{color: "red", fontWeight: "bold"}}>{tokenMax}</span></span>
          </div>
        </div>
        <Btn
          className="btn-sm w-100 rounded-3 mb-1"
          title={isRunning ? "Stop" : "Run"}
          onClick={isRunning? stopCallGPT : handleOnClickRun}
        ></Btn>
        <div className={"flex grow"}>
          <div className={"shrink-0 contents"} style={{ width: fileW - 240 }}>
            <div
              className={"flex flex-column w-100"}
              style={{ height: "700px", width: fileW - 240 }}
            >
              <CustomDropDown items={texttypes} value={selectedTextType} handleSelectChange={setSelectedTextType} placeholder={"Select Text Box Type...."} toggleClassName={"w-100 select-dropdown rounded-3"} />
              <Btn
                className="btn-sm w-100 rounded-3 mt-1 mb-1"
                title={"Add Text Box"}
                onClick={handleAddTextBox}
              ></Btn>
              <div className="overflow-auto">
                {textBoxes.map((box, index) => (
                  <div
                    style={{ position: "relative", backgroundColor: "#28243D" }}
                    className="rounded-0 p-1 border-top border-bottom border-grey mt-1"
                    key={`textBoxes${index}`}
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
          <div className={"w-100 p-1 overflow-auto"} style={{height: "700px", width: "200", fontSize: 16}}>
            {
            // outputData.length > 0 && outputData.length === 1 ? 
              // (<div className="text-wrap overflow-auto ps-1 pe-1" style={{fontSize: 15}}>
              //   {outputData[0]}
              // </div>) :
              // (
              outputData && outputData.length > 0 ? (outputData.sort((a, b) => a?.id - b?.id).map((data, index) => {
                return (
                  <div style={{height: '120px', backgroundColor: "#443F63"}} className={`${index < outputData.length - 1 && "mb-1"} w-100 p-2 d-flex flex-column rounded-3`}>
                    <div className="fw-bold">ID: {data.hasOwnProperty("id") ? data.id : ""} - {data.hasOwnProperty("label") ? data.label : ""}</div>
                    <hr className="mt-2 mb-1"/>
                    <div className="text-wrap overflow-auto ps-1 pe-1" style={{fontSize: 15}}>
                      {data.hasOwnProperty("text") ? data.text : ""}
                    </div>
                  </div>
                )
              }))
              :
              <div className="w-100 h-100 d-flex">
                <span className="m-auto">No OutPut Data</span>
              </div>
            // )
            }
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
  const fileInputRef = useRef(null);
  const [text, setText] = useState(data && data.text ? data.text : '');
  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(0);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      // Save current selection range
      const { selectionStart, selectionEnd } = textareaRef.current;
      setSelectionStart(selectionStart);
      setSelectionEnd(selectionEnd);
    }
    // Update text state with new data text
    setText(data && data.text ? data.text : '');
  }, [data]);

  useEffect(() => {
    if (textareaRef.current) {
      // Restore selection range after text update
      textareaRef.current.setSelectionRange(selectionStart, selectionEnd);
    }
  }, [selectionStart, selectionEnd]);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  useEffect(() => {
    handleChangeTextBoxData(boxIndex, {type:0, text})
  }, [text])

  const handleLoadData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const contents = e.target.result;
          const jsonData = JSON.parse(contents);
          if (jsonData.hasOwnProperty("promptText")) {
            setText(jsonData.promptText)
            fileInputRef.current.value = null;
          } else {
            alert("File Data is unacceptable format.");
            fileInputRef.current.value = null;
            return;
          }
        } catch (error) {
          alert("Cannot parse this file content to JSON data. Please check your file content.....")
          console.error('Error parsing JSON:', error.message);
          fileInputRef.current.value = null;
        }
      };

      reader.readAsText(file);
    }
  }

  const handleSaveData = useCallback(() => {
    if(!text) {
      alert("Cannot save empty data.")
      return;
    }
    const data = {
      promptText: text
    }

    const blob = new Blob([JSON.stringify(data)], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `prompt_text_box_id_${boxIndex}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  }, [text])

  const handleOnclickLoadBtn = useCallback(() => {
    fileInputRef.current.click();
  }, [fileInputRef])

  const handleClearData = useCallback(() => {
    setText("");
    fileInputRef.current.value = null;
  }, [setText])

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleLoadData}
      />
      <div className="d-flex mt-1 mb-1">
        <Btn className="me-1 fw-bold rounded-3" onClick={handleOnclickLoadBtn} style={{fontSize: 13, height: "20px", width: "80px", padding: "8px"}}>Load file</Btn>
        <Btn className="me-1 fw-bold rounded-3" onClick={handleSaveData} style={{fontSize: 13, height: "20px", width: "80px", padding: "8px"}}>Save file</Btn>
        <Btn className="fw-bold rounded-3" onClick={handleClearData} style={{fontSize: 13, height: "20px", width: "80px", padding: "8px"}}>Clear</Btn>
      </div>
      <div
        style={{
          width: "100%",
          height: "100px",
          padding: "1px",
          border: "none",
          display: "flex"
        }}
      >
        <textarea
          ref={textareaRef}
          style={{
            resize: "none",
            width: "75%",
            height: "100px",
            padding: "4px",
            border: "none",
          }}
          value={text}
          onChange={handleTextChange}
          placeholder={"Enter Prompt Text..."}
        />
        <div
          style={{
            width: "25%",
            height: "100px",
            padding: "2px",
            border: "none",
            display: "flex",
            alignItems: "center"
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "70%",
              margin: "auto"
            }}
          >
            <Switch label={"Required"} checked={true} onChange={() => {}} />
            <Switch label={"AutoRun"} checked={true} onChange={() => {}} />
            <Switch label={"Loop"} checked={true} onChange={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
};

const DataSourceTextBox = ({boxIndex, data, handleChangeTextBoxData}) => {
  const fileInputRef = useRef(null);
  const [dataSource, setDataSource] = useState(data && data.dataSource ? data.dataSource : '')
  const [output, setOutput] = useState(data && data.output ? data.output : '')
  const [selectionStart1, setSelectionStart1] = useState(0);
  const [selectionEnd1, setSelectionEnd1] = useState(0);
  const textareaRef1 = useRef(null);
  const [selectionStart2, setSelectionStart2] = useState(0);
  const [selectionEnd2, setSelectionEnd2] = useState(0);
  const textareaRef2 = useRef(null);

  useEffect(() => {
    if (textareaRef1.current) {
      // Save current selection range
      const { selectionStart1, selectionEnd1 } = textareaRef1.current;
      setSelectionStart1(selectionStart1);
      setSelectionEnd1(selectionEnd1);
    }

    if (textareaRef2.current) {
      // Save current selection range
      const { selectionStart2, selectionEnd2 } = textareaRef2.current;
      setSelectionStart2(selectionStart2);
      setSelectionEnd2(selectionEnd2);
    }
    // Update text state with new data text
    setDataSource(data && data.dataSource ? data.dataSource : '')
    setOutput(data && data.output ? data.output : '')
  }, [data]);

  useEffect(() => {
    if (textareaRef1.current) {
      // Restore selection range after text update
      textareaRef1.current.setSelectionRange(selectionStart1, selectionEnd1);
    }
  }, [selectionStart1, selectionEnd1]);

  useEffect(() => {
    if (textareaRef2.current) {
      // Restore selection range after text update
      textareaRef2.current.setSelectionRange(selectionStart2, selectionEnd2);
    }
  }, [selectionStart2, selectionEnd2]);

  useEffect(() => {
    handleChangeTextBoxData(boxIndex, {type:1, dataSource, output})
  }, [dataSource, output])

  const handleLoadData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const contents = e.target.result;
          const jsonData = JSON.parse(contents);
          const keyArray = ["dataSource", "output"]
          if (keyArray.every(key => jsonData.hasOwnProperty(key))) {
            setDataSource(jsonData.dataSource);
            setOutput(jsonData.output);
            fileInputRef.current.value = null;
          } else {
            alert("File Data is unacceptable format.");
            fileInputRef.current.value = null;
            return;
          }
        } catch (error) {
          alert("Cannot parse this file content to JSON data. Please check your file content.....")
          console.error('Error parsing JSON:', error.message);
          fileInputRef.current.value = null;
        }
      };

      reader.readAsText(file);
    }
  }

  const handleSaveData = useCallback(() => {
    if(!dataSource && !output) {
      alert("Cannot save empty data.")
      return;
    }

    const data = {
      dataSource: dataSource ? dataSource : "",
      output: output ? output : ""
    }

    const blob = new Blob([JSON.stringify(data)], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `data_source_box_id_${boxIndex}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  }, [dataSource, output])

  const handleOnclickLoadBtn = useCallback(() => {
    fileInputRef.current.click();
  }, [fileInputRef])

  const handleClearData = useCallback(() => {
    setDataSource("");
    setOutput("");
    fileInputRef.current.value = null;
  }, [setDataSource, setOutput])

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleLoadData}
      />
      <div className="d-flex mt-1 mb-1">
        <Btn className="me-1 fw-bold rounded-3" onClick={handleOnclickLoadBtn} style={{fontSize: 13, height: "20px", width: "80px", padding: "8px"}}>Load file</Btn>
        <Btn className="me-1 fw-bold rounded-3" onClick={handleSaveData} style={{fontSize: 13, height: "20px", width: "80px", padding: "8px"}}>Save file</Btn>
        <Btn className="fw-bold rounded-3" onClick={handleClearData} style={{fontSize: 13, height: "20px", width: "80px", padding: "8px"}}>Clear</Btn>
      </div>
      <div
        style={{
          width: "100%",
          padding: "2px",
          border: "none",
          display: "flex"
        }}
      >
        <div style={{width: "75%"}}>
          <textarea
            ref={textareaRef1}
            style={{
              resize: "none",
              width: "100%",
              height: "65px",
              padding: "4px",
              border: "none"
            }}
            value={dataSource}
            onChange={(e) => setDataSource(e.target.value)}
            placeholder={"Enter Data Source Address..."}
          />
          <textarea
            ref={textareaRef2}
            style={{
              resize: "none",
              width: "100%",
              height: "100px",
              padding: "4px",
              border: "none",
            }}
            value={output}
            onChange={(e) => setOutput(e.target.value)}
            placeholder={"Enter Data Source OutPut..."}
          />
        </div>
        <div
          style={{
            width: "25%",
            height: "165px",
            padding: "2px",
            border: "none",
            display: "flex",
            alignItems: "center"
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "42%",
              margin: "auto"
            }}
          >
            <Switch label={"Required"} checked={true} onChange={() => {}} />
            <Switch label={"AutoRun"} checked={true} onChange={() => {}} />
            <Switch label={"Loop"} checked={true} onChange={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
};

const QueryTextBox = ({boxIndex, data, handleChangeTextBoxData}) => {
  const fileInputRef = useRef(null);
  const [text, setText] = useState(data && data.text ? data.text : '');
  const [dataSource, setDataSource] = useState(data && data.dataSource ? data.dataSource : '')
  const [output, setOutput] = useState(data && data.output ? data.output : '')
  const [selectionStart1, setSelectionStart1] = useState(0);
  const [selectionEnd1, setSelectionEnd1] = useState(0);
  const textareaRef1 = useRef(null);
  const [selectionStart2, setSelectionStart2] = useState(0);
  const [selectionEnd2, setSelectionEnd2] = useState(0);
  const textareaRef2 = useRef(null);
  const [selectionStart3, setSelectionStart3] = useState(0);
  const [selectionEnd3, setSelectionEnd3] = useState(0);
  const textareaRef3 = useRef(null);

  useEffect(() => {
    if (textareaRef1.current) {
      // Save current selection range
      const { selectionStart1, selectionEnd1 } = textareaRef1.current;
      setSelectionStart1(selectionStart1);
      setSelectionEnd1(selectionEnd1);
    }

    if (textareaRef2.current) {
      // Save current selection range
      const { selectionStart2, selectionEnd2 } = textareaRef2.current;
      setSelectionStart2(selectionStart2);
      setSelectionEnd2(selectionEnd2);
    }

    if (textareaRef3.current) {
      // Save current selection range
      const { selectionStart3, selectionEnd3 } = textareaRef3.current;
      setSelectionStart3(selectionStart3);
      setSelectionEnd3(selectionEnd3);
    }
    // Update text state with new data text
    setDataSource(data && data.dataSource ? data.dataSource : '');
    setText(data && data.text ? data.text : '');
    setOutput(data && data.output ? data.output : '')
  }, [data]);

  useEffect(() => {
    if (textareaRef1.current) {
      // Restore selection range after text update
      textareaRef1.current.setSelectionRange(selectionStart1, selectionEnd1);
    }
  }, [selectionStart1, selectionEnd1]);

  useEffect(() => {
    if (textareaRef2.current) {
      // Restore selection range after text update
      textareaRef2.current.setSelectionRange(selectionStart2, selectionEnd2);
    }
  }, [selectionStart2, selectionEnd2]);

  useEffect(() => {
    if (textareaRef3.current) {
      // Restore selection range after text update
      textareaRef3.current.setSelectionRange(selectionStart3, selectionEnd3);
    }
  }, [selectionStart3, selectionEnd3]);

  useEffect(() => {
    handleChangeTextBoxData(boxIndex, {type:2, text, dataSource, output})
  }, [dataSource, output, text])

  const handleLoadData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const contents = e.target.result;
          const jsonData = JSON.parse(contents);
          const keyArray = ["dataSource", "output", "text"]
          if (keyArray.every(key => jsonData.hasOwnProperty(key))) {
            setDataSource(jsonData.dataSource);
            setOutput(jsonData.output);
            setText(jsonData.text);
            fileInputRef.current.value = null;
          } else {
            alert("File Data is unacceptable format.");
            fileInputRef.current.value = null;
            return;
          }
        } catch (error) {
          alert("Cannot parse this file content to JSON data. Please check your file content.....")
          console.error('Error parsing JSON:', error.message);
          fileInputRef.current.value = null;
        }
      };

      reader.readAsText(file);
    }
  }

  const handleSaveData = useCallback(() => {
    if(!dataSource && !output && !text) {
      alert("Cannot save empty data.")
      return;
    }

    const data = {
      dataSource: dataSource ? dataSource : "",
      output: output ? output : "",
      text: text ? text : ""
    }

    const blob = new Blob([JSON.stringify(data)], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `query_text_box_id_${boxIndex}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  }, [dataSource, output, text])

  const handleOnclickLoadBtn = useCallback(() => {
    fileInputRef.current.click();
  }, [fileInputRef])

  const handleClearData = useCallback(() => {
    setDataSource("");
    setOutput("");
    setText("");
    fileInputRef.current.value = null;
  }, [setDataSource, setOutput, setText])

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleLoadData}
      />
      <div className="d-flex mt-1 mb-1">
        <Btn className="me-1 fw-bold rounded-3" onClick={handleOnclickLoadBtn} style={{fontSize: 13, height: "20px", width: "80px", padding: "8px"}}>Load file</Btn>
        <Btn className="me-1 fw-bold rounded-3" onClick={handleSaveData} style={{fontSize: 13, height: "20px", width: "80px", padding: "8px"}}>Save file</Btn>
        <Btn className="fw-bold rounded-3" onClick={handleClearData} style={{fontSize: 13, height: "20px", width: "80px", padding: "8px"}}>Clear</Btn>
      </div>
      <div
        style={{
          width: "100%",
          padding: "2px",
          border: "none",
          display: "flex"
        }}
      >
        <div style={{width: "75%"}}>
          <textarea
            ref={textareaRef1}
            style={{
              resize: "none",
              width: "100%",
              height: "65px",
              padding: "4px",
              border: "none",
            }}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={"Enter Query Text..."}
          />
          <textarea
            ref={textareaRef2}
            style={{
              resize: "none",
              width: "100%",
              height: "80px",
              padding: "4px",
              border: "none",
            }}
            value={dataSource}
            onChange={(e) => setDataSource(e.target.value)}
            placeholder={"Enter Data Source Address..."}
          />
          <textarea
            ref={textareaRef3}
            style={{
              resize: "none",
              width: "100%",
              height: "80px",
              padding: "4px",
              border: "none",
            }}
            value={output}
            onChange={(e) => setOutput(e.target.value)}
            placeholder={"Enter Data Source OutPut..."}
          />
        </div>
        <div
          style={{
            width: "25%",
            height: "225px",
            padding: "2px",
            border: "none",
            display: "flex",
            alignItems: "center"
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "30%",
              margin: "auto"
            }}
          >
            <Switch label={"Required"} checked={true} onChange={() => {}} />
            <Switch label={"AutoRun"} checked={true} onChange={() => {}} />
            <Switch label={"Loop"} checked={true} onChange={() => {}} />
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default LLMTool;