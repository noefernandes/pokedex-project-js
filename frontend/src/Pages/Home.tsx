import styled, { createGlobalStyle } from 'styled-components';
import { createContext, Fragment, useEffect, useState } from 'react';
import Filter from '../Components/Filter';
import Card from '../Components/Card'; 
import api from '../Service/api'; 

import TekoSemiBold from '../assets/fonts/Teko-Bold.ttf';
import TekoMedium from '../assets/fonts/Teko-Medium.ttf';
import { useSelector } from 'react-redux';
import { selectFilterNames } from '../Features/filterNamesSlice';


const Home = () => {

    const [pokemonList, setPokemonList] = useState<any[]>([]);
    const filterNames = useSelector(selectFilterNames);

    useEffect(() => {
        console.log({type1: filterNames.filterNames[0], type2: filterNames.filterNames[1]});
        api.get('/pokemon', { params: { filters: [filterNames.filterNames[0], filterNames.filterNames[1]] }}).then((response) => {
            setPokemonList(response.data);
        });
    }, [filterNames]);

    return (
    <Fragment>
        <GlobalStyle />
        <Container>
            <Content>
                <Logo>
                    <img src="https://fontmeme.com/permalink/220410/1a1f29c701177dd30989f60fbfeae75e.png" alt="logo"></img>
                </Logo>
                <Filter />
                <CardsHolder>
                        {pokemonList.map(pokemon => {
                          return <Card
                                    key={pokemon.pokedex_number}
                                    name={pokemon.name} 
                                    types={[pokemon.type1, pokemon.type2]}
                                    id={pokemon.pokedex_number}
                                 />
                        })}
                </CardsHolder>
            </Content>
        </Container>
    </Fragment>
    );
  };

const GlobalStyle = createGlobalStyle`
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    @font-face {
        font-family: 'TekoSemiBold';
        src: url(${TekoSemiBold});
    }

    @font-face {
        font-family: 'TekoMedium';
        src: url(${TekoMedium});
    }

    body {
        background-color: #4d4dff;
        z-index: -2;
        font-family: TekoMedium;
        font-size: 20px;
        color: #262626;
    }

    ::placeholder {
        color: inherit;
        font-family: TekoMedium;
        font-size: 20px;
        opacity: 0.5;
    }
`;

const Container = styled.section`
    display: flex;
    flex-direction: column;
    text-align: center;
`;

const Content = styled.div`
    margin-bottom: 10vw;
    width: 100%;
    position: relative;
    min-height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
`;

const Logo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    img {
        width: 60%;
        background-repeat: no-repeat;
    }
`;

const CardsHolder = styled.div`
    width: 70%;
    min-height: 100vh;
    background-color: #f2f2f2;
    margin-top: 40px;
    z-index: 0;
    border-style: none;
    border-radius: 10px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 50px;
    padding: 50px;
`;


export default Home;