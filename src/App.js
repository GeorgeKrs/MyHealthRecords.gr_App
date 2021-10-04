import { useState } from "react";
import "./App.css";
import MainScreen from "./screens/MainScreen";
import IndexScreen from "./screens/IndexScreen";
import FullScreenLoader from "./general/FullScreenLoader";
// firebase
import { auth, onAuthStateChanged } from "./utils/firebase";

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState("");
  const [loader, setLoader] = useState(true);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserLoggedIn(user.email);
    }

    setTimeout(function () {
      setLoader(false);
    }, 1000);
  });

  return (
    <div style={{ minHeight: "100vh" }}>
      {loader ? (
        <FullScreenLoader setFullscreen={true} />
      ) : userLoggedIn ? (
        <MainScreen loggedInUser={userLoggedIn} />
      ) : (
        <IndexScreen />
      )}
    </div>
  );
}

export default App;
