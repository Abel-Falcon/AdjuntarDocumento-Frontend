import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        routerLink: '/home',
        label: 'Home',
        icon: 'pi pi-home',
      },
      {
        routerLink: '/consolidado',
        label: 'Consolidado',
        icon: 'pi pi-star',
      },
    ];
  }
}
