import { CartQuantities } from "../models/cart-quantities.model";
import { ShopVm } from "./shop.vm";

export function buildShopVm(
    cartVisible: boolean,
    cartItemsCount: CartQuantities
): ShopVm {
    const itemCount = Object.entries(cartItemsCount).length;
    return {
        isCartActive: itemCount > 0,
        isCartVisible: cartVisible,
        cartItemsCount: itemCount
    }
    
}