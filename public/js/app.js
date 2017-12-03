var numLogi = 0;
var numSymptoms = 0;
var numOutbreaks = 0;
var sliderLogi = 0;
var sliderSymptoms = 0;
var sliderOutbreaks = 0;
var participantID = "";
var startTime = new Date();
const dataID = $("#root").attr("data-id");
const slider = $("#root").attr("data-slider");
const text = $("#root").attr("data-text");

$(document).ready(function() {
  $("#content-symptom").hide();
  $("#content-outbreak").hide();
  $("#content-logi").show();
  var address = window.location.href;
  var split = address.split("?");
  if (split.length === 2) {
    participantID = split[1];
  }
});

var clickLogi = function() {
  numLogi++;
  $("#content-symptom").hide();
  $("#content-outbreak").hide();
  $("#content-logi").show();
};

var clickSymptoms = function() {
  numSymptoms++;
  $("#content-outbreak").hide();
  $("#content-logi").hide();
  $("#content-symptom").show();
};

var clickOutbreaks = function() {
  numOutbreaks++;
  $("#content-symptom").hide();
  $("#content-logi").hide();
  $("#content-outbreak").show();
};

var clickLogiSlider = function() {
  sliderLogi++;
};

var clickSymptomsSlider = function() {
  sliderSymptoms++;
};

var clickOutbreaksSlider = function() {
  sliderOutbreaks++;
};

var onLogout = function() {
  if (confirm("Are you sure?") === true) {
    data = {
      slider: slider,
      text: text,
      linkID: dataID,
      participantID: participantID,
      logi: numLogi,
      logiSlider: sliderLogi,
      symptoms: numSymptoms,
      symptomsSlider: sliderSymptoms,
      outbreaks: numOutbreaks,
      outbreaksSlider: sliderOutbreaks,
      startTime: startTime
    };

    const params = JSON.stringify(data);

    $.post("../api/result", { params: params }, function(res) {
      if (res.confirmation === "success") {
        console.log("Success: ", res);
        window.close();
      } else {
        console.log("Error: ", res.message);
        return;
      }
    });
  } else {
    return;
  }
};
