import React, { useEffect } from "react";
import styled from "styled-components";
import ImageSlider from "./imageSlider";
import Recommends from "./recommends";
import Viewers from "./viewers";
import Trending from "./trending";
import Originals from "./originals";
import NewDisney from "./newdisney";
import db from "../firebase";
import {useDispatch } from "react-redux";
import { setMovie } from "../features/movies/movieSlice";
import {selectUserName} from "../features/user/userSlice";

function Home(props) {
  let trending = [];
  let newDisney = [];
  let original = [];
  let recommends = [];

  const dispatch = useDispatch();
  const userName = selectUserName;

  useEffect(() => {
    db.collection("movies").onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
                //trending recommend new original
        switch (doc.data().type) {
          case "new":
            newDisney = [...newDisney, { id: doc.id, ...doc.data() }];
            console.log('disney-data', newDisney);
            break;
          case "trending":
            trending = [...trending, { id: doc.id, ...doc.data() }];
            // console.log('trending',trending);
            break;
          case "original":
            original = [...original, { id: doc.id, ...doc.data() }];
            // console.log('original',original);
            break;
          case "recommend":
            recommends = [...recommends, { id: doc.id, ...doc.data() }];
            // console.log('recommends',recommends)
            break;
        
        }

      

        
      });
      dispatch(setMovie({
        recommend:recommends,
        newDisney:newDisney,      
        trending:trending,
        original:original
      }))
    });

    return () => {};
  }, [userName]);
  
  return (
    <Container>
      <ImageSlider />
      <Viewers />
      <Recommends />
      <NewDisney />
      <Originals />
      <Trending />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: block;
  overflow-x: hidden;
  overflow-y: auto;
  top: 76px;
  padding: 0 calc(3.5vw + 5px);
  margin-bottom: 100px;
  &::after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0;
    opacity: 1;
    z-index: -1;
  }
`;
export default Home;
