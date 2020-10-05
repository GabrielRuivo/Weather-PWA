import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: #fafafa;
  padding: 1rem;
  max-width: 1300px;
  margin: 0 auto;
`;

export const Header = styled.div`
  width: 100%;
  height: 10%;
  padding: 0 1rem;
  display: flex;
  align-items: center;

  form {
    display: flex;
    justify-content: center;
    width: 100%;

    .input-error {
      width: 80%;
      height: 3rem;
      border: 1px solid red;
      border-top-left-radius: 1rem;
      border-bottom-left-radius: 1rem;
      padding: 1rem;
      
      
      ::placeholder {
        opacity: 0.5;
      }
    }

    input {
      width: 80%;
      height: 3rem;
      border: none;
      border-top-left-radius: 1rem;
      border-bottom-left-radius: 1rem;
      padding: 1rem;
      
      
      ::placeholder {
        opacity: 0.5;
      }
    }

    button {
      width: 20%;
      border: none;
      border-top-right-radius: 1rem;
      border-bottom-right-radius: 1rem;
      background: #1F07B2;
      color: #fff;
    }
  }
`;

export const Body = styled.div`
  width: 100%;
  height: 65%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .empty {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 15px;
    color: #aaa;
  }
  .empty-error {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 15px;
    color: red;
  }

  .box-city-day {
    width: 100%;
    height: 6rem;
    padding: 1rem;

    .city {
      font-family: Arial, Helvetica, sans-serif;
      font-size: 30px;
      font-weight: bold;
      color: #000;
    }

    .dayweek {
      font-family: Arial, Helvetica, sans-serif;
      font-size: 20px;
      color: #666;
    }
  }

  .box-deggres {
    width: 100%;
    height: 60%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    img {
      width: 7rem;
      height: 7rem;
      margin-bottom: 1rem;
    }

    .deggres {
      font-family: Arial, Helvetica, sans-serif;
      font-weight: bold;
      font-size: 3.5rem;
    }

    .condition {
      font-family: Arial, Helvetica, sans-serif;
      color: #666;
      font-size: 1.5rem;
    }
  }

`;

export const Footer = styled.div`
  background: #ddd;
  width: 100%;
  height: 25%;
  border-radius: 1rem;
  padding: 1rem;
  justify-content: center;

  .empty {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 15px;
    color: #aaa;
  }

  .day {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1.3rem;
    color: #000;
  }

  .box-footer {
    margin-top: 1rem;
    width: 100%;
    height: 5rem;

    display: flex;
    align-items: center;
    justify-content: space-around;

    .box-wind,
    .box-feels_like,
    .box-humidity {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-family: Arial, Helvetica, sans-serif;

      .title-wind,
      .title-feels_like, 
      .title-humidity {
        font-size: 1rem;
        color: #000;
        opacity: 0.5;
      }

      .number-wind,
      .number-feels_like, 
      .number-humidity {
        font-size: 1.2rem;
        color: #000;
        font-weight: bold;
        opacity: 0.9;
      }

    }

  }

`;