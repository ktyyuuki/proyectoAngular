import { TestBed } from "@angular/core/testing"
import { LoginComponent } from "./login.component"
import { Validators } from "@angular/forms";
import { SharedModule } from '../../../shared/shared.module';
import { MockProvider } from "ng-mocks";
import { AuthService } from "../../../core/services/auth.service";

describe('LoginComponent', () => {
  let loginComponent : LoginComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [SharedModule],
      providers: [
        MockProvider(AuthService),
      ]
    }).compileComponents();

    loginComponent = TestBed.createComponent(LoginComponent).componentInstance;
  })

  it('Debe instanciar el LoginComponent', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    expect(fixture.componentInstance).toBeTruthy();
  })

  it('Debe requerir Email y Password', () => {
    expect(loginComponent.loginform.get('email')?.hasValidator(Validators.required)).toBe(true);
    expect(loginComponent.loginform.get('password')?.hasValidator(Validators.required)).toBe(true);
  });

  it('Debe marcar campos si el form es inválido', () => {
    loginComponent.loginform.setValue({
      email: '',
      password: '',
    });

    const spyOnMarkAllTouched = spyOn(loginComponent.loginform, 'markAllAsTouched');
    loginComponent.onSubmit();

    expect(spyOnMarkAllTouched).toHaveBeenCalledTimes(1);
  });

  it('Si el form es válido, debe iniciar sesión con login de AuthService', () => {
    loginComponent.loginform.setValue({
      email: 'admin@mail.com',
      password: '123456'
    });
    const spyOnLogin = spyOn((loginComponent as any).authService, 'login');
    loginComponent.onSubmit();
    expect (spyOnLogin).toHaveBeenCalledTimes(1);
  });
})
