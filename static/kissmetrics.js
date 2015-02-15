var wpcom = window.wpcom || {};
var _kmq = _kmq || [];
function _kms(u) {
    setTimeout(function () {
        var d = document, f = d.getElementsByTagName('script')[0], s = d.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = u;
        f.parentNode.insertBefore(s, f);
    }, 1);
}
(function ($) {
    wpcom.kissmetrics = {recordEvent: function (name, properties, prefixProperties) {
        var prefixedProperties = {};
        properties = properties || {};
        if (prefixProperties) {
            $.each(properties, function (property, value) {
                prefixedProperties[name + ' | ' + property] = value;
            });
        } else {
            prefixedProperties = properties;
        }
        typeof _tkq !== "undefined" ? _tkq.push(['recordEvent', name, prefixedProperties]) : _kmq.push(['record', name, prefixedProperties]);
    }, setProperty: function (property) {
        typeof _tkq !== "undefined" ? _tkq.push(['setProperties', property]) : _kmq.push(['set', property]);
    }, init: function () {
        var kissmetrics = window.kissmetrics_api || {}, queries = window.kissmetrics_queries || {}, events = queries.events || {}, properties = queries.properties || {};
        if (!kissmetrics.api_key) {
            return;
        }
        _kms('//i.kissmetrics.com/i.js');
        _kms('//doug1izaerwt3.cloudfront.net/' + kissmetrics.api_key + '.1.js');
        if (kissmetrics.username) {
            typeof _tkq !== "undefined" ? _tkq.push(['identifyUser', kissmetrics.user_id, kissmetrics.username]) : _kmq.push(['identify', kissmetrics.username]);
        }
        $.each(events, function () {
            wpcom.kissmetrics.recordEvent(this.name, this.properties);
        });
        $.each(properties, function () {
            wpcom.kissmetrics.setProperty(this);
        });
    }, clearNamedIdentity: function () {
        typeof _tkq !== "undefined" ? _tkq.push(['clearIdentity']) : _kmq.push(['identify', null]);
    }};
    $(wpcom.kissmetrics.init);
    $('#wp-admin-bar-logout').on('click', wpcom.kissmetrics.clearNamedIdentity);
}(jQuery));