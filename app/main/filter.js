'use strict';

chatApp.filter('timeAgo', function () {
    return function (datetime) {
        var dif = Math.round((Date.now() - datetime) / 1000);
        if (dif < 60)
            return 'a few seconds ago';
        if (dif < 60 * 60)
            return Math.round(dif / 60) + ' minutes ago';
        if (dif < 24 * 60 * 60)
            return Math.round(dif / (60 * 60)) + ' hours ago';
        return datetime;
    }
})