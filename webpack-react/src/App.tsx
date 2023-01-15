import React, { useState } from 'react';
import { GlobalErrorBoundary } from '@src/common/ErrorBoundary';

const Counter: React.FC<{ initialCount: number }> = ({ initialCount }) => {
  const [count, setCount] = useState(initialCount);
  if (count - initialCount > 3) {
    throw Error('error');
  }
  return (
    <div>
      {count}
      <button type="button" onClick={() => setCount(count + 1)}>
        +
      </button>
      <button type="button" onClick={() => setCount(count - 1)}>
        -
      </button>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <GlobalErrorBoundary>
      <Counter initialCount={10} />
      <Counter initialCount={20} />
      <Counter initialCount={30} />
    </GlobalErrorBoundary>
  );
};

export default App;
