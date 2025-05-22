import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-appreciate',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './appreciate.component.html',
  styleUrls: ['./appreciate.component.scss']
})
export class AppreciateComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    // Redirect to login after 3 seconds
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 60000); // 60 seconds=1 minute
  }
}