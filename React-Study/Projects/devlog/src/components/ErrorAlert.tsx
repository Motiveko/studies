import React, { useCallback } from 'react';
import { Alert } from 'react-bootstrap';
import { CommonContext } from '../context/CommonContext';

type props = Pick<CommonContext, 'error' | 'setError'>;

/**
 * 디자인 구려서 mui snackbar로 갈아탐
 * @deprecated
 * @param param0
 * @returns
 */
function ErrorAlert({ error, setError }: props) {
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
