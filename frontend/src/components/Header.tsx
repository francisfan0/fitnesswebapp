// import { Link } from "react-router-dom";
// import { useAppContext } from "../contexts/AppContext";
// import SignOutButton from "./SignOutButton";

// const Header = () => {
//   const { isLoggedIn } = useAppContext();

//   return (
//     <div className="bg-blue-800 py-6">
//       <div className="container mx-auto flex justify-between">
//         <span className="text-3xl text-white font-bold tracking-tight">
//           <Link to="/">fitness_log</Link>
//         </span>
//         <span className="flex space-x-2">
//           {isLoggedIn ? (
//             <>
//               <Link
//                 to="/my-logs"
//                 className="flex items-center text-white px-3 font-bold hover:text-gray-300 rounded cursor-pointer"
//               >
//                 My Logs
//               </Link>
//               <Link
//                 to="/my-chat"
//                 className="flex items-center text-white px-3 font-bold hover:text-gray-300 rounded cursor-pointer"
//               >
//                 My Chat
//               </Link>
//               <Link
//                 to="/edit-profile"
//                 className="flex items-center text-white px-3 font-bold hover:text-gray-300 rounded cursor-pointer"
//               >
//                 My Profile
//               </Link>
//               <SignOutButton></SignOutButton>
//             </>
//           ) : (
//             <Link
//               to="/sign-in"
//               className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100 rounded"
//             >
//               Sign In
//             </Link>
//           )}
//         </span>
//       </div>
//     </div>
//   );
// };

// export default Header;

import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";
import * as apiClient from "../api-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const { isLoggedIn } = useAppContext();

  const {
    data: profile,
    isLoading,
    isError,
  } = useQuery("fetchMyProfile", () => apiClient.fetchMyProfile());

  if (isLoading) {
    return <div className="bg-blue-800 py-6">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="bg-blue-800 py-6">
        <div className="container mx-auto flex justify-between">
          <span className="text-3xl text-white font-bold tracking-tight">
            <Link to="/">fitness_log</Link>
          </span>
          <Link
            to="/sign-in"
            className="bg-white text-blue-600 px-3 font-bold hover:bg-gray-100 rounded flex items-center"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  if (isLoggedIn) {
    return (
      <div className="bg-blue-800 py-6">
        <div className="container mx-auto flex justify-between">
          <span className="text-3xl text-white font-bold tracking-tight">
            <Link to="/">fitness_log</Link>
          </span>
          <span className="flex items-center">
            {isLoggedIn ? (
              <>
                <Link
                  to="/my-friends"
                  className="text-white px-3 font-bold hover:text-gray-300 rounded cursor-pointer"
                >
                  My Friends
                </Link>
                <Link
                  to="/my-logs"
                  className="text-white px-3 font-bold hover:text-gray-300 rounded cursor-pointer"
                >
                  My Logs
                </Link>
                <Link
                  to="/my-charts"
                  className="text-white px-3 font-bold hover:text-gray-300 rounded cursor-pointer"
                >
                  My Progress
                </Link>
                <Link
                  to="/my-chat"
                  className="text-white px-3 font-bold hover:text-gray-300 rounded cursor-pointer"
                >
                  My Chat
                </Link>
                <Link
                  to="/edit-profile"
                  className="flex items-center text-white px-3 font-bold hover:text-gray-300 rounded cursor-pointer"
                >
                  {profile?.imageUrls[0] ? (
                    <img
                      src={profile.imageUrls[0]}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faUser}
                      className="w-8 h-8 text-white"
                    />
                  )}
                  <span className="ml-2"></span>
                </Link>
                <SignOutButton />
              </>
            ) : (
              <Link
                to="/sign-in"
                className="bg-white text-blue-600 px-3 font-bold hover:bg-gray-100 rounded flex items-center"
              >
                Sign In
              </Link>
            )}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">fitness_log</Link>
        </span>
        <span className="flex items-center">
          {isLoggedIn ? (
            <>
              <Link
                to="/my-friends"
                className="text-white px-3 font-bold hover:text-gray-300 rounded cursor-pointer"
              >
                My Friends
              </Link>
              <Link
                to="/my-logs"
                className="text-white px-3 font-bold hover:text-gray-300 rounded cursor-pointer"
              >
                My Logs
              </Link>
              <Link
                to="/my-charts"
                className="text-white px-3 font-bold hover:text-gray-300 rounded cursor-pointer"
              >
                My Progress
              </Link>
              <Link
                to="/my-chat"
                className="text-white px-3 font-bold hover:text-gray-300 rounded cursor-pointer"
              >
                My Chat
              </Link>
              <Link
                to="/edit-profile"
                className="flex items-center text-white px-3 font-bold hover:text-gray-300 rounded cursor-pointer"
              >
                {profile?.imageUrls[0] ? (
                  <img
                    src={profile.imageUrls[0]}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faUser}
                    className="w-8 h-8 text-white"
                  />
                )}
                <span className="ml-2"></span>
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="bg-white text-blue-600 px-3 font-bold hover:bg-gray-100 rounded flex items-center"
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
