import React from 'react';
import { Card, Form } from 'react-bootstrap';
import InlineFormControl from '../components/InlineFormControl';
import ThumbnailEditor from '../components/ThumbnailEditor';

export default function UserSettings() {
  return (
    <Card style={{ width: '40vw', maxWidth: '450px', minWidth: '400px' }}>
      <Card.Body>
        <Card.Title style={{ textAlign: 'center' }}>회원정보 수정</Card.Title>
        {/* 
          썸네일로인해 inline form으로 개발해야할듯
          https://getbootstrap.com/docs/5.1/forms/layout/#horizontal-form 참고
        */}
        <InlineFormControl label="프로필">
          <ThumbnailEditor thumbnail="" variant="avatar" handleChange={() => ({})} />
        </InlineFormControl>
        <InlineFormControl label="이메일">
          <Form.Control type="text" className="htmlForm-control-plaintext" id="staticEmail" value="email@example.com" readOnly />
        </InlineFormControl>
        <InlineFormControl label="이름">
          <Form.Control type="text" className="htmlForm-control" id="inputName" />
        </InlineFormControl>
        <InlineFormControl label="깃 주소">
          <Form.Control type="text" className="htmlForm-control" id="inputGithub" />
        </InlineFormControl>
      </Card.Body>
    </Card>
  );
}
