import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Header from './components/header/Header';

// Containers
import AttendeeList from './containers/attendeeList/AttendeeList';

const App = () => (
  <Router>
    <>
      <Header />
      <Routes>
        <Route path="/" element={<AttendeeList />} />
      </Routes>
    </>
  </Router>
);

export default App;
