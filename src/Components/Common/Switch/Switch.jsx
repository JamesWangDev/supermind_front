import React, { useState } from 'react';

const Switch = ({ label, checked, onChange }) => {
  const [selected, setSelected] = useState(false);

  const handleToggle = () => {
    setSelected(!selected)
    onChange(!checked);
  };

  return (
    <div className="form-check form-switch cursor-pointer" style={{margin: "0px", display: "flex", minHeight: "22px"}} onClick={handleToggle}>
      <input className="form-check-input" style={{width: 22, height: 14, marginRight: 2, border: "1px solid #0d6efd"}} type="checkbox" id="flexSwitchCheckDefault" checked={selected} onChange={handleToggle} />
      <label className="form-check-label" style={{fontSize: 11, margin: "auto"}} htmlFor="flexSwitchCheckDefault">{label}</label>
    </div>
  );
};

export default Switch;
