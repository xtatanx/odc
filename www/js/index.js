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
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.bindEvents();
    },
    // Update DOM on a Received Event
    bindEvents: function() {
        var $menu_btn = $('.menu_btn');
        var $drugPage = $('#drug_item');
        var $tabs = $('#tabs'); 
        var theHeight = $(window).height();

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

        $menu_btn.on('touchstart', function(){
            $(this).addClass('menu_btn__tap');
        });

        $menu_btn.on('touchend', function(){
            $(this).removeClass('menu_btn__tap');
        });

        $(document).on('pageshow', '#drug_item', function(){
            $(this).height(theHeight);
        });

    }
};
