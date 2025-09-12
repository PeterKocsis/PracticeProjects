import { PartialStateUpdater } from "@ngrx/signals";
import { AppState } from "./app.state";

export function setSearchWord(searchWord: string): PartialStateUpdater<AppState> {
  return _=> ({ searchWord });
}

export function addToCart(productId: string): PartialStateUpdater<AppState> {
    return (state)=> {
        const cartQuantities = {...state.cartQuantities};
        cartQuantities[productId] = cartQuantities[productId] || 1;
        return { cartQuantities };
    }
}

export function viewCart(): PartialStateUpdater<AppState> {
    return _=> ({ cartVisible: true });
}

export function hideCart(): PartialStateUpdater<AppState> {
    return _=> ({ cartVisible: false });
}

export function incrementItemQuantity(productId: string): PartialStateUpdater<AppState> {
    return (state) => {
        const cartQuantities = { ...state.cartQuantities };
        cartQuantities[productId] = (cartQuantities[productId] || 1) + 1;
        return { cartQuantities };
    };
}

export function decrementItemQuantity(productId: string): PartialStateUpdater<AppState> {
    return (state) => {
        const cartQuantities = { ...state.cartQuantities };
        cartQuantities[productId] = (cartQuantities[productId] || 1) - 1;
        if (cartQuantities[productId] <= 0) {
            delete cartQuantities[productId];
        }
        return { cartQuantities, cartVisible: Object.keys(cartQuantities).length > 0 ? state.cartVisible : false };
    };
}

export function checkout(): PartialStateUpdater<AppState> {
    return (state) => {
        // Perform checkout logic here
        return { cartQuantities: {}, cartVisible: false };
    };
}