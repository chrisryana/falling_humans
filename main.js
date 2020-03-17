(function() {
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var loadingScreen = document.getElementById('loader');

  var loadCounter = 0;

  var background = new Image();
  var clouds = new Image();
  var shadows = new Image();
  var mask = new Image();
  var humans = new Image();
  var floaties1 = new Image();
  var floaties2 = new Image();
  var floaties3 = new Image();

  var layers = [
    {
      img: background,
      src: './img/layer_1_1.png',
      zIndex: -2.25,
      position: {x: 0, y: 0},
      blend: null,
      opacity: 1,
    },
    {
      img: clouds,
      src: './img/layer_2_1.png',
      zIndex: -2,
      position: {x: 0, y: 0},
      blend: null,
      opacity: 1,
    },
    {
      img: floaties1,
      src: './img/layer_3_1.png',
      zIndex: -1.25,
      position: {x: 0, y: 0},
      blend: 'overlay',
      opacity: 1,
    },
    {
      img: floaties2,
      src: './img/layer_4_1.png',
      zIndex: -0.5,
      position: {x: 0, y: 0},
      blend: 'overlay',
      opacity: 1,
    },
    {
      img: shadows,
      src: './img/layer_5_1.png',
      zIndex: -1.5,
      position: {x: 0, y: 0},
      blend: 'multiply',
      opacity: 0.75,
    },
    {
      img: mask,
      src: './img/layer_6_1.png',
      zIndex: 0,
      position: {x: 0, y: 0},
      blend: null,
      opacity: 1,
    },
    {
      img: humans,
      src: './img/layer_7_1.png',
      zIndex: 0.8,
      position: {x: 0, y: 0},
      blend: null,
      opacity: 1,
    },
    {
      img: floaties3,
      src: './img/layer_8_1.png',
      zIndex: 2,
      position: {x: 0, y: 0},
      blend: null,
      opacity: 0.9,
    },
  ];

  layers.forEach(function(layer) {
    layer.img.onload = function() {
      loadCounter += 1;
      if (loadCounter >= layers.length) {
        hideLoading();
        requestAnimationFrame(drawCanvas);
      }
    }
    layer.img.src = layer.src;
  });

  function hideLoading() {
    loadingScreen.classList.add('hidden');
  }

  function drawCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    TWEEN.update();

    var rotateX = (pointer.y * -0.15) + (motion.y * 1.2);
    var rotateY = (pointer.x * 0.15) + (motion.x * 1.2);

    canvas.style.transform = "rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)";

    layers.forEach(function(layer) {
      layer.position = getOffset(layer);

      if (layer.blend) {
        context.globalCompositeOperation = layer.blend;
      } else {
        context.globalCompositeOperation = 'normal';
      }

      context.globalAlpha = layer.opacity;
      context.drawImage(layer.img, layer.position.x, layer.position.y);
    });

    requestAnimationFrame(drawCanvas);
  }

  function getOffset(layer) {
    var touchMultiplier = 0.3;
    var touchOffsetX = pointer.x * layer.zIndex * touchMultiplier;
    var touchOffsetY = pointer.y * layer.zIndex * touchMultiplier;

    var motionMultiplier = 2.5;
    var motionOffsetX = motion.x * layer.zIndex * motionMultiplier;
    var motionOffsetY = motion.y * layer.zIndex * motionMultiplier;

    var offset = {
      x: touchOffsetX + motionOffsetX,
      y: touchOffsetY + motionOffsetY,
    };

    return offset;
  }


  ////// TOUCH & MOUSE /////

  var moving = false;
  var pointerInitial = {x: 0, y: 0};
  var pointer = {x: 0, y: 0};

  canvas.addEventListener('touchstart', pointerStart);
  canvas.addEventListener('mousedown', pointerStart);

  function pointerStart(event) {
    moving = true;
    if (event.type === 'touchstart') {
      pointerInitial.x = event.touches[0].clientX;
      pointerInitial.y = event.touches[0].clientY;
    } else if (event.type === 'mousedown') {
      pointerInitial.x = event.clientX;
      pointerInitial.y = event.clientY;
    }
  }


  window.addEventListener('touchmove', pointerMove);
  window.addEventListener('mousemove', pointerMove);

  function pointerMove(event) {
    event.preventDefault();
    if (moving === true) {
      var currentX = 0;
      var currentY = 0;
      if (event.type === 'touchmove') {
        currentX = event.touches[0].clientX;
        currentY = event.touches[0].clientY;
      } else if (event.type === 'mousemove') {
        currentX = event.clientX;
        currentY = event.clientY;
      }
      pointer.x = currentX - pointerInitial.x;
      pointer.y = currentY - pointerInitial.y;
    }
  }


  canvas.addEventListener('touchmove', preventDefault);
  canvas.addEventListener('mousemove', preventDefault);

  function preventDefault(event) {
    event.preventDefault();
  }


  window.addEventListener('touchend', endGesture);
  window.addEventListener('mouseup', endGesture);

  function endGesture() {
    moving = false;

    TWEEN.removeAll();
    var pointerTween = new TWEEN.Tween(pointer)
      .to({x: 0, y: 0}, 300)
      .easing(TWEEN.Easing.Back.Out)
      .start();
  }



  //// GYROSCOPE /////

  var motion = {x: 0, y: 0};
  var alpha = 0;
  var beta = 0;
  var totalX = 0;
  var totalY = 0;
  var maxOffset = 2000;
  
  window.addEventListener("devicemotion", onDeviceMotion);

  function onDeviceMotion(event) {
    motion_button.classList.remove('visible');
  
    alpha = event.rotationRate.alpha;
    beta = event.rotationRate.beta;
    
    totalX += beta;
    totalY += alpha;

    if (Math.abs(totalX) > maxOffset) {
      totalX = maxOffset * Math.sign(totalX);
    }
    if (Math.abs(totalY) > maxOffset) {
      totalY = maxOffset * Math.sign(totalY);
    }
    
    var xOffset = -totalY / 100;
    var yOffset = totalX / 100;

    motion.x = xOffset;
    motion.y = yOffset;

    if (window.orientation === 90) {
      motion.x = -xOffset;
      motion.y = -yOffset;
    } else if (window.orientation === -90) {
      motion.x = xOffset;
      motion.y = yOffset;
    } else if (window.orientation === 180) {
      motion.x = -yOffset;
      motion.y = xOffset;
    } else if (window.orientation === 0) {
      motion.x = yOffset;
      motion.y = -xOffset;
    }
  }

  window.addEventListener('orientationchange', resetTotalCoords);

  function resetTotalCoords() {
    totalX = 0;
    totalY = 0;	
  }

})();