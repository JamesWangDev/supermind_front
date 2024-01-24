import React from "react";
import { Tooltip } from "reactstrap";

const ColorTooltip = ({ toggle, target, title, tooltipOpen }) => {
  return (
    <Tooltip
      placement={"top"}
      isOpen={tooltipOpen}
      target={target}
      toggle={toggle}
    >
      {title}
    </Tooltip>
  );
};

export default ColorTooltip;
