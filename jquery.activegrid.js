/**
 * Active Grid jQuery plugin
 *
 * Copyright 2009, Jeremy Fisher
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * @author Jeremy Fisher <jeremy@rentawebgeek.com>
 */

/*global jQuery
 */
(function ($) {
    $.fn.activeGrid = function (opts) {
        var options = $.extend({}, $.fn.activeGrid.defaults, opts);
        
        this.each(function () {
            var $grid = $(this);
            $grid.find(':input:last').each(function (pos) {
                $(this).blur(function () {
                    // Find the parent form 
                    var $form = $grid.children('form:eq(0)');
                    
                    // Build a request
                    var req = options;
                    if ($form.attr('action')) {
                        req.url = $form.attr('action');
                    }
                    if ($form.attr('method')) {
                        req.method = $form.attr('method');
                    }
                    
                    req.data = {};
                    
                    // Build data for submission
                    $grid.find(':input').not(req.exclude).each(function (pos) {
                        var $this = $(this);
                        req.data[$this.attr('name')] = $this.val();
                    });
                    
                    $.ajax(req);
                    
                });
            });
        });
        return this;
    };
    
    $.fn.activeGrid.defaults = {
        type: 'GET',
        dataType: 'json',
        exclude: '.ag-exclude, [readonly]'
    };
    
})(jQuery);

