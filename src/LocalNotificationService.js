import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import { Platform } from 'react-native';

class LocalNotificationService {
    configure = (onOpenNotification) => {
        
        PushNotification.configure({

            //(Optional) called when token is generated (ios and android)
            onRegister: function (token) {
                console.log("[LocalNotificationService] onRegister :" ,token);
            },
        
            //called when a remote is received or opened, or local notification is opened
            onNotification : function (notification) {
                console.log("[LocalNotificationService] onNotification: ", notification);

                if (!notification?.data) {
                    return;
                }
                notification.userInteraction = true;
                onOpenNotification(Platform.OS === 'ios' ? notification.data.item : notification.data);

                //Only Callbacks if not from foreground
                if (Platform.OS === 'ios') {
                    notification.finish(PushNotificationIOS.FetchResult.NoData);
                }
            },
        
            //IOS ONLY (Optional): default: all - Permissions to register
            permissions: {
                alert: true,
                badge: true,
                sound:true,
            },
        
        
            //Should the initial notification be popped automatically
            //default: true
            popInitialNotification: true,
            
            requestPermissions : true,
        })
    }

    unregister = () => {
        PushNotification.unregister();
    }

    showNotification = (id, title, message, data = {}, options = {}) => {
        PushNotification.localNotification({
            /*Android Only Properties */
            ...this.buildAndroidNotification(id, title, message, data, options),
            /*IOS only Propertes*/
            ...this.buildIOSNotification(id, title, message, data, options),
            /* IOS and Android Propertis */
            title: title || "",
            message: message || "",
            playSound: options.playSound || false,
            soundName: options.soundName || 'default',
            userInteraction: false
        });
    }
    buildAndroidNotification = (id, title, message, data = {}, options = {}) => {
        return {
            id: id,
            autoCancel: true,
            largeIcon: options.largeIcon || "ic_launcher",
            smallIcon: options.smallIcon || "ic_notification",
            bigText: message || '',
            subText: title || '',
            vibrate: options.vibrate || true,
            vibration: options.vibration || 300,
            priority: options.priority || "high",
            importance: options.importance || "high",
            data:data,
        }
    }
    buildIOSNotification = (id, title, message, data = {}, options = {}) => {
        return {
            alertAction: options.alertAAction || 'view',
            category: options.category || "",
            userInfo: {
                id: id,
                item:data
            }
        }
    }
    cancelAllLocalNotifications = () => {
        if (Platform.OS === 'ios') {
            PushNotificationIOS.removeAllDeliveredNotifications();
        }
        else {
            PushNotification.cancelAllLocalNotifications();
        }
    }

    removeDeliveredNotifficationById = (notificationId) => {
        PushNotification.cancelAllLocalNotifications({ id: `${notificationId}` });
    }
}

export const localNotificationService = new LocalNotificationService();