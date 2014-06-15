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
        app.bindTheEvents();
    },
    // Update DOM on a Received Event
    bindTheEvents: function() {
        console.log('device is ready, binding custom events');
        //initialize page once the DOM is fully loaded to avoid strange flick once the header and footer load
        $.mobile.initializePage(); 
        
        // cache some variables
        var $menu_btn = $('.menu_btn');
        var $drugPage = $('#drug_item');
        var $tabs = $('#tabs'); 
        var $document = $(document);
        var $window = $(window);
        var theHeight = $(window).height();

        // hide statusBAr
        if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)){
            statusbar = window.plugins.statusBar;
            statusbar.hide();
        }

        // create toolbars
        $( "[data-role='header'], [data-role='footer']" ).toolbar({
            theme: 'a',
            tapToggle: false
        });

        //create panels
        $( "[data-role='panel']" ).panel();        

        // bind functions that execute on every pageshow
        $(document).on('pageshow pageinit', '[data-role="page"]', function(){
            app.calcPageHeight();
        });

        // mange the state of the back button
        app.manageBackBtn();

        // calculate height 
        app.calcPageHeight();

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

        // if device is offline and get back online
        document.addEventListener('online', this.verificarFechas, false);

        // trigger if is a mobile device
        if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)){
          // if device is connected to a network update data
          if((navigator.network.connection.type).toUpperCase() != "NONE" && (navigator.network.connection.type).toUpperCase() != "UNKNOWN") {
             // check for updates every time the app initialize
             this.verificarFechas();
          }else{
            alert('Esta aplicación funciona mejor conectada a internet. Porfavor revisa tu conexión.');
          }  
        }

        this.verificarFechas();    
      

    },

    calcPageHeight: function(){
        scroll(0,0);

        var headerH =  $( "#header").outerHeight();
        var footerH =  $( "#footer").outerHeight();
        var winH = $(window).height();
        var content = $('ui-content');
        var page = $("[data-role='page']");
        var contentMargins = content.outerHeight() - content.height();
        var pageH = winH - headerH - footerH - contentMargins;

        // set height to the space betwen header and footer
        page.css({
            'min-height': pageH,
            'height': pageH
        });

    },

    manageBackBtn: function(){
        // root path of the app
        var indexPath = $.mobile.path.getDocumentBase();
        // reference to back btn
        var $backBtn = $('#back_btn');

        $(window).on('pagebeforeshow', function(event,data){
          // path after navigate
          var currentPath = $.mobile.path.getLocation();
          console.log(currentPath);
          if(currentPath !== indexPath && !$backBtn.hasClass('block')){
            //  if the path is different to index show the back btn
            $backBtn.addClass('block');
            console.log('removing');
          }else{
            // if not doesnt show
            $backBtn.removeClass('block');
            console.log('not removing');
          }
        });
    }
};
