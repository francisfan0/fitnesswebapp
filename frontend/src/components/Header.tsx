import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">fitness_log</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                to="/my-logs"
                className="flex items-center text-white px-3 font-bold hover:text-gray-300 rounded cursor-pointer"
              >
                My Logs
              </Link>
              <Link
                to="/my-chat"
                className="flex items-center text-white px-3 font-bold hover:text-gray-300 rounded cursor-pointer"
              >
                My Chat
              </Link>
              <Link
                to="/edit-profile"
                className="flex items-center text-white px-3 font-bold hover:text-gray-300 rounded cursor-pointer"
              >
                My Profile
              </Link>
              <SignOutButton></SignOutButton>
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100 rounded"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
