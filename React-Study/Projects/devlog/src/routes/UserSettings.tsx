import React from 'react';
import { Card, Form } from 'react-bootstrap';

export default function UserSettings() {
  return (
    <Card style={{ width: '40vw', maxWidth: '350px', minWidth: '250px' }}>
      <Card.Body>
        <Card.Title style={{ textAlign: 'center' }}>회원정보 수정</Card.Title>
        {/* 
          썸네일로인해 inline form으로 개발해야할듯
          https://getbootstrap.com/docs/5.1/forms/layout/#horizontal-form 참고
        */}
        <div className="mb-3 row">
          <label htmlFor="staticEmail" className="col-sm-2 col-htmlForm-label">
            이메일
          </label>
          <div className="col-sm-10">
            <Form.Control type="text" className="htmlForm-control-plaintext" id="staticEmail" value="email@example.com" />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="inputPassword" className="col-sm-2 col-htmlForm-label">
            이름
          </label>
          <div className="col-sm-10">
            <Form.Control type="password" className="htmlForm-control" id="inputPassword" />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
