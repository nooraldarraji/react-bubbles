import React, { useState, useEffect } from "react";
import axiosWithAuth from '../authorization/axiosWithAuth '
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  const [status, setStatus] = useState()

  useEffect(() => {
    axiosWithAuth()
      .get(`http://localhost:5000/api/colors`)
      .then(res => {
        setColorList(res.data);
      });
  }, [status]);

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} setStatus={setStatus} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
