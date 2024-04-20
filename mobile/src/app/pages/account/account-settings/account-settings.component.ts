import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, ModalController, ToastController } from '@ionic/angular';
import { Observable, Subject, of } from 'rxjs';
import { Users } from 'src/app/model/users';
import { AnimationService } from 'src/app/services/animation.service';
import { AppConfigService } from 'src/app/services/app-config.service';
import { AuthService } from 'src/app/services/auth.service';
import { PageLoaderService } from 'src/app/services/page-loader.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss'],
})
export class AccountSettingsComponent implements OnInit {
  modal: HTMLIonModalElement;
  form: FormGroup;
  currentUser: Users;
  isSubmitting = false;
  isEditMode = false;
  isOpenResultModal = false;
  resultModal: { type: 'success' | 'failed' | 'warning'; title: string; desc: string; done?; retry? };
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  constructor(private modalCtrl: ModalController,
    private actionSheetController: ActionSheetController,
    private appconfig: AppConfigService,
    private authService: AuthService,
    private userService: UserService,
    private animationService: AnimationService,
    private router: Router,
    private storageService: StorageService,
    private pageLoaderService: PageLoaderService,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    public toastController: ToastController) { }

  get formData() {
    return this.form.value;
  }

  get isFormDirty() {
    return (
      this.currentUser.fullName !== this.formData.fullName ||
      this.currentUser.mobileNumber !== this.formData.mobileNumber
    );
  }

  get formControls() {
    return this.form.controls;
  }

  ngOnInit() {
    this.onCreateForm();
  }

  onCreateForm() {
    if(this.isEditMode) {
      this.form = new FormGroup({
        fullName: new FormControl(this.currentUser?.fullName, [Validators.required]),
        mobileNumber: new FormControl(this.currentUser?.mobileNumber, [Validators.required])
      });
    } else {
      this.form = new FormGroup({
        fullName: new FormControl(this.currentUser?.fullName),
        mobileNumber: new FormControl(this.currentUser?.mobileNumber)
      });
    }
  }

  onEdit() {
    this.isEditMode = true;
    this.onCreateForm();
  }

  getError(key: string) {
    return this.form.controls[key];
  }

  async onSubmit() {
    if(!this.form.valid) {
      return;
    }
    const param = this.form.value;
    const logoutSheet = await this.actionSheetController.create({
      cssClass: 'app-action-sheet',
      header: 'Are you sure you want to update your account?',
      buttons: [
        {
          text: 'Yes?',
          handler: async () => {
            try{
              this.isSubmitting = true;
              await this.pageLoaderService.open('Processing please wait...');
              this.userService.updateProfile(this.currentUser?.userCode, param)
                .subscribe(async res => {
                  if (res.success) {
                    console.log(res.data);
                    this.ngUnsubscribe.complete();
                    await this.pageLoaderService.close();
                    this.isSubmitting = false;
                    const toast = await this.toastController.create({
                      duration: 2000,
                      message: 'Account successfully updated!',
                      position: 'bottom',
                      layout: 'baseline',
                    });
                    toast.present();
                    this.isEditMode = false;
                    this.storageService.saveTotalUnreadNotif(
                      res.data?.totalUnreadNotif
                    );
                    this.currentUser = res.data;
                    this.storageService.saveLoginUser(this.currentUser);
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

  async presentAlert(options: any) {
    const alert = await this.alertController.create(options);
    await alert.present();
  }
}
