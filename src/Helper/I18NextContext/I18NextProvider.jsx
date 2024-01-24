'use client';
import React, { useState } from 'react';
import I18NextContext from '.';

const I18NextProvider = (props) => {
  const [i18Lang, setI18Lang] = useState('');
  return <I18NextContext.Provider value={{ ...props, i18Lang, setI18Lang }}>{props.children}</I18NextContext.Provider>;
};

export default I18NextProvider;
