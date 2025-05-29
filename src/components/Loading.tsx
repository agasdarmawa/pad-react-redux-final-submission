'use client';

import LoadingBar from 'react-redux-loading-bar';

function Loading() {
  return (
    <div className="loading">
      <LoadingBar
        className="fixed top-[83px] left-0 z-50"
        style={{ height: '4px', backgroundColor: '#3B82F6' }}
      />
    </div>
  );
}

export default Loading;
