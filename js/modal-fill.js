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
      // which displays JQuery or Angular logo
      // for JQuery projects construct css file url as style.css
      // for AngularJS projects construct css file url as css/main.css
      var cssUrl = "";
      var jsUrl = "";
      var scssUrl = "";
      var tabJsToSass = false;

      var framework = $(this).find(".framework").attr("alt");

      switch (framework) {
        case "htmlcss":
          cssUrl = "css/style.css";
          break;
        case "sass":
          cssUrl = "sass/main.css";
          jsUrl = "sass/main.scss";
          tabJsToSass = true;
          tabJsOrSassIsPresent = 2;
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
            }
          }),
          // load index.html of processed project into global variable tabHtml
          // and add syntax highlight with Prism.js
          $.ajax({
            url: projectUrl + "index.html",
            cache: false,
            success: function(result){
              tabHtml = "<pre><code id=\"html-code\" class=\"language-markup\">" + Prism.highlight(result, Prism.languages.markup) + "</code></pre>";
            }
          }),
          // load style.css of processed project into global variable tabCss
          // and add syntax highlight with Prism.js
          $.ajax({
            url: projectUrl + cssUrl,
            cache: false,
            success: function(result){
              tabCss = "<pre><code id=\"css-code\" class=\"language-css\">" + Prism.highlight(result, Prism.languages.css) + "</code></pre>"
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
            }
          })
        ).then( function (resp1, resp2) {
          $(target).modal('show');
        })
      } else { // this case jsUrl = "" so Javascript tab is empty and we execute only
      // 3 ajax calls and when all 3 ajax calls are completed we show modal window
        $.when(
          $.ajax({
            url: projectUrl + "overview.html",
            cache: false,
            success: function(result){
              tabOverview = result;
            }
          }),
          // load index.html of processed project into global variable tabHtml
          // and add syntax highlight with Prism.js
          $.ajax({
            url: projectUrl + "index.html",
            cache: false,
            success: function(result){
              tabHtml = "<pre><code id=\"html-code\" class=\"language-markup\">" + Prism.highlight(result, Prism.languages.markup) + "</code></pre>";
            }
          }),
          // load style.css of processed project into global variable tabCss
          // and add syntax highlight with Prism.js
          $.ajax({
            url: projectUrl + cssUrl,
            cache: false,
            success: function(result){
              tabCss = "<pre><code id=\"css-code\" class=\"language-css\">" + Prism.highlight(result, Prism.languages.css) + "</code></pre>"
            }
          })
        ).then( function (resp1, resp2) {
          $(target).modal('show');
        })

    }; // end of ajax calls and show modal

  };// end of tabPaneContent function

  var modalFill = function () {

    // reset tab names and tab panes
    console.log('show.bs.modal + resetting tabs')
    // $(".modal-body ul.nav.nav-tabs li a[href$='#javascript']").text('javascript');
    // $(".modal-body .tab-content .tab-pane").text('');

    var $modalBody = $(this).find(".modal-body");

    // tabHandler function used in .ajax() call
    // fills initial Overview tab and manages tab switching
    var tabHandler = function(result) {

      // fill in .modal-body with tab structure from /portfolio/pages/modal.html
      $modalBody.html(result);
      // $(".modal-body").html(result); //
      // change Javascript tab name to SASS/SCSS if necessary
      // insert overview.html content of the processed project stored in tabOverview
      // into initial tab pane
      $modalBody.find("#overview").html(tabOverview);
      // $(".modal-body").find("#overview").html(tabOverview); //

      //
      if (tabJsOrSassIsPresent) { // name Javascript or SASS/SCSS tab
        if ( tabJsOrSassIsPresent === 2 ) {
          $(".modal-body ul.nav.nav-tabs li a[href$='#javascript']").text('sass/scss')
        } else {
          $(".modal-body ul.nav.nav-tabs li a[href$='#javascript']").text('javascript')
        }
      } else { // delete this tab
        $(".modal-body ul.nav.nav-tabs li a[href$='#javascript']").remove()
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
        tabSwitcher(event)
      });

    }; // end of tabHandler function

    //Fill modal window with tabs universal structure from /portfolio/pages/modal.html
    //and callback tabHanler on success
    $.ajax({
      url: "/portfolio/pages/modal.html",
      cache: false,
      success: function(result) {
        tabHandler(result)
      }
    });

  };

  // prepare content for modal window
  $(".prj-details").on('click', tabPaneContent);

  // fill modal window
  $(".modal").on("shown.bs.modal", modalFill);

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
