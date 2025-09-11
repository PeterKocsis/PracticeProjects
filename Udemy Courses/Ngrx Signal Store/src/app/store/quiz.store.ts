import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { initialQuizSlice } from './quiz.slice';
import { computed } from '@angular/core';
import { addAnswer, reset } from './quiz.updaters';

export const QuizStore = signalStore(
  { providedIn: 'root' },
  withState(initialQuizSlice),
  withComputed((store) => {
    const currentQuestionIndex = computed(() => store.answers().length);
    const isDone = computed(
      () => store.answers().length === store.questions().length
    );
    const currentQuestion = computed(
      () => store.questions()[currentQuestionIndex()]
    );
    const questionCount = computed(() => store.questions().length);
    const correctAnswers = computed(() => {
      let result = 0;
      for (let i = 0; i < store.answers().length; i++) {
        if (store.answers()[i] === store.questions()[i].correctIndex) {
          result++;
        }
      }
      return result;
    });
    return { currentQuestionIndex, isDone, currentQuestion, questionCount, correctAnswers };
  }),
  withMethods((store) => ({
    addAnswer: (index: number) => {
      patchState(store, addAnswer(index));
    },
    reset: () => {
      patchState(store, reset());
    },
  }))
);
