// Global variables
var vh;
var offset;
var scene;
var camera;
var height;
var hStyle;
var timer = null;
var callToAction;

// Timelines
const tl0 = new TimelineMax({paused: true});
const tl1 = new TimelineMax({paused: true});
const tl2 = new TimelineMax({paused: true});
const tl3 = new TimelineMax({paused: true});
const tl4 = new TimelineMax({paused: true});


var init = function(){//{{{
    // Logo Animation
    var star = document.getElementById("str");
    var arc  = document.getElementById('arc');
    var ant  = document.getElementById('ant');
    var rng  = document.getElementById('rng');

    var arcLength = arc.getTotalLength();
    var antLength = ant.getTotalLength();
    var rngLength = rng.getTotalLength();


    arc.style.strokeDasharray = arcLength;
    ant.style.strokeDasharray = antLength;
    rng.style.strokeDasharray = rngLength;

    arc.style.strokeDashoffset = arcLength;
    ant.style.strokeDashoffset = antLength;
    rng.style.strokeDashoffset = rngLength;

    var tl = new TimelineMax();
    tl.set('#str', {opacity: 0})
      .set('#iphone', {opacity: 0})
      .set('#plane', {opacity: 0})
      .to(arc, .6, {strokeDashoffset: 0}, .3)
      .to(ant, .6, {strokeDashoffset: 0}, .3)
      .to(rng, .9, {strokeDashoffset: 0}, .6)
      .to(str, .7, {opacity: 1}, 1.5)
      .to('#iphone', .1, {opacity: 1}, 1.9)
      .to('#plane',.1,{opacity: 1},2.3);
  

    //Contact Form
//   callToAction = document.getElementById('c2a');
//   callToAction.addEventListener('click', dispatcher);
    // Get vh dimensions
  /*
    var el = document.createElement('div');
    nt.body.appendChil
    el.style.height = '100vh';
    vh = el.getBoundingClientRect().height;
    document.body.removeChild(el);
    console.log(vh);
   */

  scene  = document.getElementsByClassName('scene');
  camera   = document.getElementsByClassName('camera');

    // Timelines Definitions
    tl1.set('#qubit',{autoAlpha:1, transform: 'scale(1)'})
       .set('.E p',{autoAlpha:1, transform: 'scale(1)'})
       .set('.ea',{transform: 'rotatey(0deg)', transform:'scale(1)'})
       .set('#client',{attr:{viewBox:'500 500 1 1'}})
       .to('#qubit',.1,{autoAlpha:0, transform: 'scale(0)'}, .01)
       .to('.E p',.1,{autoAlpha:0,transform:'scale(0)'}, .01)
       .to('.ea',.5,{transform:'rotateY(60deg)'},.02)
       .to('.ea',.5,{transform:'translate(-10vw, -13vh) scale(0)'},.02)
       .set('#qubit, #stack, .ea',{display:'none'})
       .set('body',{backgroundColor: '#fff'})
       .to('#client', 1, {display:'block'})
       .to('#client',2,{attr:{viewBox:'0 0 1471 864'}});
}//}}}

/*
var dimmer = (function(){
    calls = 0;
    var bo = new TimelineMax({paused: true}); 
    bo.to('')
    return function(){
	if (calls % 2 == 0) {
	}
    }  
})();
*/

var animate = (function(){//{{{
    // Scene one // should be a closure with a returned function 

    let f0 = function(pct){
	tl0.progress(pct);
    }

    // Scene two
    let f1 = function(pct){
	tl1.progress(pct);
    }

    // Scene three
    let f2 = function(pct){
	tl2.progress(pct);
    }
    
    // Scene Four
    let f3 = function(pct){
	tl3.progress(pct);
    }

    // Scene Five
    let f4 = function(pct){
	tl4.progress(pct);
    }

    // Scene Six
    var f5 = function(pct){
	return;
    }

    // Email animation
    var f6 = function(){
	let tl = new TimelineMax({paused: true});
	/*
	tl.to('#c2a',1,{transform:'rotateY(0)'})
	  .set('#lable',{autoAlpha: 0})
	  .set('#email',{autoAlpha: 1})
	  */
	  tl.to('#c2a',3,{width: '100em'});
	  /*.to('#c2a rect',2,{attr:{transformOrigin:"100% 50%", width: '95%', height:'80%',},ease:Expo.easeInOut});*/
	tl.play();
    }

    var arr = [f0, f1, f2, f3, f4, f5, f6];

    return arr;
})();//}}}

var play = (function(){//{{{

  // closure scope
  let lastY = null;
  let i = 0;

  //function called by the event listener
  return function(e){
    let frame = scene[i].getBoundingClientRect();
    let cam   = camera[i].getBoundingClientRect(); // replace with clientHeight
    var length = cam.height - window.innerHeight;

    // Determine scroll direction
    if (lastY < window.pageYOffset && frame.bottom < 0) {
	i++;
      }
    else if (frame.top > window.innerHeight && (i > 0)) {
	i--;
    }
      if (frame.top ==  0 && frame.bottom == window.innerHeight) {
	  // Get camera scroll percentage
	  let pct = ((~cam.top+1) / length);
	  animate[i](pct);
	  console.log(pct);
	  pct = null;
      }

    lastY = window.pageYOffset;
  }
})();//}}}

function validateEmail(email){//{{{
      var re = '/^([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(\[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/';
  return re.test(email);
}//}}}

var dispatcher = (function(){//{{{
    var message = document.getElementById('message');
    var box   = {
	b:   1, // button
	e:   2, // email
	t:   4, // text
	s:   8  // submitted
    };
    var state = box.b;

    return function(e){
	e.stopPropagation();
	/*
	if (state & box.b) {
	    callToAction.addEventListener('click', dispatcher);
	    animate[0](); // Animate fade out to bttm
	    return;
	}
	*/
	
	if(state & box.b){
	    state ^= box.b;
	    state = box.e;
	    callToAction.removeEventListener('click', dispatcher);
	    animate[5](); // reveal email input
	    let snd = document.getElementById('snd');
	    snd.addEventListener('click', dispatcher);
	    let email = document.getElementById('email');
	    email.addEventListener('keyup', function(e){
		if (e.keyCode == 13) {
		    dispatcher();
		}
	    });
	    document.addEventListener('click', function(e){
		if(e.target.closest('#c2a')){
		    console.log('click');
		    return;
		}
		else {
		    console.log('exit');
		    return;
		    // close box and set state & box.b;
		}
		
	    });
	    return;
	}
	
	if(state & box.e){
	    console.log('email');
	    state ^= box.e;
	    state = box.t;
	    return;
	    /*
	    if (validateEmail(email.value)) {
		animate[0](); // reveal textArea
		return;
	    }
	    else {
		animamate[0](); // ivalid animation (shake)
		return;
	    }
	    */
	}
	
	 if (state & box.t) {
	     console.log('text');
	     if (message.value) {
		 // submit it
		 animate[0](); // display thank you
	     }
	 }
    }
})();//}}}

// Event Listeners
document.addEventListener('DOMContentLoaded', init);
if (document.documentElement.clientWidth > 640) {
    document.addEventListener('scroll', play);
}
