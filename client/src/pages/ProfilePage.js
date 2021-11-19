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