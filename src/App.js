// src/App.js

import React, { useState } from 'react';
import InputForm from './components/InputForm';
import LivePreview from './components/LivePreview';
import { generateCode, improveCode } from './services/llmService';
import './App.css';

/**
 * App Component
 * The main component that ties everything together.
 */
function App() {
  const [userInput, setUserInput] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isImproving, setIsImproving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * Handles the initial submission to generate code.
   */
  const handleSubmit = async () => {
    if (!userInput.trim()) {
      setError('Please enter a description.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const code = await generateCode(userInput);
      setGeneratedCode(code);
      setIsImproving(false);
    } catch (err) {
      setError('Error generating code. Please try again.');
      console.error(err);
    }
    setLoading(false);
  };

  /**
   * Handles the improvement request to refine existing code.
   * @param {string} improvement - User's improvement description.
   */
  const handleImprove = async (improvement) => {
    if (!improvement.trim()) {
      setError('Please enter improvement details.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const refinedCode = await improveCode(generatedCode, improvement);
      setGeneratedCode(refinedCode);
      setIsImproving(false);
    } catch (err) {
      setError('Error improving code. Please try again.');
      console.error(err);
    }
    setLoading(false);
  };

  /**
   * Enables improvement mode.
   */
  const handleNotSatisfied = () => {
    setIsImproving(true);
  };

  /**
   * Resets the application state.
   */
  const handleReset = () => {
    setUserInput('');
    setGeneratedCode('');
    setIsImproving(false);
    setError('');
  };

  return (
    <div className="App">
      <header>
        <h1>Continuous Website Improvement Tool</h1>
      </header>
      <main>
        <InputForm
          userInput={userInput}
          setUserInput={setUserInput}
          onSubmit={handleSubmit}
          onImprove={handleImprove}
          isImproving={isImproving}
          loading={loading}
        />
        {error && <p className="error">{error}</p>}
        <div className="buttons">
          {generatedCode && !isImproving && (
            <>
              <button onClick={handleNotSatisfied} className="not-satisfied-button">
                Not Satisfied
              </button>
              <button onClick={handleReset} className="reset-button">
                Reset
              </button>
            </>
          )}
        </div>
        {generatedCode && (
          <LivePreview code={generatedCode} />
        )}
      </main>
      <footer>
        <p>&copy; 2023 Continuous Website Improvement Tool</p>
      </footer>
    </div>
  );
}

export default App;