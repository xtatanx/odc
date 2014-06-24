
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
        var $menu_btn = $('.menu_btn_link');
        var $drugPage = $('#drug_item');
        var $tabs = $('#tabs'); 
        var $document = $(document);
        var $window = $(window);
        var theHeight = $(window).height();
        var drugName;  // name of the drug to search in localStorage
        var oldAndroid; // var to check if is olb browser

        if(navigator.userAgent.match(/Android 2.3.3/)){
          $.mobile.defaultPageTransition = 'none';
          $.mobile.defaultDialogTransition = 'none';
          oldAndroid = true; // is android 2.3
        }else{
          console.log("false");
        }
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
        $(document).on('pageshow pageinit pagebeforeshow', '[data-role="page"]', function(e){
            app.calcPageHeight();
            
            // only fill image with red points if the event is a pageshow
            if(e.type === "pageshow"){
              app.createPoints(drugName);
              app.fillDescription(drugName);
              app.replaceSvg();

              if(oldAndroid){
                app.manageScroll();               
              }              
            }

            if(e.type === "pagebeforeshow"){
              app.manageTabs();
            }
        });

        // if is android 2.3
        if(oldAndroid){
          app.manageScroll();               
        } 

        this.alertBtns();
        // mange the state of the back button
        this.manageBackBtn();

        // calculate height 
        this.calcPageHeight();

        //  save reference to the drug to search in local storage
        $menu_btn.on("tap", function(){
          drugName = $(this).data("title");
        });
        

        // trigger if is a mobile device
        if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/))
        {
          console.log(navigator.connection.type);
          // if device is connected to a network update data
          if((navigator.connection.type).toUpperCase() != "NONE" && (navigator.connection.type).toUpperCase() != "UNKNOWN") {
            // check for updates every time the app initialize
            this.verificarFechas();
            // if device is offline and get back online
            document.addEventListener('online', this.verificarFechas, false);
          }else{
            alert('Esta aplicación funciona mejor conectada a internet. Porfavor revisa tu conexión.');
          }  
        }

      

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
    },

    alertBtns: function(){
      // cache variables
      var $body = $("body"); // el evento depende de body ya que el contenido se carga dinamicamente.

      $body.on("tap", ".red_point", function(){
        var drug = $(this).data("drug"); // cojemos el valor de data-drug para saber que droga consultar
        var bodypart = $(this).data("position"); // data position nos indica la parte del cuerpo a consultar
        var alertDataPart = window.localStorage.getItem(drug+ "-"+bodypart);
        console.log(drug+ "-"+bodypart);
        if(bodypart==="Otros"||bodypart==="otros")
            navigator.notification.alert(alertDataPart,null,"Otros efectos:",'OK');
         else if(bodypart.slice(-1)=="s")
            navigator.notification.alert(alertDataPart,null,"Efectos en tus "+bodypart.toLowerCase()+":",'OK');
        else 
            navigator.notification.alert(alertDataPart,null,"Efectos en tu "+bodypart.toLowerCase()+":",'OK');
      });

    },

    createPoints: function(drugName){
      var drugRegex = new RegExp( drugName + "-" );
      var $container = $("#puntos");
      //  for every item in local storage match only drugName string
      for(var drug in window.localStorage){
        if(drug.match(drugRegex)){ // if drug matches example: 'Extasis-'
          var position = drug.split("-");
          position = position[1];
          //  crate circle
          $container.append('<div class="red_point ' + position.split(" ").join("").toLowerCase() + '"  data-position="' + position + '" data-drug="' + drugName + '"></div>');
        }
      }

    },

    fillDescription: function(drugName){
      // create a p tag with the description inside
      var description = $("<p>").text(window.localStorage.getItem("descripcion-" + drugName));
      var $descriptionW = $("#description"); //description wrapper
      var $additionalInfo = $("#aditional_info");
      // add description to the wrapper
      $descriptionW.html(description);
      $additionalInfo.fadeIn();      
    },

    replaceSvg: function(){
      Modernizr.svg = false;
      if (!Modernizr.svg) {
        var $images = $("img[src$='.svg']");

        $images.each(function(){
          var fallback = $(this).data("fallback");
          $(this).attr("src", fallback);
        });
      }    
    },

    manageTabs: function(){
      var $body = $("body");
      var $tabsContent = $(".tab_body");

      $tabsContent.hide().eq(0).show().trigger("updatelayer");
      $body.on("tap", ".tab" , function(e){
        e.preventDefault();

        $target = $(this).attr("href");
        $tabsContent.hide();
        $("[data-tab='" + $target +"']").show().trigger("updatelayer");
        $(".theiscroll").iscrollview("refresh");
      });
    },

    manageScroll: function(){
      $(".ui-content").children().attr("data-iscroll", "");
      $(".ui-content").children().iscrollview();
      $(".theiscroll").iscrollview("refresh"); 
    }

};
