import { CartItemVm } from "../features/cart/view-model/cart-item.vm";
import { ProductItemVm } from "../features/product-list/view-model/product-item.vm";

export interface ShopVm {
    readonly isCartActive: boolean;
    readonly isCartVisible: boolean;
    readonly cartItemsCount: number;
}

