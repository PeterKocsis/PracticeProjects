import { Component, computed, inject, input } from '@angular/core';
import { CartItemVm } from '../../view-model/cart-item.vm';
import { SharedModule } from '../../../../shared.module';
import { QuantityComponent } from "../../../quantity/quantity.component";
import { AppStore } from '../../../../store/app.store';

@Component({
  selector: 'app-cart-item',
  imports: [SharedModule, QuantityComponent],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {
readonly appStore = inject(AppStore);

  readonly item = input.required<CartItemVm>();
  readonly image = computed(() => `images/${this.item().id}.png`);

}
