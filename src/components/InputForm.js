// src/components/InputForm.js

import React, { useState } from 'react';
import PropTypes from 'prop-types';

function InputForm({
  userInput,
  setUserInput,
  onSubmit,
  onImprove,
  isImproving,
  loading,
}) {
  const [improvementInput, setImprovementInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isImproving) {
      onImprove(improvementInput);
      setImprovementInput('');
    } else {
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="input-form">
      {isImproving ? (
        <>
          <textarea
            value={improvementInput}
            onChange={(e) => setImprovementInput(e.target.value)}
            placeholder="Describe the improvements you want..."
            rows={4}
            required
          />
        </>
      ) : (
        <>
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Describe the web application you want to generate..."
            rows={4}
            required
          />
        </>
      )}
      <button type="submit" disabled={loading}>
        {loading ? 'Processing...' : isImproving ? 'Improve' : 'Submit'}
      </button>
    </form>
  );
}

InputForm.propTypes = {
  userInput: PropTypes.string.isRequired,
  setUserInput: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onImprove: PropTypes.func.isRequired,
  isImproving: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default React.memo(InputForm);