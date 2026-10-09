import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('debe instanciar el componente App correctamente', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('debe tener la señal title inicializada con "acueducto-gmg-main"', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance as unknown as { title: () => string };
    expect(app.title()).toBe('acueducto-gmg-main');
  });

  it('debe renderizar el elemento <router-outlet> en la vista', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  });
});

