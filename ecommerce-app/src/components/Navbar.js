import React, { Component } from 'react';
import {Link} from 'react-router-dom';
// import logo from './logo.svg';
import styled from 'styled-components';
import {ButtonContainer} from './Button';

export default class Navbar extends Component {
  render() {
    return (
      <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
        <Link to='/'>
          <img src='./img/phoneicon.png' alt="store" className="navbar-brand" id="phoneicon" width="90px" height="auto" float="left" />
        </Link>
        <ul className="navbar-nav align-items-center">
          <li className="nav-items ml-5">
            <Link to="/" className="nav-link">
              PRODUCTS
            </Link>
          </li>
        </ul>
{/* BUTTON:   CART BUTTON NAVBAR     THIS IS THE BUTTON ON THE TOP RIGHT HAND CORNER OF THE NAVBAR THAT LINKS YOU TO THE CART TO CHECK-OUT */}
        <Link to='/cart' className="ml-auto">
          <ButtonContainer>
            <span className="mr-2">
              <i className="fas fa-cart-plus" />
            </span>
              CART
          </ButtonContainer>
        </Link>
    </NavWrapper>
    );
  }
}
// PRODUCT NAVBAR BUTTON
const NavWrapper = styled.nav`
  background: var(--lightBlue);
  .nav-link{
    color: var(--mainWhite)!important;
    font-size: 1.3rem;
    text-transform: capitalize;
  }
`;






// THIS MOVED TO BUTTON.JS
// // COMPONENT FOR THE BUTTON CONTAINER FOR THE CART
// const ButtonContainer = styled.button`
//   text-transform:capitalize;
//   font-size: 1.4rem;
//   background: transparent;
//   border: 2px var(--mainDark) solid;
//   outline: 1px var(--mainWhite) solid;
//   padding: 0.2rem 0.5rem;
//   cursor: pointer;
//   margin: 0.2rem 0.5rem 0.2rem 0;
//   transition: all 0.3s ease-in-out;
//   &:hover {
//     background: var(--mainYellow);
//     color: var(--mainBlue);
//   }
//   &:focus {
//     outline: none;
//   }
// `;
