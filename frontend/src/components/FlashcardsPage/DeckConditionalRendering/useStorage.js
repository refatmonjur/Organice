import React from 'react';
import {useEffect, useState} from 'react';
import { storage } from '../../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { async } from '@firebase/util';


function useStorage(file, inputFields) {
    const [progress, setProgress] = useState(0);
    const [ error, setError] = useState(null);
    const [url, setUrl] = useState(null);
    
    useEffect(() =>{
    const storageRef = ref(storage, file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",(snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (err) =>
      {
        setError(err);
      },
      async () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => setUrl(url));
        // uploadTask.snapshot.ref
        // setUrl(url);
        // url= inputFields.url;
        
      })
    }, [file]);

    return {progress, url , error}
}

export default useStorage;