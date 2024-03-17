import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Feed from "./pages/Feed/Feed";
import Loader from "./Loader/Loader";
import SearchPage from "./pages/SearchPage/SearchPage";
import SearchProvider from "./providers/SearchProvider";
import Groups from "./pages/Groups/Groups";
import SingleGroup from "./pages/SingleGroup/SingleGroup";
import Profile from "./pages/Profile/Profile";
import Premium from "./pages/Premium/Premium";
import PageNotFound from "./utils/PageNotFound";

function Router() {
  const [loading, setLoading] = useState(true);

  return (
    <SearchProvider>
      <div>
        {loading ? <Loader /> : <Navbar />}
        <Routes>
          <Route
            path="/feed"
            element={<Feed loading={loading} setLoading={setLoading} />}
          />
          <Route
            path="/search"
            element={<SearchPage loading={loading} setLoading={setLoading} />}
          />
          <Route
            path="/groups"
            element={<Groups loading={loading} setLoading={setLoading} />}
          />
          <Route
            path="/group/:id"
            element={<SingleGroup loading={loading} setLoading={setLoading} />}
          />
          <Route
            path="/profile/:id"
            element={<Profile loading={loading} setLoading={setLoading} />}
          />
          <Route
            path="/premium"
            element={<Premium loading={loading} setLoading={setLoading} />}
          />
          <Route
            path="/*"
            element={<PageNotFound loading={loading} setLoading={setLoading} />}
          />
        </Routes>
      </div>
    </SearchProvider>
  );
}

export default Router;
