var clickLogi = function() {
  console.log("clickLogi");
  document.getElementById("content-logi").style.display = "block";
  document.getElementById("content-symptom").style.display = "none";
  document.getElementById("content-outbreak").style.display = "none";
};

var clickSymptoms = function() {
  console.log("clickSymptoms");
  document.getElementById("content-logi").style.display = "none";
  document.getElementById("content-symptom").style.display = "block";
  document.getElementById("content-outbreak").style.display = "none";
};

var clickOutbreaks = function() {
  console.log("clickOutbreaks");
  document.getElementById("content-logi").style.display = "none";
  document.getElementById("content-symptom").style.display = "none";
  document.getElementById("content-outbreak").style.display = "block";
};
