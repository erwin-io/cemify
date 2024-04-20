// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  pusher: {
    key: 'f1456b01b6514f09b9a3',
    cluster: 'ap1',
  },
  inAppKeys: {
    tapAlert: 'tap-alert',
    linkStudent: 'link-student',
    announcement: 'announcement',
    appUpdate: 'app-update'
  },
  oneSignalAppId: '57cd7844-8ada-4060-ae0d-bba1ec27ad12',
  apiBaseUrl: 'http://192.168.254.140:3000/api/v1',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
