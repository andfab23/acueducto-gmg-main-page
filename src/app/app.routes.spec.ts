import { routes } from './app.routes';
import { Route } from '@angular/router';

describe('App Routes', () => {
  it('debe tener configurada la ruta principal "" con título y carga lazy de Launcher', async () => {
    const defaultRoute = routes.find((r: Route) => r.path === '');
    expect(defaultRoute).toBeDefined();
    expect(defaultRoute?.title).toContain('Asociación de Suscriptores del Acueducto');
    expect(defaultRoute?.loadComponent).toBeDefined();

    if (defaultRoute?.loadComponent) {
      const component = await (defaultRoute.loadComponent as () => Promise<unknown>)();
      expect(component).toBeDefined();
    }
  });

  it('debe redirigir cualquier ruta desconocida ("**") a la ruta raíz ""', () => {
    const wildcardRoute = routes.find((r: Route) => r.path === '**');
    expect(wildcardRoute).toBeDefined();
    expect(wildcardRoute?.redirectTo).toBe('');
    expect(wildcardRoute?.pathMatch).toBe('full');
  });
});
