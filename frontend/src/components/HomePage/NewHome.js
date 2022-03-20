import React from "react";
import { useState, useEffect } from "react";
import NewHomeNavbar from "../NavbarPage/NewHomeNavbar";
import { auth } from "../../firebase.js";
import { useUserAuth } from "../Context/UserAuthContext";
import { db } from "../../firebase.js";
import { collection, getDoc, doc, onSnapshot } from "firebase/firestore";
function NewHome() {
  const { user } = useUserAuth();
  // const useruiid = await signUp(registerEmail, registerPassword);
  const useruiid = user.uid;
  // const userCollectionRef = doc(db, "user", "FxfgfcgsziWsOWCUxU2ZaA57lU02");
  const [currentUser, setCurrentUser] = useState([]);
  // const [todos, setTodos] = useState([]);
  // "FxfgfcgsziWsOWCUxU2ZaA57lU02"
  async function getUsers(db) {
    const userDocRef = doc(db, "user", user.uid);
    const data = await getDoc(userDocRef);
    console.log(data);
    const fields = [];
    fields.push(data.data());
    console.log(fields);
    setCurrentUser(fields);
  }
  // async function getStudentRecords(db) {
  //   const recordCol = collection(db, "user", user.uid, "todos");
  //   // setLoading(true);
  //   onSnapshot(recordCol, (querySnapshot) => {
  //     const record = [];
  //     querySnapshot.forEach((doc) => {
  //       record.push(doc.data());
  //     });
  //     console.log(record);
  //     setTodos(record);
  //     // setStudentRecord(record);
  //   });
  //   // setLoading(false);
  // }

  useEffect(() => {
    getUsers(db);
    // getStudentRecords(db);
  }, []);

  //  /// this is scrapwork
  //  async function getStudentRecords(db) {
  //   const recordCol = collection(db, 'user', user.uid, "todos");
  //   // setLoading(true);
  //   onSnapshot(recordCol, (querySnapshot) => {
  //       const record = [];
  //       querySnapshot.forEach((doc) => {
  //           record.push(doc.data());
  //       });
  //       console.log(record);
  //       // setStudentRecord(record);
  //   });
  //   // setLoading(false);
  // }
  // var userImage = "";
  // if (user) {
  //   if (user.emailVerified == true) {
  //     userImage = user.photoURL;
  //   }
  // }

  return (
    <div>
      <div>
        <NewHomeNavbar />
      </div>
      <h1>User is logged in</h1>
      <div className="p-4 box mt-3 text-center">
        {user.emailVerified == true && user.photoURL}
        <br />
        {user && user.uid}
        {user && user.email}

        {currentUser.map((users) => {
          return (
            <div>
              <h1>firstName: {users.firstName}</h1>
              {/* <h1>lastName: {users.lastName}</h1> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default NewHome;
