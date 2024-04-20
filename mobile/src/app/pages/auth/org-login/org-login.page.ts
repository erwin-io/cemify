/* eslint-disable @typescript-eslint/member-ordering */

import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { MatStepper } from '@angular/material/stepper';
import { SignupPage } from '../signup/signup.page';
import { Device } from '@capacitor/device';
import { Users } from 'src/app/model/users';
import { AnimationService } from 'src/app/services/animation.service';
import { AppConfigService } from 'src/app/services/app-config.service';
import { AuthService } from 'src/app/services/auth.service';
import { PageLoaderService } from 'src/app/services/page-loader.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserFirebaseTokenService } from 'src/app/services/user-firebase-token.service';
import { UserOneSignalSubscriptionService } from 'src/app/services/user-one-signal-subscription.service';
import { LoaderService } from 'src/app/shared/ui-service/loader.service';
import { Subject, Observable, of } from 'rxjs';

@Component({
  selector: 'app-org-login',
  templateUrl: './org-login.page.html',
  styleUrls: ['./org-login.page.scss']
})
export class OrgLoginPage implements OnInit {
  modal;
  @ViewChild('signUpStepper') signUpStepper: MatStepper;
  isSubmitting = false;
  loginForm: FormGroup;
  // sessionTimeout;
  enableBackToHome = false;
  currentDeviceModel;
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  isOpenResultModal = false;
  resultModal: { type: 'success' | 'failed' | 'warning'; title: string; desc: string; done?; retry? };
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userFirebaseTokenService: UserFirebaseTokenService,
    private userOneSignalSubscriptionService: UserOneSignalSubscriptionService,
    private alertController: AlertController,
    private storageService: StorageService,
    private loaderService: LoaderService,
    private appconfig: AppConfigService,
    private modalCtrl: ModalController,
    private animationService: AnimationService,
    private pageLoaderService: PageLoaderService,
    ) {
      // this.sessionTimeout = Number(
      //   this.appconfig.config.sessionConfig.sessionTimeout
      // );

      Device.getInfo().then(res=> {
        this.currentDeviceModel = res.model;
      });
    }
  get formData() {
    return this.loginForm.value;
  }

  get formControls() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: [null, [Validators.required]],
      password : [null, Validators.required]
    });
  }

  async onFormSubmit() {
    if(!this.loginForm.valid){
      return;
    }
    try{
      const params = this.formData;
      this.isSubmitting = true;
      await this.pageLoaderService.open('Signing in please wait...');
      this.authService.loginStaff(params)
        .subscribe(async res => {
          if (res.success) {
            this.storageService.saveTotalUnreadNotif(res.data?.totalUnreadNotif);
            const userData: Users = res.data;
            this.storageService.saveLoginUser(userData);
            const subscriptionId = this.storageService.getOneSignalSubscriptionId();
            if(subscriptionId && subscriptionId !== '' && subscriptionId !== null && !subscriptionId?.toString().includes('null')) {
              await this.userOneSignalSubscriptionService.create({
                userId: res.data?.userId,
                subscriptionId
              }).toPromise().catch(async (firebaseRes: any)=> {
                await this.pageLoaderService.close();
                this.isSubmitting = false;
                this.isOpenResultModal = true;
                this.resultModal = {
                  title: 'Oops!',
                  desc: res.message,
                  type: 'failed',
                  retry: ()=> {
                    this.isOpenResultModal = false;
                  },
                };
              }).finally(() => {
                setTimeout(async ()=> {
                  await this.pageLoaderService.close();
                  this.isSubmitting = false;
                  window.location.href = '/home';
                }, 2000);
              });
            } else {
              setTimeout(async ()=> {
                await this.pageLoaderService.close();
                this.isSubmitting = false;
                window.location.href = '/home';
              }, 2000);
            }
          } else {
            this.ngUnsubscribe.complete();
            await this.pageLoaderService.close();
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
            console.log(err);
            this.ngUnsubscribe.complete();
            this.isSubmitting = false;
            await this.pageLoaderService.close();
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
      console.log(e);
      this.ngUnsubscribe.complete();
      await this.pageLoaderService.close();
      this.isSubmitting = false;
      this.isOpenResultModal = true;
      this.resultModal = {
        title: 'Error!',
        desc: 'Oops, ' + Array.isArray(e.message) ? e.message[0] : e.message,
        type: 'failed',
        retry: ()=> {
          this.isOpenResultModal = false;
        },
      };
    }
  }

  getLastLogin() {
    const lastLoginJSON = localStorage.getItem('lastLogin');
    const lastLoginData = lastLoginJSON && lastLoginJSON !== '' ? JSON.parse(lastLoginJSON) : null;
    return lastLoginData;
  }

  async presentAlert(options: any) {
    const alert = await this.alertController.create(options);
    await alert.present();
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
