import React, { useEffect } from "react";
import useStorage from "./useStorage";


function ProgressBar({file, setFile}) {
    const {url, progress} = useStorage(file);
    console.log(progress, url);
    useEffect(() => {
      if (url) {
        setFile(null);
      }
    },[url], setFile)

  return (
    <div className= "progress-bar" style= {{width: progress + '%'}}>{progress}</div>
  )
}

export default ProgressBar;