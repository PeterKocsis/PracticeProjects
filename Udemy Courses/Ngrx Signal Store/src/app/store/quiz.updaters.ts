import { PartialStateUpdater } from "@ngrx/signals";
import { QuizSlice } from "./quiz.slice";

export function addAnswer(index: number): PartialStateUpdater<QuizSlice> {
  return state => ({
    answers: [...state.answers, index]
  });
}

export function reset(): PartialStateUpdater<QuizSlice> {
  return _ => ({
    answers: []
  });
}