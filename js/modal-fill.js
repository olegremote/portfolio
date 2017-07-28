// Fill modal with content from link href
// define global variables for tab pane content
var tabOverview = null;
var tabHtml = null;
var tabCss = null;
var tabJs = null;

var tabJsOrSassIsPresent = 0; // global variable
// = 0 - no Javascript / SASS tab in modal window
// = 1 - Javascript tab in modal window
// = 3 - SASS tab in modal window

var main = function() {

  $('.modal').modal({ show: false});

  // for carousel .prj-details clicks to work
  // we have to reset the filter
  $(".carousel .prj-details").click(function() {
    $('.nav li').removeClass('active');
    $('.project:hidden').show();
    $('.nav li a span').removeClass();
    $('.nav li a span').addClass('glyphicon glyphicon-check');
    $('.nav #reset a span').removeClass();
    $('.nav #reset a span').addClass('glyphicon glyphicon-off');
  });

  // load all tab panes that correspond to chosen project
  // from external files and store them in corresponding variables
  var tabPaneContent = function() {

      var target = $(this).attr("data-target");
      var projectId = String(target).replace("#", "").replace("-more", "");
      var projectUrl = "prj/" + projectId + "/";

      // we define type of project based on alt attribute of img tag
      // which displays CSS/JQuery/SASS/Angular or React logo
      var framework = $(this).find(".framework").attr("alt");

      // find modal body that corresponds to clicked ".prj-details" div
      var $modalBody = $(this).parent(".ih-item").siblings(".modal").find('.modal-body');
      console.log('modal body now is' + $modalBody.html());

      // initialize url variables that will be used later in AJAX calls
      var cssUrl = "";
      var jsUrl = "";
      var scssUrl = "";
      var tabJsToSass = false; // defines wether to rename Javascript tab to SASS/SCSS

      // for JQuery projects construct css file url as style.css
      // for AngularJS projects construct css file url as css/main.css etc.
      // and similar for jsUrl depending on the internal structure of corresponding projects
      switch (framework) {
        case "htmlcss":
          cssUrl = "css/style.css";
          tabJsOrSassIsPresent = 0; // there is no Javascript (SASS) tab in this case
          // so later it will be removed from the DOM based on the value of this variable
          break;
        case "sass":
          cssUrl = "sass/main.css";
          jsUrl = "sass/main.scss";
          tabJsToSass = true;
          tabJsOrSassIsPresent = 2; // in this case Javascript tab will be renamed to SASS/SCSS
          break;
        case "jquery":
          cssUrl = "style.css";
          jsUrl = "app.js";
          tabJsOrSassIsPresent = 1;
          break;
        case "angularjs":
          cssUrl = "css/main.css";
          jsUrl = "js/controllers/MainController.js";
          tabJsOrSassIsPresent = 1;
          break;
      };

      // if Javascript (or SASS/SCSS) tab is present
      // we execute 4 ajax calls (overview, html, css & javascript or SASS)
      // when all 4 ajax calls are completed we can open modal window
      if (jsUrl) {
        $.when(
          $.ajax({
            url: projectUrl + "overview.html",
            cache: false,
            success: function(result){
              tabOverview = result;
            },
            error: function(jqXHR, exception) {
              tabOverview = '<h1> Error' + jqXHR.status + '</h1>' + '<p>' + exception + '</p>'
            }
          }),
          // load index.html of processed project into global variable tabHtml
          // and add syntax highlight with Prism.js
          $.ajax({
            url: projectUrl + "index.html",
            cache: false,
            success: function(result){
              tabHtml = "<pre><code id=\"html-code\" class=\"language-markup\">" + Prism.highlight(result, Prism.languages.markup) + "</code></pre>";
            },
            error: function(jqXHR, exception) {
              tabHtml = '<h1> Error' + jqXHR.status + '</h1>' + '<p>' + exception + '</p>'
            }
          }),
          // load style.css of processed project into global variable tabCss
          // and add syntax highlight with Prism.js
          $.ajax({
            url: projectUrl + cssUrl,
            cache: false,
            success: function(result){
              tabCss = "<pre><code id=\"css-code\" class=\"language-css\">" + Prism.highlight(result, Prism.languages.css) + "</code></pre>"
            },
            error: function(jqXHR, exception) {
              tabCss = '<h1> Error' + jqXHR.status + '</h1>' + '<p>' + exception + '</p>'
            }
          }),
          // load app.js of processed project into global variable tabJs
          // and add syntax highlight with Prism.js
          $.ajax({
            url: projectUrl + jsUrl,
            cache: false,
            success: function(result){
              if (tabJsToSass) {
                tabJs = "<pre><code id=\"sass-code\" class=\"language-scss\">" + Prism.highlight(result, Prism.languages.scss) + "</code></pre>"
              } else {
                tabJs = "<pre><code id=\"js-code\" class=\"language-javascript\">" + Prism.highlight(result, Prism.languages.javascript) + "</code></pre>";
              }
            },
            error: function(jqXHR, exception) {
              tabJs = '<h1> Error' + jqXHR.status + '</h1>' + '<p>' + exception + '</p>'
            }
          }),
          // load universal modal window structure
          // from modal.html
          $.ajax({
            url: "pages/modal.html",
            cache: false,
            success: function(result) {
              console.log('modal.html AJAX success');
              // fill corresponding modal window with universal modal window structure
              $modalBody.html(result);
              console.log('modal body now is' + $modalBody.html());
            },
            error: function(jqXHR, exception) {
              $modalBody.html('<h1> Error' + jqXHR.status + '</h1>' + '<p>' + exception + '</p>')
            }
          })
        ).then( function () {
          console.log('Call modal show after AJAX success');
          console.log('overview is' + tabOverview);
          // fill overview tab of modal window before modal is opened
          $modalBody.find("#overview").html(tabOverview);
          $(target).modal();
        })
      } else { // this case jsUrl = "" so Javascript tab is empty and we execute only
      // 3 ajax calls and when all 3 ajax calls are completed we show modal window
        $.when(
          $.ajax({
            url: projectUrl + "overview.html",
            cache: false,
            success: function(result){
              tabOverview = result;
              console.log('Overview Ajax success');
            },
            error: function(jqXHR, exception) {
              tabOverview = '<h1> Error' + jqXHR.status + '</h1>' + '<p>' + exception + '</p>'
            }
          }),
          // load index.html of processed project into global variable tabHtml
          // and add syntax highlight with Prism.js
          $.ajax({
            url: projectUrl + "index.html",
            cache: false,
            success: function(result){
              tabHtml = "<pre><code id=\"html-code\" class=\"language-markup\">" + Prism.highlight(result, Prism.languages.markup) + "</code></pre>";
              console.log('HTML Ajax success');
            },
            error: function(jqXHR, exception) {
              tabHtml = '<h1> Error' + jqXHR.status + '</h1>' + '<p>' + exception + '</p>'
            }
          }),
          // load style.css of processed project into global variable tabCss
          // and add syntax highlight with Prism.js
          $.ajax({
            url: projectUrl + cssUrl,
            cache: false,
            success: function(result){
              tabCss = "<pre><code id=\"css-code\" class=\"language-css\">" + Prism.highlight(result, Prism.languages.css) + "</code></pre>";
              console.log('CSS Ajax success');
            },
            error: function(jqXHR, exception) {
              tabCss = '<h1> Error' + jqXHR.status + '</h1>' + '<p>' + exception + '</p>'
            }
          }),
          // load universal modal window structure
          // from modal.html
          $.ajax({
            url: "pages/modal.html",
            cache: false,
            success: function(result) {
              console.log('modal.html AJAX success');
              // fill corresponding modal window with universal modal window structure
              $modalBody.html(result);
              console.log('modal body now is' + $modalBody.html());
            },
            error: function(jqXHR, exception) {
              $modalBody.html('<h1> Error' + jqXHR.status + '</h1>' + '<p>' + exception + '</p>')
            }
          })
        ).then( function () {
          console.log('Call modal show after AJAX success');
          console.log('overview is' + tabOverview);
          // fill overview tab of modal window before modal is opened
          $modalBody.find("#overview").html(tabOverview);
          $(target).modal();
        })

    }; // end of ajax calls and show modal

  };// end of tabPaneContent function

  // tabHandler manages tab switching
  var tabHandler = function(result) {

      // change Javascript tab name to SASS/SCSS if necessary
      console.log(tabJsOrSassIsPresent);
      if (tabJsOrSassIsPresent) { // name Javascript or SASS/SCSS tab
        if ( tabJsOrSassIsPresent === 2 ) {
          $(".modal-body ul.nav.nav-tabs li a[href$='#javascript']").text('sass/scss')
        } else {
          $(".modal-body ul.nav.nav-tabs li a[href$='#javascript']").text('javascript')
        }
      } else { // delete this tab
        $(".modal-body ul.nav.nav-tabs li a[href$='#javascript']").parent("li").remove()
      };
      //

      // every time new tab is shown insert processed project content
      // stored in tabHtml, tabCss and tabJs into corresponding tab pane
      var tabSwitcher = function (event) {

        var $this = $(event.target);
        var tabName = $this.attr('href'); //determines which tab is loaded
        // overviewHtml stores html of initial Overview tab so that we can load it each time the tab is clicked
        // $tabPrefix is the selector for tab-content
        var $tabPrefix = $this.parents(".nav-tabs").siblings(".tab-content");

        // if Javascript / SASS tab is present then fill in 4 tabs
        // else fill 3 tabs
        if (tabJsOrSassIsPresent) {

          switch (tabName) {
            case '#overview':
              $tabPrefix.find("#overview").html(tabOverview);
              break;
            case '#html':
              $tabPrefix.find("#html").html(tabHtml);
              break;
            case '#css':
              $tabPrefix.find("#css").html(tabCss);
              break;
            case '#javascript':
              $tabPrefix.find("#javascript").html(tabJs);
              break;
          }

        } else {

          switch (tabName) {
            case '#overview':
              $tabPrefix.find("#overview").html(tabOverview);
              break;
            case '#html':
              $tabPrefix.find("#html").html(tabHtml);
              break;
            case '#css':
              $tabPrefix.find("#css").html(tabCss);
              break;
          };

        };

      }; // end of if (tabJsOrSassIsPresent)

      $('.nav-tabs a').on("show.bs.tab", function(event) {
        console.log('tabSwitcher starts');
        tabSwitcher(event)
      });

  }; // end of tabHandler function

  // prepare content for modal window
  $(".prj-details").on('click', tabPaneContent);

  // fill modal window
  $(".modal").on("show.bs.modal", tabHandler);

  // we manually clear modal-body html on modal hide
  $(".modal").on("hide.bs.modal", function() {

    var $modalBody = $(this).find(".modal-body");

    $modalBody.empty();
    var tabOverview = null;
    var tabHtml = null;
    var tabCss = null;
    var tabJs = null;

  });

};

$(document).ready(main());
