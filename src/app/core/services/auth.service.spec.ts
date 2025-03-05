import { TestBed } from "@angular/core/testing"
import { AuthService } from "./auth.service"
import { Router } from "@angular/router";
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MockProvider } from 'ng-mocks'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { environment } from "../../../environments/environment";
import { selectAuthUser } from "../../store/auth/auth.selectors";

describe("AuthService", () => {

  let authService: AuthService;
  let router: Router;
  let httpController: HttpTestingController;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService,provideMockStore()]
    }).compileComponents();

    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    httpController = TestBed.inject(HttpTestingController);
    store = TestBed.inject(MockStore);
  });

  it('AuthService debe instanciarse', () => {
    expect(authService).toBeTruthy();
  });

  it('Si el login es satisfactorio, identifica al usuario autenticado y lleva al home', (done) => {
    const spyOnNavigate = spyOn(router, 'navigate');

    authService.login({
      email: 'admin@mail.com',
      password: '123456'
    });

    const req = httpController.expectOne(`${environment.baseApiUrl}/users?email=admin@mail.com&password=123456`);
    req.flush([{
      id: 1,
      email: 'admin@mail.com',
      name: 'Administrador',
      accessToken: 'AakjdksaMNfjfpf123',
      password: '123456'
    }]);

    // Esperar a que se complete la suscripción antes de hacer las verificaciones
    setTimeout(() => {
      expect(localStorage.getItem("access_token")).toBe("AakjdksaMNfjfpf123");
      expect(spyOnNavigate).toHaveBeenCalledWith(["dashboard", "home"]);
      done(); // Indicar que el test terminó correctamente
    }, 50);
  })
})
