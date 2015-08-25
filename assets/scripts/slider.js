var slider = new MasterSlider();
slider.setup('masterslider' , {
        width:1400,    // slider standard width
        height:500,   // slider standard height
        space:0,
        layout:'fullwidth',
        autoplay:true,
        loop:true
        // more slider options goes here...
        // check slider options section in documentation for more options.
    });
// adds Arrows navigation control to the slider.
slider.control('arrows');



var slider1 = new MasterSlider();
slider1.control('arrows'); 
slider1.control('slideinfo',{insertTo:"#partial-view-1" , autohide:false, align:'bottom', size:60});
slider1.control('circletimer' , {color:"#FFFFFF" , stroke:9});

slider1.setup('multi-slide-1' , {
  width:380,
  height:210,
  space:10,
  loop:true,
  view:'fadeWave',
  layout:'partialview'
});

var slider2 = new MasterSlider();
slider2.control('arrows'); 
slider2.control('slideinfo',{insertTo:"#partial-view-2" , autohide:false, align:'bottom', size:60});
slider2.control('circletimer' , {color:"#FFFFFF" , stroke:9});

slider2.setup('multi-slide-2' , {
  width:278,
  height:154,
  space:10,
  loop:true,
  view:'fadeWave',
  layout:'partialview'
});
