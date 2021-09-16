import { useState } from "react";
import "./App.css";
import MainScreen from "./screens/MainScreen";
import IndexScreen from "./screens/IndexScreen";
// firebase
import { auth, onAuthStateChanged } from "./utils/firebase";

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState("");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserLoggedIn(user.email);
      console.log(userLoggedIn);
    }
  });

  return (
    <div className="">
      {userLoggedIn ? (
        <MainScreen loggedInUser={userLoggedIn} />
      ) : (
        <IndexScreen />
      )}
    </div>
  );
}

export default App;
