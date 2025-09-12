import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { initialAppState, PersistedCartState } from './app.state';
import { computed, effect, Signal } from '@angular/core';
import { buildCartVm, buildProductListVm } from './shop.vm.builders';
import * as updaters from './app.updaters';

export const AppStore = signalStore(
  {
    providedIn: 'root',
  },
  withState(initialAppState),
  withComputed((store) => {
    const productListVm = computed(() =>
      buildProductListVm(
        store.products(),
        store.searchWord(),
        store.cartQuantities()
      )
    );
    const cartVm = computed(() =>
      buildCartVm(
        store.products(),
        store.cartQuantities(),
        store.taxRate(),
        store.cartVisible()
      )
    );

    return { productListVm, cartVm };
  }),
  withMethods((store) => ({
    setSearchWord: (searchWord: string) =>
      patchState(store, updaters.setSearchWord(searchWord)),
    addToCart: (productId: string) =>
      patchState(store, updaters.addToCart(productId)),
    viewCart: () => patchState(store, updaters.viewCart()),
    hideCart: () => patchState(store, updaters.hideCart()),
    incrementItemQuantity: (productId: string) =>
      patchState(store, updaters.incrementItemQuantity(productId)),
    decrementItemQuantity: (productId: string) =>
      patchState(store, updaters.decrementItemQuantity(productId)),
    checkout: () => patchState(store, updaters.checkout()),
  })),
  withHooks((store)=>({
    onInit: ()=> {
        const savedItems = localStorage.getItem('cart');
        if (savedItems) {
            const parsedItems = JSON.parse(savedItems) as PersistedCartState;
            patchState(store, parsedItems);
        }

        const persistedCart : Signal<PersistedCartState> = computed(()=>({
            cartQuantities: store.cartQuantities()
        }));

        effect(()=>{
            const state = persistedCart();
            console.log('Persisted cart state:', state);
            localStorage.setItem('cart', JSON.stringify(state));
        });
    }
  }))
);
