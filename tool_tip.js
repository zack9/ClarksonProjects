//  Horn's .tool_tip() is spelled with an underscore to distinguish it from other
//  tooltips.  So are his others:  .tool_tip_under() .tool_tip_over(), .tool_tip_fixed_pos()
// and so forth



// img_details() is for showing large format images (many pixels).
//  Pass the image id to img_details and include the viewing div as the argument.
//  Example:   $('#moon').img_details('#lens');
//  Here moon shows as a small image: CSS: img#moon{width:250px} 
//  The "lens" div is also small  shows the details of the full image.
//  Be sure to set overflow:hidden for the lens div so that only the area of detail
//  appears in the lens div.


(function ($){
$.fn.img_detail = function(lens) {
  var pad= $(this[0]);  // image pad
  var pad_id = $(this).attr("id");
  var bigPic = pad_id + "_bigPic";
  var bpic = "#" + bigPic;
  var lens= $(lens);  // for large pic
  lens.hide();
  var pos= pad.offsetParent().position();
  var pos2= pad.position();
  var padpos_left= pos.left + pos2.left
       + parseInt(pad.css("margin-left"));
  var padpos_top= pos.top + pos2.top
       + parseInt(pad.css("margin-top"));
  var picSrc= pad.attr('src');


  var bsize= pad[0].naturalWidth;
  var psize= parseInt(pad.css('width'));
  var ratio= bsize/psize;

  pad.hover(function(){
    $('<img>')
         .attr({'id': bigPic,'src': picSrc})
         .appendTo(lens);
     lens.fadeIn(1000);
     },function(){
     $(bpic).remove();
     lens.hide();
  });

  pad.mousemove(function(ev){
     lens.show();
     var mouseX = ev.pageX - padpos_left;
     var mouseY = ev.pageY - padpos_top;
     mouseX = (ratio * mouseX)-160;
     mouseY = (ratio * mouseY)-160;
     $(bpic).css({
       marginLeft: -mouseX,
       marginTop: -mouseY
    });
  });
 return this;
 }; //end img_details
} (jQuery));



// tool_tip(): On hover over the trigger the tool tip appears over or under the 
// trigger as space permits.  The programmer places the tooltip element right after the 
// trigger element. Position adjustments can be made usin margin-left and margin-top of the 
// tooltip class, but see tool_tip_under. [Uses position(). --  Wm. Dennis Horn 11/24/13

(function ($)  {
   $.fn.tool_tip = function(e){
     var trigger, tt, max_top, full_height;
     var newPos= new Object();
   $(this).hover(function(){
       trigger= $(this);
       trigger.parent().css({position:'relative'});
       tt= trigger.next();
       newPos = trigger.position();

       max_top = parseInt(trigger.offset().top) -  parseInt($(window).scrollTop());
       full_height = tt.outerHeight() + trigger.outerHeight() -20;

       if (max_top < full_height){  //show under
            newPos.top = parseInt(newPos.top + trigger.outerHeight() + 7);
       }
       else {      //show above
           newPos.top = parseInt(newPos.top - (tt.outerHeight() +5));
       };
       tt.css({position:'absolute',
               'top': newPos.top,
               'left': (newPos.left)
       });
       tt.fadeIn(500);
    },
    function(){
        tt.stop(true).fadeOut(700)
    })   //end hover1

     .next().hover(function(){  //chained
        $(this).stop(true).fadeIn(400);
     }, function(){
       $(this).stop(true).fadeOut(400)
    })  //end hover2
   };  // end .tool_tip()
} (jQuery));


