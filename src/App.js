import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Header from './components/header/Header';

// Containers
import AttendeeForm from './containers/attendeeForm/AttendeeForm';
import AttendiesList from './containers/attendiesList/AttendiesList';

const App = () => (
  <Router>
    <>
      <Header />
      <Routes>
        <Route path="/" element={<AttendiesList />} />
        <Route path="/add" element={<AttendeeForm />} />
      </Routes>
    </>
  </Router>
);

export default App;
