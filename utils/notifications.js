const admin = require('firebase-admin');

exports.notify = async (user, payload) => {
    const options = { priority: 'high', timeToLive: 60 * 60 * 24 }
    return admin.messaging().sendToDevice(user.fcm_token, payload, options);
}