/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    chart: false,
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        // check if is mobile or desktop to fire onDeviceReady event - just for developing purposes
        if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
            document.addEventListener('deviceready', this.onDeviceReady, false);
        } else {
            this.onDeviceReady();
        }        
        // 
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        console.log('device is ready, binding custom events');
        app.bindTheEvents();
        app.toolBarsInit();
    },
    // Update DOM on a Received Event
    bindTheEvents: function() {
        // cache some variables
        var $menu_btn = $('.menu_btn');
        var $drugPage = $('#drug_item');
        var $tabs = $('#tabs'); 
        var $document = $(document);
        var theHeight = $(window).height();
        var scrolling = false;

        // prevent click on elements when scrolling
        $document.on({
            'scrollstart': function(e) {
                scrolling = true;
                console.log(scrolling);
            },
            'scrollstop': function(e){
                scrolling = false
            }
        });

        // create taps widget
        $.widget( "ui.tabs", $.ui.tabs, {

            _createWidget: function( options, element ) {
                var page, delayedCreate,
                    that = this;

                if ( $.mobile.page ) {
                    page = $( element )
                        .parents( ":jqmData(role='page'),:mobile-page" )
                        .first();

                    if ( page.length > 0 && !page.hasClass( "ui-page-active" ) ) {
                        delayedCreate = this._super;
                        page.one( "pagebeforeshow", function() {
                            delayedCreate.call( that, options, element );
                        });
                    }
                } else {
                    return this._super();
                }
            }
        });

        // Manage the state of the icons in the index page
        $menu_btn.on({

            'touchstart': function(){
                if (!scrolling){
                  $(this).addClass('menu_btn__tap');
                  console.log(scrolling);  
                } 
            },

            'touchend': function(){
                $(this).removeClass('menu_btn__tap');
            }
        });


        // content fits 100% of the window height
        $document.on('pageshow', '[data-role="page"]', function(){
            app.calcPageHeight();
        });

    },
    toolBarsInit: function(){

        $( "[data-role='header'], [data-role='footer']" ).toolbar({theme: 'a'});
    },
    calcPageHeight: function(){
        console.log('calcuting height');

        var headerH =  $( "[data-role='header']").outerHeight();
        var footerH =  $( "[data-role='footer']").outerHeight();
        var winH = $(window).height();
        var pageH = winH - footerH - headerH + 2;

        console.log('the footer height ' + footerH);

        $( "[data-role='page']").height(pageH);
    }
};
