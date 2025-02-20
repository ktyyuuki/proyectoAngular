import { TestBed } from "@angular/core/testing"
import { AuthService } from "./auth.service"
import { Router } from "@angular/router";
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MockProvider } from 'ng-mocks'
import { environment } from "../../../environments/environment";

describe("AuthService", () => {

  let authService: AuthService;
  let router: Router;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, MockProvider(Router), provideHttpClientTesting()]
    }).compileComponents();

    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('AuthService debe instanciarse', () => {
    expect(authService).toBeTruthy();
  });

  it('Si el login es satisfactorio, identifica al usuario autenticado y lleva al home', () => {
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

    authService.authUser$.subscribe({
      next: (authUser) => {
        expect(authUser).toBeTruthy();
        expect(localStorage.getItem('access_token')).toBeTruthy();
        expect(spyOnNavigate).toHaveBeenCalled();
      }
    })
  })
})
