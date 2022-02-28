import React, { useEffect } from "react";
import useStorage from "./useStorage";
import { userData } from "../../Context/UserData";

function ProgressBar({ file, setFile, setUrl }) {
  const { progress, url } = useStorage(file);

  console.log(progress);
  console.log(url);
  useEffect(
    () => {
      if (url) {
        setFile(null);
        setUrl(userData.getUrl());
        // userData.setUrl(url);
      }
    },
    [url],
    setFile
  );
  // function lol() {
  //   return url;
  // }
  return (
    <div className="progress-bar" style={{ width: progress + "%" }}>
      <h2>{progress}</h2>
    </div>
  );
}

export default ProgressBar;
