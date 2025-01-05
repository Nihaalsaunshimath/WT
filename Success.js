import React from 'react';
import { useNavigate } from 'react-router-dom';

function Success() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Your report has been successfully submitted!</h1>
      <p>Your action today helps build a better tomorrow. Thank you for being a responsible citizen!</p>
      <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
    </div>
  );
}

export default Success;
