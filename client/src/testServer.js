import axios from "axios";
import { useState, useEffect } from "react";
import StorageKeys from "./constants/storageKeys";

function TestServer() {
  const accessToken = localStorage.getItem(StorageKeys.accessToken);

  const [list, setList] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_API_URL}/post/`, {
  //       headers: { accessToken },
  //     })
  //     .then((res) => {
  //       setList(res.data.listOfPost);
  //     });
  // }, []);

  let a = "sfkkkkkkkkkkkkkkkavatar(1).svg".slice(-13);
  let b = {};
  let c = 2;
  console.log(c);
  if (c > 0) {
    console.log(3);
  }
  if (c > 1) {
    console.log(4);
  }
  return <div>{}</div>;
}

export default TestServer;
