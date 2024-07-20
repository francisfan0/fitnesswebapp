import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AddProfile from "./pages/AddProfile";
import { useAppContext } from "./contexts/AppContext";
import AddLogs from "./pages/AddLogs";
import MyLogs from "./pages/MyLogs";
import EditProfile from "./pages/EditProfile";
import EditLog from "./pages/EditLog";

const App = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <p>Functionality Coming Soon</p>
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <p>Search page</p>
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register></Register>
            </Layout>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Layout>
              <SignIn></SignIn>
            </Layout>
          }
        />

        {isLoggedIn && (
          <>
            <Route
              path="/add-profile"
              element={
                <Layout>
                  <AddProfile />
                </Layout>
              }
            />
            <Route
              path="/add-log"
              element={
                <Layout>
                  <AddLogs />
                </Layout>
              }
            />
            <Route
              path="/my-logs"
              element={
                <Layout>
                  <MyLogs />
                </Layout>
              }
            />
            <Route
              path="/edit-profile"
              element={
                <Layout>
                  <EditProfile />
                </Layout>
              }
            />
            <Route
              path="/edit-log/:logId"
              element={
                <Layout>
                  <EditLog />
                </Layout>
              }
            />
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
