import React, { useState } from 'react';

const Counter: React.FC<{ initialCount: number }> = ({ initialCount }) => {
  const [count, setCount] = useState(initialCount);
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
    <div>
      <Counter initialCount={10} />
      <Counter initialCount={20} />
      <Counter initialCount={30} />
    </div>
  );
};

export default App;
