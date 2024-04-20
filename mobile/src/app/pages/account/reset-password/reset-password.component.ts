import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, AlertController, ToastController, ActionSheetController } from '@ionic/angular';
import { Subject, Observable, of } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { ApiResponse } from 'src/app/model/api-response.model';
import { Users } from 'src/app/model/users';
import { AnimationService } from 'src/app/services/animation.service';
import { AppConfigService } from 'src/app/services/app-config.service';
import { AuthService } from 'src/app/services/auth.service';
import { PageLoaderService } from 'src/app/services/page-loader.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit, AfterViewInit {
  modal;
  currentUser: Users;
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
    private userService: UserService,
    private actionSheetController: ActionSheetController,
    private animationService: AnimationService,
    private router: Router,
    private pageLoaderService: PageLoaderService,
    private formBuilder: FormBuilder,
    private alertController: AlertController) {
      this.form = this.formBuilder.group({
        oldPassword: [null, [Validators.required]],
        password: [null, [Validators.required,Validators.minLength(3),Validators.maxLength(16)]],
        confirmPassword : '',
      }, { validators: this.checkPasswords });
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

  async onSavePassword() {
    if(!this.form.valid) {
      return;
    }
    const param = this.form.value;
    const logoutSheet = await this.actionSheetController.create({
      cssClass: 'app-action-sheet',
      header: 'Are you sure you want to update your password?',
      buttons: [
        {
          text: 'Yes?',
          handler: async () => {
            try{
              this.isSubmitting = true;
              await this.pageLoaderService.open('Processing please wait...');
              this.userService.resetUserPassword(this.currentUser.userCode, param).pipe(
                takeUntil(this.ngUnsubscribe),
                catchError(this.handleError('login', []))
              )
                .subscribe(async (res: ApiResponse<Users>) => {
                  if (res.success) {
                    console.log(res.data);
                    this.ngUnsubscribe.complete();
                    await this.pageLoaderService.close();
                    this.isOpenResultModal = true;
                    this.isSubmitting = false;
                    this.isProcessed = true;
                    this.resultModal = {
                      title: 'Success!',
                      desc: 'Password successfully updated!',
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
          },
        },
        {
          text: 'No',
          handler: async () => {
            logoutSheet.dismiss();
          },
        },
      ],
    });
    logoutSheet.present();
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
