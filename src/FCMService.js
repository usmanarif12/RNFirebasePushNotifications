import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';

class FCMService {

    register = (onRegister, onNotification, onOpenNotification) => {
        this.checkPermission(onRegister);
        this.createNotificationListeners(onRegister, onNotification, onOpenNotification);
    }

    registerApWithFCM = async () => {
        if (Platform.OS === 'ios') {
            await messaging().registerDeviceForRemoteMessages();
            await messaging().setAutoInitEnabled(true);
        }
    }

    checkPermission = (onRegister) => {
        messaging().hasPermission()
            .then(enabled => {
                if (enabled) {
                //User has Permission
                    this.getToken(onRegister)
                }
                else {
                    this.requestPermission(onRegister)
                }
            }).catch(error => {
                console.log("[FCM Service] Permission Rejected", error);
        });
        
    }

    getToken = (onRegister) => {
        messaging().getToken()
            .then(fcmToken => {
                if (fcmToken) {
                    onRegister(fcmToken)
                } else {
                    console.log("[FCMService] User Does not have device token")
                }
            }).catch(error => {
                console.log("[FCMService] token rejected", error);
            });
    }

    requestPermission = (onRegister) => {
        messaging().requestPermission()
            .then(() => {
                this.getToken(onRegister)
            }).catch(error => {
                console.log("[FCMService] Request Permission Rejected", error);
            });
    }

    deleteToken = () => {
        console.log("[FCMService] delete Token");
        messaging().deleteToken()
            .catch(error => {
                console.log("[FCMService] Delete Token Erro", error);
            });
        
    }

    createNotificationListeners = (onRegister, onNotification, onOpenNotification) => {
        
    
        //When Application is running , but in the background
        messaging()
            .onNotificationOpenedApp(remoteMessage => {
                console.log("[FCMService] OnNotificationOpenedApp Notification cause to open app");
                if (remoteMessage) {
                    const notification = remoteMessage.notification
                    onOpenNotification(notification)
                    //this.removeDeliveredNotification(notification.notificationId)
                }
            });
        //When the app is in quit state
        messaging().getInitialNotification()
            .then(remoteMessage => {
                console.log("[FCMService] Notification caused app to open from quit state");
                if (remoteMessage) {
                    const notification = remoteMessage.notification
                    onOpenNotification(notification)
                }
            });
        
        
         //When the app is in Foreground state
         this.messageListener = messaging().onMessage(async remoteMessage => {

            console.log('[FCMService] A new FCM message Arrived', remoteMessage);
            if (remoteMessage) {
                let notification = null
                if (Platform.OS === 'ios') {
                    notification = remoteMessage.data.notification
                } else {
                    notification = remoteMessage.notification
                }
                onNotification(notification);
            }
         });
        
        
        //Triggered when we have new token
        messaging().onTokenRefresh(fcmToken => {
            console.log('[FCMService] New Token referesh', fcmToken);
            onRegister(fcmToken);
        })
    }

    unRegister = () => {
        this.messageListener();
    }
   
}

export const fcmService = new FCMService();