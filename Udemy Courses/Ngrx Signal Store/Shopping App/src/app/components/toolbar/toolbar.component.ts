import { Component, inject } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { AppStore } from '../../store/app.store';

@Component({
  selector: 'app-toolbar',
  imports: [SharedModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  host: {
    '(keydown.enter)': 'onEnter()',
  },
})
export class ToolbarComponent {
  readonly appStore = inject(AppStore);

  readonly searchValue = this.appStore.searchWord;

}
