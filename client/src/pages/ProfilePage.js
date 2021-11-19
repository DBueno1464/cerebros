import React from "react";
import { useQuery } from "@apollo/client";

import ThoughtList from "../components/thoughts/ThoughtList";
import ThoughtForm from "../components/thoughts/ThoughtForm";

import { QUERY_THOUGHTS } from "../utils/queries";

import React, { useEffect, useState } from "react";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from "react-bootstrap";

import { useLazyQuery, useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { REMOVE_MOVIE } from "../utils/mutations";

import Auth from "../utils/auth";
import { removeMovieId } from "../utils/localStorage";


const ProfilePage = () => {
    const {loading, error, data} = useQuery(GET_ME);
    
    const [removeMovie] = useMutation(REMOVE_MOVIE);
    
    const userData = data?.me || [];
    // console.log(data, loading);
  
    // create function that accepts the book's mongo _id value as param and deletes the book from the database
    const handleDeleteMovie = async (movieId) => {
      const token = Auth.loggedIn() ? Auth.getToken() : null;
  
      if (!token) {
        // console.log("token not found");
        return false;
      }
  
      try {
        await removeMovie({
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
            {userData.savedMovies.length
              ? `Viewing ${userData.savedMovies.length} saved ${
                  userData.savedMovies.length === 1 ? "movie" : "movies"
                }:`
              : "You have no saved content!"}
          </h2>
          <CardColumns>
            {userData.savedMovies.map((movie) => {
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
                    <Button
                      className="btn-block btn-danger"
                      onClick={() => handleDeleteMovie(movie.movieId)}
                    >
                      Delete this Movie!
                    </Button>
                  </Card.Body>
                </Card>
              );
            })}
          </CardColumns>


          <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: "1px dotted #1a1a1a" }}
        >
          <ThoughtForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList
              thoughts={thoughts}
              title="Some Feed for Thought(s)..."
            />
          )}
        </div>
      </div>


        </Container>
      </>
    );
  };
  
  export default ProfilePage;