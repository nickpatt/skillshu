import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Homepage } from "./screens/Homepage";
import { JobFeed } from "./screens/JobFeed";
import { Login } from "./screens/Login";
import { SignUp } from "./screens/SignUp";
import { UserProfile } from "./screens/UserProfile";
import { CreatePost } from "./screens/CreatePost";
import { PostDetails } from "./screens/PostDetails/PostDetails";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/feed" element={<JobFeed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/posts/:id" element={<PostDetails />} />
      </Routes>
    </BrowserRouter>
  );
}