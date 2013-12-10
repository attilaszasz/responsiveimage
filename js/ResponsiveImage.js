/*
 * ResponsiveImage jQuery Plugin
 *
 * Copyright (c) 2014
 * Licensed under the MIT license.
 *
 */

(function ($) {
    $.ResponsiveImage = {
        bandwidth: null,
        responseTimeMS: null,
        devicePixelRatio: null,
        transparentGifSrc: 'data:image/gif;base64,R0lGODlhAQABAIAAAMz/AAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
    };

    $.ResponsiveImage.defaults = {
        minResponseTimeMS: 1000,  //tweak this value so it represents a meaningful cutoff for your website
        forcedBandwidth: false
    };

    $.fn.ResponsiveImage = function (options) {
        var settings = $.extend({
            callback: function () { }
        }, $.ResponsiveImage.defaults, options);
        var $images = $(this);

        // get pixel ratio
        $.ResponsiveImage.devicePixelRatio = 1;
        if (window.devicePixelRatio !== undefined) {
            $.ResponsiveImage.devicePixelRatio = window.devicePixelRatio;
        } else if (window.matchMedia !== undefined) {
            for (var i = 1; i <= 2; i += 0.5) {
                if (window.matchMedia('(min-resolution: ' + i + 'dppx)').matches) {
                    $.ResponsiveImage.devicePixelRatio = i;
                }
            }
        }

        var setImageSource = function ($el, src) {
            $el.attr('src', $.ResponsiveImage.transparentGifSrc)
                    .css('max-height', '100%')
                    .css('max-width', '100%')
                    .css('background', 'url("' + src + '") no-repeat 0 0')
                    .css('background-size', 'contain');
        };

        var getResponseTime = function () {
            if (!window.performance) {
                return 0;
            }
            return window.performance.timing.responseEnd - window.performance.timing.requestStart;
        };

        this.responseTimeMS = getResponseTime();

        if (settings.forcedBandwidth) {
            $.ResponsiveImage.bandwidth = settings.forcedBandwidth;
        } else {
            if (this.responseTimeMS <= settings.minResponseTimeMS) {
                $.ResponsiveImage.bandwidth = 'high';
            } else {
                $.ResponsiveImage.bandwidth = 'low';
            }
        }

        settings.callback.call(this);

        $images.each(function () {
            var $el = $(this);

            if (!$el.data('src-small')) {
                $el.data('src-small', $el.attr('src'));
            }

            // check for zero which often happens in safari.
            if (!$el.attr('width') && $el.width() > 0) {
                $el.attr('width', $el.width());
            }
            if (!$el.attr('height') && $el.height() > 0) {
                $el.attr('height', $el.height());
            }

            $el.on('setSrc.ResponsiveImage', function () {
                if ($.ResponsiveImage.bandwidth === 'low') {
                    setImageSource($el, $el.data('src-small'));
                } else {
                    // check if client can get high res image
                    if ($.ResponsiveImage.devicePixelRatio >= 2 && $.ResponsiveImage.bandwidth === 'high') {
                        setImageSource($el, $el.data('src-large'));
                    } else {
                        setImageSource($el, $el.data('src-normal'));
                    }
                }
                // turn off so ResponsiveImage() can be called many times on same element.
                $el.off('setSrc.ResponsiveImage');
            });
        });

        $images.trigger('setSrc.ResponsiveImage');

        return $images;
    };
})(jQuery);