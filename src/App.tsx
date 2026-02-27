import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Header from './components/header/Header';

// Containers
import AttendeeList from './containers/attendeeList/AttendeeList';

const App = () => (
  <Router basename="/events-list">
    <>
      <Header />
      <Routes>
        <Route path="/" element={<AttendeeList />} />
      </Routes>
    </>
  </Router>
);

export default App;