//   tool_tip_over() places the tooltip above the trigger. Programmer puts the tooltip ele 
//   right after the trigger. Position adjustments can be made usin margin-left and margin-top 
//   of the tooltip class, but see tool_tip_under. [Uses position(), not offset()]  
(function ($)  {
   $.fn.tool_tip_over = function(e){
     var trigger, tt;
     var newPos= new Object(); 
   $(this).hover(function(){
       trigger= $(this);
       trigger.parent().css({position:'relative'});
       tt= trigger.next();
       var newPos = trigger.position();
       newPos.top =  newPos.top - (tt.outerHeight() + 7);

       tt.css({position:'absolute', 
               'top': newPos.top,
               'left': newPos.left});
       tt.fadeIn(700);
    },
    function(){
        tt.stop(true).fadeOut(1000)
    })   //end hover1

     .next().hover(function(){  //chained
        $(this).stop(true).fadeIn(400);
     }, function(){
       $(this).stop(true).fadeOut(400)
    })  //end hover2
   };  // end .tool_tip_over()
} (jQuery));



//   tool_tip_under() places the tooltip above the trigger. Programmer puts the tooltip ele 
//   right after the trigger. Position adjustments can be made using margin-left and margin-top 
//   of the tooltip class, but see tool_tip_over. [Uses position(), not offset()]  

(function ($)  {
   $.fn.tool_tip_under = function(e){
     var trigger, tt;
     var newPos= new Object();
   $(this).hover(function(){
       trigger= $(this);
       trigger.parent().css({position:'relative'});
       tt= trigger.next();
       var newPos = trigger.position();
       newPos.top = newPos.top + trigger.outerHeight() + 7;

       tt.css({position:'absolute',
               'top': newPos.top,
               'left': newPos.left});
       tt.fadeIn(700);
    },
    function(){
        tt.stop(true).fadeOut(900)
    })   //end hover1

     .next().hover(function(){  //chained
        $(this).stop(true).fadeIn(400);
     }, function(){
       $(this).stop(true).fadeOut(400)
    })  //end hover2
   };  // end .tool_tip_under()
} (jQuery));





// tool_tip_fixed_pos('fixed_element')  Not exactly a tooltip; rather it places the tt in a fixed div that slides up and down with
//the screeen.  For text, the target is best as <em> and the tt can be anything, but span works well.   The
//method requires that the fixed element be enteterd as a parameter.  Therefore, the method can be called more
//than once with separate targets.

(function ($)  {
  $.fn.tool_tip_fixed_pos = function(target){
    var ttip;
    $(this).stop().hover(function(e){
       ttip=$(this).next();
       var contents= ttip.html();
      $(target).html(contents)
      .fadeIn(700);
       }, 
      function(){     //2nd arg to .hover 
      $(target).stop().fadeOut(900)
    });   //end hover1

    $(target).hover(function(){  
       $(this).stop().fadeIn(500);
       }, function(){
       $(this)
          .stop().fadeOut(500)
    });  //end 2nd hover
   };  // end .tool_tip()

} (jQuery));


//  .tool_tip_nested() shows under only.  Nest span tag (the tt) in em tag (the trigger)  
(function ($)  {
  $.fn.tool_tip_nested = function(){
    var top, trigg_left, trigg_top, trigg_height;
    var ttip, ttheight, ttwidth, left, top_offset, top;
    $(this).stop().hover(function(e){

   // position and height of trigger
     trigg_left= parseInt($(this).position().left);
     trigg_top=parseInt($(this).position().top);
     trigg_height = $(this).outerHeight();

   // dimensions of tooltip
     ttip=$(this).find(':nth-Child(1)');  
     ttheight= ttip.outerHeight();
     ttwidth= ttip.outerWidth();
     left=  parseInt(ttwidth/7);
     top_offset = parseInt($(this).offset().top);
     top = trigg_top + trigg_height +5;
    
    // reposition  
      ttip.css('top', top  +"px");
      ttip.css('left',(trigg_left + 10 )  +"px");
      ttip.fadeIn(500);

       }, function(){     //2nd arg to .hover 
      $(this).find(':nth-Child(1)').stop().fadeOut(500)
    });   //end hover1

    $(this).find(':nth-Child(1)').hover(function(){  
       $(this).stop().fadeIn(500);
       }, function(){
        $(this).stop().fadeOut(500)
    });  //end 2nd hover
   };  // end .tool_tip()
} (jQuery));