import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import db from "../firebase";

function Details(props) {
  const { id } = useParams();
  const [detailData, setDetailData] = useState({});

  useEffect(() => {
    db.collection("movies")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setDetailData(doc.data());
        } else {
          console.log("no such document in firebase!");
        }
      })
      .catch((err) => console.log(err.message));

    return () => {};
  }, [id]);
  return (
    <Container>
      <Background>
        <img src={detailData.backgroundImg} alt={detailData.title} />
      </Background>
      <ImageTitle>
        <img src={detailData.titleImg} alt={detailData.title} />
      </ImageTitle>
      <ContentMeta>
        <Controls>
          <Player>
            <img src="/images/play-icon-black.png" alt="" />
            <span>Play</span>
          </Player>
          <Trailer>
            <img src="/images/play-icon-white.png" alt="" />
            <span>Trailer</span>
          </Trailer>
          <AddList>
            <span />
            <span />
          </AddList>
          <GroupWatch>
            <div>
              <img src="/images/group-icon.png" alt="" />
            </div>
          </GroupWatch>
        </Controls>
        <Subtitle>{detailData.subTitle}</Subtitle>
        <Description>{detailData.description}</Description>
      </ContentMeta>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  /* margin-top: 5px; */
  top: 72px;
  display: block;
  overflow-x: hidden;
  padding: 0 calc(3.5vw + 5px);
  min-height: calc(100vh - 250px);
  /* background-color: red; */
`;
const Background = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: -1;
  opacity: 0.6;
 
  img {
    width: 100vw;
    height: 100vh;
    @media (max-width: 768px) {
      width: 100vw;       
    }

    @media(max-width:576px){
      width:inherit;
    }

  
    
  }
`;

const ImageTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  height: 35vh;
  width: 100%;
  -webkit-box-pack: start;
  padding-bottom: 24px;
  margin: 0 auto;

  img {
    width: 35vw;
    max-width: 600px;
    min-width: 200px;
  }
`;

const ContentMeta = styled.div`
  max-width: 874px;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  min-height: 56px;
  margin: 24px 0px;
  /* background-color: red; */
`;

const Player = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  border-radius: 4px;
  text-transform: uppercase;
  border: none;
  color: rgb(0, 0, 0);
  background: rgb(249, 249 249);
  letter-spacing: 1.8px;
  font-size: 15px;
  margin: 0px 20px 0px 0px;
  height: 56px;

  img {
    width: 22px;
  }

  &:hover {
    background: rgb(148 148 148);
  }
`;

const Trailer = styled(Player)`
  background: rgb(0, 0, 0, 0.3);
  color: rgb(249, 249, 249);
  border: 1px solid rgb(249, 249, 249);
`;
const AddList = styled.div`
  background-color: rgb(0, 0, 0, 0.6);
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 16px;

  span {
    display: inline-block;
    background-color: rgb(249, 249, 249);
    &:first-child {
      height: 2px;
      width: 16px;
      transform: translate(1px, 0px) rotate(0deg);
    }
    &:nth-child(2) {
      height: 16px;
      transform: translateX(-8px) rotate(0deg);
      width: 2px;
    }
   
  }

  @media(max-width:768px){
    &:hover {
      -webkit-tap-highlight-color:transparent;
      background-color:transparent;

    }

  
  }
`;

const GroupWatch = styled.div`
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  width: 44px;
  height: 44px;
  div {
    background: rgb(0, 0, 0);
    border-radius: 50%;
    height: 40px;
    width: 40px;

    img {
      width: 100%;
    }
  }

  @media(max-width:768px){
    &:hover {
      -webkit-tap-highlight-color:transparent;
      background-color: rgb(0,0,0,0.6);
    }
  }
`;


const Subtitle = styled.div `
  font-size: 14px;
  color: rgb(249,249,249);
  letter-spacing: 1px;
  min-height: 18px;

  @media(max-width:768px){
    font-size:12px;
  }
`;

const Description = styled.div `
margin-top: 22px;
font-size: 18px;
letter-spacing: 1.5px;
font-family: 15px;
line-height: 1.4;
color: rgb(249,249,249);
padding: 16px 0px;

@media (max-width) {
  font-size: 14px;
}
`

export default Details;
