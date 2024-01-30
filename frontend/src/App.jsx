import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AdviceGenerator from './components/AdviceGenerator';
import FormContainer from './components/FormContainer';

function App() {
  const [currentAdvice, setCurrentAdvice] = useState(null);
  const [userId, setUserId] = useState(null);

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <AdviceGenerator
                currentAdvice={currentAdvice}
                userId={userId}
                Id={userId}
                setCurrentAdvice={setCurrentAdvice}
              />
            }
          />
          <Route
            path="/login"
            element={<FormContainer userId={userId} setUserId={setUserId} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
