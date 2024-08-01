import React, { useState } from "react";
import Nav from "./Component/Nav/Nav";
import { Route, Routes } from "react-router-dom";
import Home from "./Page/Home/Home";
import Video from "./Page/Video/Video";

function App() {
  const [sidebar, setSidebar] = useState(true);

  return (
    <div>
      <Nav setSidebar={setSidebar} />
      <Routes>
        <Route path="/" element={<Home sidebar={sidebar} />} />
        <Route path="/video/:categoryId/:videoId" element={<Video />} />
      </Routes>
    </div>
  );
}

export default App;
