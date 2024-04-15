import Image from "next/image";
import React from "react";

const Img = (props) => {
  const newProps = { ...props, src: process.env.API_PROD_URL + "/" + props["src"] };
  return <Image {...newProps} />;
};

export default Img;
