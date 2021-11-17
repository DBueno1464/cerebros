import React from "react";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from "react-bootstrap";

import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { REMOVE_MOVIE } from "../utils/mutations";

import Auth from "../utils/auth";
import { removeMovieId } from "../utils/localStorage";

const SavedContent = () => {
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || [];
  const [removeMovie] = useMutation(REMOVE_MOVIE);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteMovie = async (movieId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      // console.log("token not found");
      return false;
    }

    try {
      const { data } = await removeMovie({
        variables: { movieId },
      });

      //     upon success, remove book's id from localStorage
      removeMovieId(movieId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <>
        <Jumbotron fluid className="text-light bg-dark">
          <Container>
            <h1>Viewing saved books!</h1>
          </Container>
        </Jumbotron>
        <Container>
          <h2>Loading...</h2>
        </Container>
      </>
    );
  }

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Viewing saved content!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedMovie.length
            ? `Viewing ${userData.savedMovie.length} saved ${
                userData.savedMovie.length === 1 ? "movie" : "movies"
              }:`
            : "You have no saved content!"}
        </h2>
        <CardColumns>
          {userData.savedMovie.map((movie) => {
            return (
              <Card key={movie.movieId} border="dark">
                {movie.image ? (
                  <Card.Img
                    src={movie.image}
                    alt={`The cover for ${movie.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text>{movie.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteMovie(movie.movieId)}>
                    Delete this Movie!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedContent;
