"use client";

import styles from "./llm-tool.module.scss";
import { useState } from "react";
import { useResizable } from "react-resizable-layout";
import { cn } from "./cn";

const LLMTool = () => {
  const {
    isDragging: isTerminalDragging,
    position: terminalH,
    separatorProps: terminalDragBarProps,
  } = useResizable({
    axis: "y",
    initial: 400,
    min: 50,
    reverse: false,
  });
  const {
    isDragging: isTerminalDragging1,
    position: terminalH1,
    separatorProps: terminalDragBarProps1,
  } = useResizable({
    axis: "y",
    initial: 650,
    min: 50,
    reverse: false,
  });
  const {
    isDragging: isFileDragging,
    position: fileW,
    separatorProps: fileDragBarProps,
  } = useResizable({
    axis: "x",
    initial: 500,
    min: 50,
  });

  return (
    <div className="d-flex justify-content-center">
      <div
        className={"flex flex-column w-75 overflow-hidden border border-black"}
      >
        <div className={"flex grow"}>
          <div
            className={"shrink-0 contents"}
            style={{ width: fileW - 240 }}
          >
            <div className={"flex flex-column w-100"} style={{height: "700px",  width: fileW - 240 }}>
              <div
                className={"shrink-0 contents w-100"}
                style={{ height: terminalH - 280 }}
              >
                  <textarea style={{width: "100%", height: "100%", padding: "8px", border: "none", resize: "none"}} placeholder="Prompt Text" />
              </div>
              <SampleSplitter
                dir={"horizontal"}
                isDragging={isTerminalDragging}
                {...terminalDragBarProps}
              />
              <div className={"flex flex-column w-100"}>
                <div
                  className={"shrink-0 contents w-100"}
                  style={{ height: terminalH1 - 430 }}
                >
                    <textarea style={{width: "100%", height: "100%", padding: "8px", border: "none", resize: "none"}} placeholder="Data Source" />
                </div>
                <SampleSplitter
                  dir={"horizontal"}
                  isDragging={isTerminalDragging1}
                  {...terminalDragBarProps1}
                />
                <div
                  className={"shrink-0 contents"}
                  style={{height: `${700 - terminalH - terminalH1 + 650}px`}}
                >
                    <textarea style={{width: "100%", height: "100%", padding: "8px", border: "none", resize: "none"}} placeholder="Query Text" />
                </div>
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
