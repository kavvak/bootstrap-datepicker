module('Conversions', {
    setup: function(){
        this.component = $('<div data-date="12-02-2012"></div>')
                        .appendTo('#qunit-fixture')
                        .datepicker({format: "dd-mm-yyyy"});
        this.dp = this.component.data('datepicker');
        this.startdate = new Date(2014, 0, 1, 0, 0, 0, 0); // Jan 1, 2014
        this.enddate = new Date(2015, 0, 1, 0, 0, 0, 0); // Jan 1, 2014
        this.steps = 60 * 60000; // 1 hour in milliseconds
    },
    teardown: function(){
        this.dp.remove();
    }
});

test('UTCDate : local to utc, then utc back to local', function(){
    var error = [];
    for (var d = this.startdate; d < this.enddate; d = new Date(d.getTime() + this.steps)) {
        var nd = this.dp._utc_to_local(UTCDate(d.getFullYear(),d.getMonth(),d.getDate(),d.getHours(),d.getMinutes(),d.getSeconds(),d.getMilliseconds()));
        var obj = d + " --> " + nd;
        
        if ((d.getTime() - (d.getTimezoneOffset()*60000)) != (nd.getTime() - (nd.getTimezoneOffset()*60000)))
            error.push(obj);
    }
    equal(error.length,0);
});

test('_local_to_utc : local to utc, then utc back to local', function(){
    var error = [];
    for (var d = this.startdate; d < this.enddate; d = new Date(d.getTime() + this.steps)) {
        var nd = this.dp._utc_to_local(this.dp._local_to_utc(d));
        var obj = d + " --> " + nd;
        
        if ((d.getTime() - (d.getTimezoneOffset()*60000)) != (nd.getTime() - (nd.getTimezoneOffset()*60000)))
            error.push(obj);
    }
    equal(error.length,0);
});
