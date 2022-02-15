import React from 'react';
import {useEffect, useState} from 'react';
import { storage } from '../../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { async } from '@firebase/util';


function useStorage(file) {
    const [progress, setProgress] = useState(0);
    const [ error, setError] = useState(null);
    const [url, setUrl] = useState(null);
    
    useEffect(() =>{
        // //reference
        // const storageRef= ref(storage, file.name);
        // uploadBytesResumable(storageRef, file).on('state_changed', (snap) => {
        //     let precentage = (snap.bytesTransferred / snap.totalBytes) *100;
        //     setProgress(precentage);
        // }, (err) => {
        //     setError(err);
        // }, async() =>{
        //     const url = await getDownloadURL(storageRef);
        //     setUrl(url);
        // })
        // if (!file) return;
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
        const url = getDownloadURL(uploadTask.snapshot.ref);
        // uploadTask.snapshot.ref
        setUrl(url);
        console.log(url);
      })
    }, [file]);

    return {progress, url , error}
}

export default useStorage;