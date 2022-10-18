import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import Users from './views/Users';
import Posts from './views/Posts';
import 'antd/dist/antd.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/users" element={<Users/>}/>
        <Route path="/posts/:userId" element={<Posts/>}/>
        <Route path="*" element={<Navigate to="/users"/>}/>
      </Routes>
    </Router>    
  );
}

export default App;
