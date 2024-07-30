import { useEffect, useRef } from "react";
import "./css/HomePage.css";
import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

const Friends = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <body>
      <h1>Functionality coming soon!</h1>
      <h1>Friend Feed</h1>
      <button>Add Friend</button>
      <h1>Friend Requests</h1>
    </body>
  );
};

export default Friends;
