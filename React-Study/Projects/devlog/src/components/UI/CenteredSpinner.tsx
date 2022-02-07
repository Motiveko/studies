import React from 'react';
import { Spinner } from 'react-bootstrap';

export default function CenteredSpinner() {
  return (
    <div className="mt-3 text-center">
      <Spinner animation="border" />
    </div>
  );
}
