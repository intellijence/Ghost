// # Date Helper
// Usage: `{{date format="DD MM, YYYY"}}`, `{{date updated_at format="DD MM, YYYY"}}`
//
// Formats a date using moment.js. Formats published_at by default but will also take a date as a parameter

var moment          = require('moment'),
    moment_jalali   = require('moment-jalali'),
    date;

moment_jalali.loadPersian();

var fixNums = function(str) {
        var arr = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        for(var i=0;i<10;i++) {
                str = str.replace(i,arr[i]);
        }
        return str;
};

date = function (context, options) {
    if (!options && context.hasOwnProperty('hash')) {
        options = context;
        context = undefined;

        // set to published_at by default, if it's available
        // otherwise, this will print the current date
        if (this.published_at) {
            context = this.published_at;
        }
    }

    // ensure that context is undefined, not null, as that can cause errors
    context = context === null ? undefined : context;

    var f = options.hash.format || 'jMMMM jDo, jYYYY',
        timeago = options.hash.timeago,
        date;
    if (timeago) {
        date = moment_jalali(context).fromNow();
    } else {
        date = moment_jalali(context).format(f);
    }
    return fixNums(date);
};

module.exports = date;
