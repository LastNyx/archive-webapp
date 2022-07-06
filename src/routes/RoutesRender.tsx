import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from "../Views/home/Home";
import SetListAll from '../Views/RecentSets/SetListAll';
import SetList from '../Views/SetList/SetList';

const RoutesRender: React.FC = () => {
  return (
    <Routes>
      <Route path='/'>
          <Route index element={<Home />} />
          <Route path=':name' element={<SetList />} />
          <Route path='all' element={<SetListAll />} />
      </Route>
      <Route
          path="*"
          element={
              <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
              </main>
          }
      />
  </Routes>
  )
}

export default RoutesRender;