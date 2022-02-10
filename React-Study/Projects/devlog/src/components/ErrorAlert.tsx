import React, { useCallback } from 'react';
import { Alert } from 'react-bootstrap';
import { CommonContext } from '../context/CommonContext';

type Prop = Pick<CommonContext, 'error' | 'setError'>;

function ErrorAlert({ error, setError }: Prop) {
  const onClose = useCallback(() => setError(null), [setError]);

  return (
    <>
      {error && (
        <Alert variant="danger" onClose={onClose} dismissible>
          {error}
        </Alert>
      )}
    </>
  );
}

export default React.memo(ErrorAlert);
