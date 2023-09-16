import {Routes, Route} from 'react-router-dom';
import {Signup, Signin, Profile, Feed} from './components/components';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signup/>} />
        <Route path="/login" element={<Signin/>} />
        <Route path="/feed" element={<Feed/>} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </>
  );
}

export default App;
