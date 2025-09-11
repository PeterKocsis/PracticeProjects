import { Component, input, Input, output } from '@angular/core';
import { SharedModule } from '../../shared.module';

@Component({
    selector: 'app-toolbar',
    imports: [SharedModule],
    templateUrl: './toolbar.component.html',
    styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  readonly caption = input.required<string>();
  onEdit = output<void>();
  onReset = output<void>();

  readonly icon = input('');
  readonly resetIcon = input('');

}
