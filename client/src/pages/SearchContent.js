import React, { useState, useEffect } from "react";
import {

  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
} from "react-bootstrap";

import { useMutation } from "@apollo/client";
import { SAVE_MOVIE } from "../utils/mutations";

import Auth from "../utils/auth";
import { searchMovie } from "../utils/API";
import { saveMovieIds, getSavedMovieIds } from "../utils/localStorage";

const SearchContent = () => {
  const [searchedMovie, setSearchedMovie] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState("");

  // create state to hold saved bookId values
  const [savedMovieIds, setSavedMovieIds] = useState(getSavedMovieIds());

  useEffect(() => {
    return () => saveMovieIds(savedMovieIds);
  });

  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!searchInput) {
      return false;
    }

    try {
      
      const response = await searchMovie(searchInput);

      // console.log(response);

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const { results } = await response.json();

      const movieData = results.map((movie) => ({
        movieId: movie.id,
        title: movie.title,
        description: movie.description,
        image: movie.image || "",
      }));

      setSearchedMovie(movieData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  const [saveMovie] = useMutation(SAVE_MOVIE);

  const handleSaveMovie = async (movieId) => {
    const movieToSave = searchedMovie.find(
      (movie) => movie.movieId === movieId
    );

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await saveMovie({
        variables: { input: movieToSave },
      });

      setSavedMovieIds([...savedMovieIds, movieToSave.movieId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>

          <h1>Search for Movies(Spiderman for example :E)!</h1>
          <Form onSubmit={handleFormSubmit}>

         

            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a movie"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Submit Search
                </Button>
              </Col>
            </Form.Row>

          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchedMovie.length
            ? `Viewing ${searchedMovie.length} results:`
            : "Search for a movie to begin"}
        </h2>
        <CardColumns>
          {searchedMovie.map((movie) => {
            return (
              <Card key={movie.movieId} border="dark">
                {" "}
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

                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedMovieIds?.some(
                        (savedMovieId) => savedMovieId === movie.movieId
                      )}
                      className="btn-block btn-info"
                      onClick={() => handleSaveMovie(movie.movieId)}
                    >
                      {savedMovieIds?.some(
                        (savedMovieId) => savedMovieId === movie.movieId
                      )
                        ? "This movie has already been saved!"
                        : "Save this Movie!"}
                    </Button>
                  )}

                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );

};

export default SearchContent;
