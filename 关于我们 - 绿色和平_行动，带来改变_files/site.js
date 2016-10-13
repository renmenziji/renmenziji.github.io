/*global $:false, document:false, window:false, console:false, setTimeout:false */

jQuery( document ).ready( function( $ ) {

var Engine = {
  ui : {
    
    fitvids : function() {
      // this makes all videos responsive
        $(".mainConstrained").fitVids();
    },
    
    tagFilter : function() {
      $('.tax-filter').click( function(event) {
        // Prevent default action of opening tag page, and instead get title attribute of clicked element
        if (event.preventDefault) {
          event.preventDefault();
        } else {
          event.returnValue = false;
        }
        // Get tag slug from title attribute
        var selected_taxonomy = $(this).attr('title');
      });
    },
    
    offcanvas : function() {
      $('#offcanvas-trigger').click(function() {
        $('html').toggleClass('is-offcanvas');
        if($(this).html() === '<span class="fa fa-navicon"></span><span class="text">菜单</span>') {
            $(this).html('<span class="fa fa-close"></span><span class="text">关闭</span>');
        } else {
          $(this).html('<span class="fa fa-navicon"></span><span class="text">菜单</span>');
          $('.primaryNav .submenuGroup').slideUp();
          $('.primaryNav .fa').removeClass('is-open');
        }
      });
    },

    submenus : function() {
      // this deploys the accordian functionality on the sub menu items in the offcanvas nav
      $('.primaryNav .fa').click(function() {
        $(this).siblings('.submenuGroup').slideToggle();
        $(this).toggleClass('is-open');
      });

      // desktop submenus
      $('.primaryNav .menu-item-has-children').mouseover(function() {
        $(this).addClass('is-hover');
      });
      $('.primaryNav .menu-item-has-children').mouseout(function() {
        $(this).removeClass('is-hover');
      });
      // this closes the submenu on desktop
      $('.submenuClose').click(function() {
        $(this).parents('.menu-item-has-children').removeClass('is-hover');
      });
    },

    joinUsRibbonHeights : function() {
      // No way to do this with just css. Flexbox doesnt have deep enough browser support yet

      // Since we only want the heights equalized at larger screen sizes we need to
      // use enquire - which lets you trigger things on different media queries.
      // http://wicky.nillia.ms/enquire.js/
      enquire.register("screen and (min-width:550px)", {
        match : function() {
        $(document).ready(function(){
          $('.joinUsRibbon .inputGroup-header').matchHeight();
        });
        }, unmatch : function() {
          $('.joinUsRibbon .inputGroup-header').matchHeight('remove');
        }
      }, true); // end enquire wrapper
    },

    homeGalleryHeights : function() {
      enquire.register("screen and (min-width:600px)", {
        match : function() {
        $(document).ready(function(){
          $('.homeGallery-list .grid-col').matchHeight({byRow: false});
        });
        }, unmatch : function() {
          $('.homeGallery-list .grid-col').matchHeight('remove');
        }
      }, true); // end enquire wrapper
    },

    filtersMobileShowHide : function() {
      $('.filters-mobileTrigger').click(function(){
        $(this).siblings('.filters-wrapper').slideToggle();
        if ($(this).find('.filters-mobileText').html() === "Show Filters") {
          $(this).find('.filters-mobileText').html('Close Filters');
        } else {
          $(this).find('.filters-mobileText').html('Show Filters');
        }
      });
    },
    
    convioSwitch : function() {
      $('#givingAmount')
  	  .bind('focusin', function(e){
  		$(this)
  		 .data('content', $(this).val())
  		 .val('');
  	  })
  	  .bind('focusout', function(e){
  		if ( $(this).val() === '' ){
  		  $(this).val( $(this).data('content'));
  		}
  	  });
      $('#givingOption').change(function(){
    	if ($('#givingOption').val() == 'monthly' )
     		$('#givingForm').attr("action", "https://secure3.convio.net/gpeace/site/Donation2?df_id=3522&3522.donation=form1");
     	else
 			$('#givingForm').attr("action", "https://secure3.convio.net/gpeace/site/Donation2?df_id=3521&3521.donation=form1");
      });
    },

    featuredImageLayout : function() {
      // adds a class to featured action modules if the image is small, because that requires
      // a special layout
      if ($('.featuredAction .imageGroup img').prop('naturalWidth') <= 860) {
        $('.featuredAction').addClass('is-smallImage');
      }
    },

    subscribe: function () {
      // this makes all videos responsive
      $(".subscribe-form").submit(function(event){
        event.preventDefault();
        if ($("#email").val().trim()=="") {alert("请输入邮箱");}
        else {
          $.get("http://netdonor.net/ea-action/action?ea.campaign.id=28209&ea.client.id=1854&format=json&ea_requested_action=ea_submit_user_form&ea.submitted.page=1&sessionId=7c52b4fc-43c7-4dc0-9d82-b22730880699&ea.tracking.id=&p2p-campaign-id=undefined&email_ok=Y&email="+$("#email").val(),function(result){
            //alert(result.pages[0].form.fields[0].value.replace(/<[^>]+>/g,""));
          });
          alert('谢谢您的参与！');
          $("#email").val("");
        }
      });
    },

    joinus: function () {
      // this makes all videos responsive
      $(".joinUsRibbon-form").submit(function(event){
        event.preventDefault();
        if ($("#user-email").val().trim()=="") {alert("请输入您的邮箱");}
        else {
        $.getJSON("http://netdonor.net/ea-action/action?ea.campaign.id=28209&ea.client.id=1854&format=json&ea_requested_action=ea_submit_user_form&ea.submitted.page=1&sessionId=7c52b4fc-43c7-4dc0-9d82-b22730880699&ea.tracking.id=&p2p-campaign-id=undefined&email_ok=Y&email="+$("#user-email").val(),function(result){
          alert(result.pages[0].form.fields[0].value.replace(/<[^>]+>/g,""));
        });
        alert('谢谢您的参与！');
        $("#user-email").val("");
        }
      });
    }
  }
};

Engine.ui.offcanvas();
Engine.ui.submenus();
Engine.ui.fitvids();
Engine.ui.joinUsRibbonHeights();
Engine.ui.homeGalleryHeights();
Engine.ui.filtersMobileShowHide();
Engine.ui.convioSwitch();
Engine.ui.featuredImageLayout();
  Engine.ui.subscribe();
  Engine.ui.joinus();


});