/* eslint-disable @typescript-eslint/member-ordering */
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import Swiper from 'swiper';
import { AnimationService } from 'src/app/services/animation.service';
import { AppConfigService } from 'src/app/services/app-config.service';
import { AuthService } from 'src/app/services/auth.service';
import { PageLoaderService } from 'src/app/services/page-loader.service';
import { MyErrorStateMatcher } from 'src/app/shared/form-validation/error-state.matcher';
import { Subject, Observable, of } from 'rxjs';
import { getAge } from 'src/app/shared/utils/date';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit, AfterViewInit {
  modal;
  isSubmitting = false;
  form: FormGroup;
  defaultDate = new Date();
  isProcessed = false;
  isTouchingSlide = false;

  otpSent = false;
  isOpenResultModal = false;
  resultModal: { type: 'success' | 'failed' | 'warning'; title: string; desc: string; done?; retry? };
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  constructor(private modalCtrl: ModalController,
    private appconfig: AppConfigService,
    private authService: AuthService,
    private animationService: AnimationService,
    private router: Router,
    private pageLoaderService: PageLoaderService,
    private formBuilder: FormBuilder,
    private alertController: AlertController) {
      this.form = this.formBuilder.group({
        firstName: new FormControl(null, [Validators.required, Validators.minLength(2)]),
        middleName: new FormControl(),
        lastName: new FormControl(null, [Validators.required, Validators.minLength(2)]),
        birthDate: new FormControl(new Date().toISOString(), [Validators.required]),
        age: new FormControl(),
        address: new FormControl(null, [Validators.required]),
        mobileNumber: new FormControl(null, [Validators.required,Validators.minLength(11),Validators.maxLength(11)]),
        password: new FormControl(null, [Validators.required,Validators.minLength(3),Validators.maxLength(16)]),
        confirmPassword : new FormControl(),
      }, { validators: this.checkPasswords });

      this.form.controls.birthDate.valueChanges.subscribe(res=> {
        console.log(res);
        if(!res || res === '') {
          this.form.controls.birthDate.setErrors({ required: true });
        }
        if(res && this.form.controls.birthDate.touched) {
          this.form.controls.age.setValue(getAge(new Date(res)));
        }
      });
     }

  get formControls() {
    return this.form.controls;
  }
  ngOnInit() {
  }

  ngAfterViewInit(): void {
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    const pass = group.get('password')?.value;
    const confirmPass = group.get('confirmPassword')?.value;
    if(pass !== confirmPass) {
      group.get('confirmPassword').setErrors({ notMatch: true});
    }
    return null;
  };

  async onRegister() {
    if(!this.form.valid) {
      return;
    }
    const param = this.form.value;
    try{
      this.isSubmitting = true;
      await this.pageLoaderService.open('Processing please wait...');
      this.authService.registerClient(param)
        .subscribe(async res => {
          if (res.success) {
            console.log(res.data);
            this.ngUnsubscribe.complete();
            await this.pageLoaderService.close();
            this.isOpenResultModal = true;
            this.isSubmitting = false;
            this.isProcessed = true;
            this.resultModal = {
              title: 'Success!',
              desc: 'Account successfully created!',
              type: 'success',
              done: ()=> {
                this.isOpenResultModal = false;
                this.modal.dismiss(res.data, 'confirm');
              }
            };
          } else {
            await this.pageLoaderService.close();
            this.ngUnsubscribe.complete();
            this.isSubmitting = false;
            this.isOpenResultModal = true;
            this.resultModal = {
              title: 'Error!',
              desc: 'Oops, ' + res.message,
              type: 'failed',
              retry: ()=> {
                this.isOpenResultModal = false;
              },
            };
          }
        }, async (err) => {
          await this.pageLoaderService.close();
          this.ngUnsubscribe.complete();
          this.isSubmitting = false;
          this.isOpenResultModal = true;
          this.resultModal = {
            title: 'Error!',
            desc: 'Oops, ' + Array.isArray(err.message)
            ? err.message[0]
            : err.message,
            type: 'failed',
            retry: ()=> {
              this.isOpenResultModal = false;
            },
          };
        });
    } catch (e){
      await this.pageLoaderService.close();
      this.ngUnsubscribe.complete();
      this.isSubmitting = false;
      this.isOpenResultModal = true;
      this.resultModal = {
        title: 'Oops!',
        desc: Array.isArray(e.message) ? e.message[0] : e.message,
        type: 'failed',
        retry: ()=> {
          this.isOpenResultModal = false;
        },
      };
    }
  }

  async presentAlert(options: any) {
    const alert = await this.alertController.create(options);
    return await alert.present();
  }

  close() {
    this.modal.dismiss(null, 'cancel');
  }


  handleError<T>(operation, result?: T) {
    return (error: any): Observable<T> => {
      this.ngUnsubscribe.complete();
        this.log(`${operation} failed: ${Array.isArray(error.message) ? error.message[0] : error.message}`);
      return of(error as any);
    };
  }

  log(message: string) {
    console.log(message);
    this.resultModal = {
      title: 'Oops!',
      desc: message,
      type: 'failed',
      retry: ()=> {
        this.isOpenResultModal = false;
      },
    };
  }
}
