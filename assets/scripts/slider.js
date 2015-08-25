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