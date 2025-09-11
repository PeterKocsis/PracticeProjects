import {
  getState,
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { initialQuizSlice } from './quiz.slice';
import { computed, effect } from '@angular/core';
import { addAnswer, reset } from './quiz.updaters';

export const QuizStore = signalStore(
  { providedIn: 'root' },
  //Place to define core initial state
  withState(initialQuizSlice),
  //Place to define computed properties based on core state
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
    return {
      currentQuestionIndex,
      isDone,
      currentQuestion,
      questionCount,
      correctAnswers,
    };
  }),
  //Place to define methods to interact with state
  withMethods((store) => ({
    addAnswer: (index: number) => {
      patchState(store, addAnswer(index));
    },
    reset: () => {
      patchState(store, reset());
    },
  })),
  //Place to define lifecycle hooks
  withHooks((store) => ({
    onInit: () => {
      const stateStr = localStorage.getItem('quizState');
      if (stateStr) {
        const state = JSON.parse(stateStr);
        patchState(store, state);
      }

      effect(() => {
        const state = getState(store);
        const stateStr = JSON.stringify(state);
        localStorage.setItem('quizState', stateStr);
        console.log('State saved to localStorage:', state);
      });
    },
  }))
);
