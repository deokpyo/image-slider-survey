var onSurveyStart = function() {
  const participantID = $("#participantID").val();
  const id = $("#root").attr("data-id");

  if (participantID.length === 0) {
    alert("Please enter your ID");
    return;
  }

  window.location.href = "/survey/" + id + "?" + participantID;
};
