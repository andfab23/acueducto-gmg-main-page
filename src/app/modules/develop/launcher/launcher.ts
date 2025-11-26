import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

/**
 * Componente que contiene el launcher
 * @date 2025-11-26
 * @author Andres Fabian Simbaqueba
 */
@Component({
  selector: 'app-launcher',
  imports: [CommonModule, ProgressSpinnerModule],
  templateUrl: './launcher.html',
  styleUrl: './launcher.scss',
})
export class Launcher implements OnInit {
  drops: Drop[] = [];

  ngOnInit(): void {
    const dropsCount = 50;

    for (let i = 0; i < dropsCount; i++) {
      const size = `${5 + Math.random() * 10}px`;
      const duration = `${2 + Math.random() * 3}s`;

      this.drops.push({
        left: `${Math.random() * 100}vw`,
        size,
        duration,
      });
    }
  }
}

interface Drop {
  left: string;
  size: string;
  duration: string;
}
