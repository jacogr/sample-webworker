import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { formatNumber } from '@polkadot/util';

import Worker from 'worker-loader!./index-worker.js';

// the actual App
function App () {
  // store the actual raw payload and signer resolve as transmitted to the QR
  const [last, setLast] = useState();

  useEffect(() => {
    // create the worker
    const worker = new Worker();

    // listen to all events emitted
    worker.onmessage = function (event) {
      console.log(new Date(), 'Received event', event);

      setLast(event.data);
    };
  }, []);

  return <div>{last && <div>{formatNumber(last.number)}&nbsp;{last.hash}</div>}</div>;
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
