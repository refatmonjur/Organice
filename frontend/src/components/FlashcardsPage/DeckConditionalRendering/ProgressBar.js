import React, { useEffect } from "react";
import useStorage from "./useStorage";


function ProgressBar({file, setFile, setUrl}) {
    const {url, progress} = useStorage(file);
    
    // console.log(url.Promise.result);
    useEffect(() => {
      if (url) {
        setFile(null);
        setUrl(url)
      }
    },[url], setFile)

  return (
    <div className= "progress-bar" style= {{width: progress + '%'}}>
      <h2>
        {progress}
      </h2>
    </div>

  )
}

export default ProgressBar;