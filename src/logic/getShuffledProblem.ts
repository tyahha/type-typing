import { Problem } from "../model/problem";
import { shuffleArray } from "../util/shuffleArray";
import { problems } from "../assets/problems";

export const getShuffledProblem = (): Problem[] => shuffleArray(problems);
