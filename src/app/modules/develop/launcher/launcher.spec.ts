import { ComponentFixture, TestBed } from '@angular/core/testing';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { Launcher } from './launcher';

describe('Launcher', () => {
  let component: Launcher;
  let fixture: ComponentFixture<Launcher>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Launcher],
      providers: [providePrimeNG({ theme: { preset: Aura } })],
    }).compileComponents();

    fixture = TestBed.createComponent(Launcher);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('1. Debe instanciar el componente Launcher exitosamente', () => {
    expect(component).toBeTruthy();
  });

  it('2. Debe inicializar el arreglo de drops con exactamente 50 gotas tras ngOnInit', () => {
    expect(component.drops.length).toBe(50);
  });

  it('3. Debe verificar que cada gota tenga propiedades left (vw), size (px) y duration (s) válidas', () => {
    component.drops.forEach((drop) => {
      expect(drop.left).toMatch(/^\d+(\.\d+)?vw$/);
      expect(drop.size).toMatch(/^\d+(\.\d+)?px$/);
      expect(drop.duration).toMatch(/^\d+(\.\d+)?s$/);
    });
  });

  it('4. Debe reiniciar y regenerar gotas correctamente si se llama ngOnInit manualmente', () => {
    const nuevoComponente = new Launcher();
    expect(nuevoComponente.drops.length).toBe(0);
    nuevoComponente.ngOnInit();
    expect(nuevoComponente.drops.length).toBe(50);
  });

  it('5. Debe renderizar 50 elementos DOM con la clase .drop en la plantilla', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const dropElements = compiled.querySelectorAll('.drop');
    expect(dropElements.length).toBe(50);
  });

  it('6. Debe aplicar estilos de posición y animación a las gotas renderizadas', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const firstDrop = compiled.querySelector<HTMLElement>('.drop');
    expect(firstDrop).not.toBeNull();
    if (firstDrop) {
      expect(firstDrop.style.left).toContain('vw');
      expect(firstDrop.style.width).toContain('px');
      expect(firstDrop.style.height).toContain('px');
      expect(firstDrop.style.animationDuration).toContain('s');
    }
  });

  it('7. Debe renderizar el indicador spinner de PrimeNG (p-progress-spinner)', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const spinner = compiled.querySelector('p-progress-spinner');
    expect(spinner).not.toBeNull();
  });

  it('8. Debe mostrar el título principal "Estamos trabajando en algo increíble"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const titleElement = compiled.querySelector('p.text-blue-600');
    expect(titleElement).not.toBeNull();
    expect(titleElement?.textContent?.trim()).toBe('Estamos trabajando en algo increíble');
  });

  it('9. Debe mostrar el texto informativo con el nombre de la Asociación y el Municipio', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const strongElement = compiled.querySelector('strong');
    expect(strongElement).not.toBeNull();
    expect(strongElement?.textContent).toContain('Asociación de Suscriptores del Acueducto');
    expect(strongElement?.textContent).toContain('Togüí - Boyacá');
  });

  it('10. Debe renderizar el texto de pie de página con el copyright y año', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const footerParagraph = compiled.querySelector('p.text-gray-500');
    expect(footerParagraph).not.toBeNull();
    expect(footerParagraph?.textContent).toContain(
      '© 2026 Acueducto GMG. Todos los derechos reservados.',
    );
  });
});
