import { CartItemVm } from '../components/cart/view-model/cart-item.vm';
import { Product } from '../models/product.model';
import { CartVm } from './show.vm';

export function buildProductListVm(
  products: Product[],
  searchWord: string,
  quantities: Record<string, number>
) {
  return {
    productItems: buildProductItems(),
  };

  function buildProductItems() {
    const word = searchWord.trim().toLowerCase();
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(word) ||
          p.description.toLowerCase().includes(word)
      )
      .map((p) => ({
        ...p,
        quantity: quantities[p.id] ?? 0,
      }));
  }
}

export function buildCartVm(
  products: Product[],
  quantities: Record<string, number>,
  taxRate: number,
  cartVisible: boolean
): CartVm {
  const items = buildCartItems();
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * taxRate;
  const total = subtotal + tax;
  const itemsCount = items.length;
  const isActive = itemsCount > 0;
  const isVisible = cartVisible;

  return { items, subtotal, tax, total, isActive, isVisible, itemsCount };

  function buildCartItems() {
    return products
      .filter((p) => quantities[p.id])
      .map((p) => {
        const quantity = quantities[p.id];
        return {
          id: p.id,
          name: p.name,
          price: p.unitPrice,
          ranking: p.ranking,
          quantity,
          total: p.unitPrice * quantity,
        };
      });
  }
}
