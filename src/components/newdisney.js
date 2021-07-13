import React from 'react'
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectNewDisney } from '../features/movies/movieSlice';
 
function NewDisney(props) {
    const movies = useSelector(selectNewDisney);
     

    return (
     <Container>
       <h4>New Disney +</h4>
       <Content>
       {movies
           && movies.map((movie,key) => (
                <Wrap key = {key}>
                    {movie.id}
                    <Link to= {`/detail/` + movie.id }>
                    <img src={movie.cardImg} alt = {movie.title}/>
                </Link>
            </Wrap> 
                 
           ))  
         }
       </Content>
        
     </Container>
    )
}

const Container = styled.div `
  /* margin-bottom: 15px; */
  padding:0 0 26;

`

const Content = styled.div `
 display:grid;
 grid-template-columns: repeat(4, minmax(0 ,1fr));
 grid-gap: 25px;
 gap: 25px;
 @media (max-width:768px){
     grid-template-columns: repeat(2,minmax(0,1fr));
 }
`
const Wrap = styled.div `
  padding-top: 56.25%;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
  position: relative;
  overflow:hidden;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  border: 3px solid rgba(249, 249, 249, 0.1);

 img {
     height:100%;
     width:100%;
     position:absolute;
     top:0;
     z-index:1;
     display: block;
     inset:0;
     object-fit:cover;
     transition:opacity 500ms ease-in-out 0s;
 }

 &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
      transform:scale(1.1);
      border-color: rgba(249, 249, 249, 0.8);;
 }
`
export default NewDisney;
