import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { auth, provider } from "../firebase";
import {
  selectUserEmail,
  selectUserName,
  selectUserPhoto,
  setSignOutState,
  setUserLoginDetails,
} from "../features/user/userSlice";



function Header(props) {
  //fetch state
  const userName = useSelector(selectUserName);
  const userEmail = useSelector(selectUserEmail);
  const userPhoto = useSelector(selectUserPhoto);

  //actions
  const dispatch = useDispatch();
  const history = useHistory();



  const handleAuth = () => {

    if (!userName) {
      auth.signInWithPopup(provider)
        .then((result) => {
          dispatch(setUserLoginDetails({
            name: result.user.displayName,
            email: result.user.email,
            photo: result.user.photoURL
          }));
          history.push("/home");
        }
        )
        .catch(err => alert(err.message));
    } else if (userName){
       auth.signOut().then(()=>{
         dispatch(setSignOutState());
         history.push("/")
       }).catch(err => alert(err.message));
    }
  }
 return (
    <Nav>
      <Logo>
        <img src="/images/logo.svg" alt="Disney"></img>
      </Logo>

      {!userName ? (
        <Login onClick={handleAuth}>Login</Login>
      ) : (
        <>
          <NavMenu>
            <a href="/home">
              <img src="/images/home-icon.svg" href="#" alt="Home"></img>
              <span>HOME</span>
            </a>
            <a>
              <img src="/images/search-icon.svg" href="#" alt="SEARCH" />
              <span>SEARCH</span>
            </a>
            <a>
              <img src="/images/watchlist-icon.svg" href="#" alt="WATCHLIST" />
              <span>WATCHLIST</span>
            </a>
            <a>
              <img src="/images/original-icon.svg" href="#" alt="ORIGINALS" />
              <span>ORIGINALS</span>
            </a>
            <a>
              <img src="/images/movie-icon.svg" href="#" alt="MOVIES" />
              <span>MOVIES</span>
            </a>
            <a>
              <img src="/images/series-icon.svg" href="#" alt="SERIES" />
              <span>SERIES</span>
            </a>
          </NavMenu>
          <SignOut>
            <UserImage src={userPhoto} alt ={userName}></UserImage>
            <DropDown>
              <span onClick={handleAuth}>Sign Out</span>
            </DropDown>

          </SignOut>
        </>
      )}
    </Nav>
  );
}

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  height: 70px;
  letter-spacing: 1.5px;
  z-index: 3;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;
  ///make the code more robust!
  img {
    display: block;
    width: 100%;
  }
`;

const UserImage = styled.img `
  height: 100%;
  
`;

const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  margin: 0px;
  padding: 0px;
  position: relative;
  margin-right: auto;
  margin-left: 25px;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;

    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }

    span {
      color: rgb(249, 249, 249);
      font-size: 13px;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 0px;
      white-space: nowrap;
      position: relative;

      &::before {
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        left: 0px;
        right: 0px;
        position: absolute;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }
    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }

    @media (max-width: 760px) {
      display: none;
    }
  }
`;

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;



const DropDown = styled.div`
  position: absolute;
  background-color: black;
  top:48px;
  right:0px;
  width:100px;
  padding: 10px;
  border-radius: 4px;
  letter-spacing: 3px;
  border: 1px solid rgba(151, 151, 151, 0.34);
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  opacity: 0;
  font-size: 12px;
  
`;
const SignOut = styled.div`
  position: relative;
  display:flex;
  justify-content:center;
  align-items:center;
  height: 48px;
  width: 48px;
  cursor: pointer;

  ${UserImage} {
    border-radius: 50%;
    border:2px solid #f9f9f9;    
  }
  
  &:hover {
   ${DropDown} {
     opacity: 1;
     transition-duration:1s;
   }
  }

`;

export default Header;
