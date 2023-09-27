import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NewRoom from "./pages/Room/NewRoom";
import AppLayout from "./pages/AppLayout";
import Dashboard from "./pages/Dashboard";
import ListRoom from "./pages/Room/ListRoom";
import EditRoom from "./pages/Room/EditRoom";
import ListRoomType from "./pages/RoomType/ListRoomType";
import EditRoomType from "./pages/RoomType/EditRoomType";
import NewRoomType from "./pages/RoomType/NewRoomType";



const App: React.FC = () => {

  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/newroom" element={<NewRoom />} />
          <Route path="/listroom" element={<ListRoom />} />
          <Route path="/editroom/:id" element={<EditRoom />} />
          <Route path="/newroomtype" element={<NewRoomType />} />
          <Route path="/listroomtype" element={<ListRoomType />} />
          <Route path="/editroomtype/:id" element={<EditRoomType />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;