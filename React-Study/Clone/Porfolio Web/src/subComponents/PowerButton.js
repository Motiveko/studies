import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { PowerBtn } from '../components/AllSvgs';

const Power = styled.div`
  position: fixed;
  top: 2rem;
  // left + transform으로 center에 배치
  left: 50%;
  transform: translate(-50%, 0);

  background-color: #FCF6F4;
  padding: 0.3rem;
  border-radius: 50%;
  border: 1px solid #000;
  width: 2.5rem;
  height: 2.5rem;

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;

  cursor: pointer;

  &:hover {
    background-color: rgba(0, 255, 0, 0.2);
    box-shadow: 0 0 8px 6px rgba(0, 255, 0, 0.2);
  }

  &>*:first-child {
    text-decoration: none;
    color: inherit  ;
    width: 100%;
    height: 100%;
  }
`;

function PowerButton() {
  return (
    <Power>
      <NavLink to="/">
        <PowerBtn width={30} heigth={30} />
      </NavLink>
    </Power>
  );
}
export default PowerButton;
