import React from 'react';
import styled from 'styled-components';

const Facebook = () => {
  return (
    <StyledWrapper>
      <button>
        <svg viewBox="0 0 26 26" fill="currentColor" height={28} width={28} xmlns="http://www.w3.org/2000/svg">
          <path d="M12.001 2C6.47813 2 2.00098 6.47715 2.00098 12C2.00098 16.9913 5.65783 21.1283 10.4385 21.8785V14.8906H7.89941V12H10.4385V9.79688C10.4385 7.29063 11.9314 5.90625 14.2156 5.90625C15.3097 5.90625 16.4541 6.10156 16.4541 6.10156V8.5625H15.1931C13.9509 8.5625 13.5635 9.33334 13.5635 10.1242V12H16.3369L15.8936 14.8906H13.5635V21.8785C18.3441 21.1283 22.001 16.9913 22.001 12C22.001 6.47715 17.5238 2 12.001 2Z" />
        </svg>
        <span>Facebook</span>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  button {
    background: transparent;
    position: relative;
    padding: 5px 15px;
    display: flex;
    align-items: center;
    font-size: 17px;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    border: 1px solid rgb(24, 119, 242);
    border-radius: 25px;
    outline: none;
    overflow: hidden;
    color: rgb(24, 119, 242);
    transition: color 0.3s 0.1s ease-out;
    text-align: center;
  }

  button span {
    margin: 10px;
  }

  button::before {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    content: "";
    border-radius: 50%;
    display: block;
    width: 20em;
    height: 20em;
    left: -5em;
    text-align: center;
    transition: box-shadow 0.5s ease-out;
    z-index: -1;
  }

  button:hover {
    color: #fff;
    border: 1px solid rgb(24, 119, 242);
  }

  button:hover::before {
    box-shadow: inset 0 0 0 10em rgb(24, 119, 242);
  }`;

export default Facebook;
