var currentValue = +$('.velocity-input').attr('value');
var stepNum = +$('.velocity-input').attr('step');
var minValue = +$('.velocity-input').attr('min');
var maxValue = +$('.velocity-input').attr('max');

function updateSliderValue(value) {
  var bool = checker(value);
  if (bool) {
    $('.velocity-slider').slider('value', value);
    updateSun(value);
  }
}

function checker(value) {
  if ($.isNumeric(value) && value >= minValue && value <= maxValue) {
    return true;
  } else {
    return false;
  }
}

function updateSunVelocity(e, ui) {
  $('.velocity-input').val(ui.value);
  updateSun(ui.value);
}

function updateSun(value){
  var translatingX = transformPos(value);
  var size = scale(value);
  var position = 'translateX(' + translatingX + 'px)';
  var scaled = 'scale('+size+')';
  $('.sun').css({'transform': position + " " + scaled});
  var transformationValue = transformColor(value);
  var color = transformationValue > 0 ? 'rgba(255, 0, 0, '+ transformationValue +')' : 'rgba(0, 0, 255, '+ Math.abs(transformationValue); +')';
  $('.sun-color').css({'background': color});
}

function transformPos(curValue) {
  var transformedValue = curValue < 0 ? -(Math.pow(Math.abs(curValue), 1.5)/5) : Math.pow(curValue, 1.5)/5;
  return transformedValue;
}

function scale(curValue) {
  var value = Math.abs(curValue) < 10 ? 10 : Math.abs(curValue);
  value = value/5;
  var scaling = 10/value;
  var scale = scaling > 1 ? 1 + scaling/10 : scaling;
  return scale;
}

function transformColor(curValue) {
  var transformedValue = curValue/150;
  return transformedValue;
}

$(function() {
  $('.velocity-slider').slider({
    orientation: "horizontal",
    value: currentValue,
    step: stepNum,
    min: minValue,
    max: maxValue,
    slide: updateSunVelocity
  });

  $('.velocity-input').on('change', function() {
    var value = $(this).val();
    updateSliderValue(value);
  });
});
