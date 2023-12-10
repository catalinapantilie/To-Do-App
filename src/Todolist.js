// // import { faPenToSquare, faTrash } from "@fortawesome/fontawesome-free";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "./config/firebase";
// import { useEffect, useState } from "react";

// const ListToDo = ({ todo }) => {
//   const [todos, setTodos] = useState([]);

//   const fetchPost = async () => {
//     await getDocs(collection(db, "tasks")).then((querySnapshot) => {
//       const newData = querySnapshot.docs.map((doc) => ({
//         ...doc.data(),
//         id: doc.id,
//       }));
//       setTodos(newData);
//       console.log(todos, newData);
//     });
//   };
//   //   useEffect(() => {
//   //     fetchPost();
//   //   }, []);

//   return (
//     <div className="todo">
//       {todos?.map((todo, i) => (
//         <p key={i}></p>
//       ))}
//       {/* <div>
//         <FontAwesomeIcon icon={faPenToSquare} />
//         <FontAwesomeIcon icon={faTrash} />
//       </div> */}
//     </div>
//   );
// };

// export default ListToDo;
