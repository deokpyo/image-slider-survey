$(document).ready(function() {
  $("select").material_select();
  $(".modal").modal();
});

var pages = null;
var results = null;
var currentPage = null;
var csvData = [];
var pagesHash = {};
var short = {
  logi:
    "Logi is commonly found in soil, rivers and reservoirs, but the source of the bacteria in the current outbreak has not yet been determined.<br/><br/>People over age 65 and newborn babies, who have at least one serious underlying health condition, or who have weakened immune systems are at risk.<br/><br/>Its transmission route remains unknown.",
  symptom:
    "The signs and symptoms of illness include fever, skin rash, joint pain, conjunctivitis, shortness of breath, chills or cellulitis.<br/><br/>About a third of the people infected with Logi in the current outbreak have died.<br/><br/>The strain responsible for most of the cases in the current outbreak can be treated with several antibiotics.",
  outbreak:
    "Logi has been detected in soil, river water and reservoirs.<br/><br/>About 5-10 cases per state per year are reported in the United States.<br/><br/>The bacteria Logi anophelis has infected 59 people in Wisconsin and one person in Michigan."
};

var long = {
  logi:
    "Logi is commonly found in soil, rivers and reservoirs, but the source of the bacteria in the current outbreak has not yet been determined. CDC is assisting with testing samples from patients and a variety of potential sources, including healthcare products, water sources and the environment. To date, none of these have been found to be a source of the bacteria.<br/><br/>People over age 65 and newborn babies, who have at least one serious underlying health condition, or who have weakened immune systems are at risk. Even though 18 patients who tested positive for the Logi infection in this outbreak have died, the patients’ other serious health conditions could lead to death.<br/><br/>Its transmission route remains unknown. Product and environmental samples from facilities that have treated patients with Logi anophelis infections have tested negative for Logi anophelis, and no evidence suggests that Logi has been spread by a single healthcare facility. Patients who have been treated in the same units where the Logi anophelis infection has been discovered have tested negative for Logi based on nose and throat swabs, indicating no person-to-person spreading of the bacteria.",
  symptom:
    "The signs and symptoms of illness include fever, skin rash, joint pain, conjunctivitis, shortness of breath, chills or cellulitis. Most of the people in the outbreak have had bloodstream infections with Logi. But in a few cases, the bacteria was found in the respiratory tract or the joints.<br/><br/>About a third of the people infected with Logi in the current outbreak have died. However, it has not yet been determined whether the bacteria was the actual cause of death in these cases.<br/><br/>Logi are Gram-negative bacteria that tend to be naturally resistant to many of the antibiotics that physicians may typically use to treat infections. However, the strain responsible for most of the cases in the current outbreak can be treated with several other antibiotics. So early recognition of the bacteria is critical to ensure patients receive appropriate diagnosis and treatment. The infection typically presents as septicemia and can be fatal if treatment with appropriate antibiotics is delayed.",
  outbreak:
    "Logi has been detected in soil, river water and reservoirs. This bacteria can be found throughout the world. While its range won’t be expanding, its potential rise is linked to the evolution of antibiotic resistance.<br/><br/>About 5-10 cases per state per year are reported in the United States. A few small, localized outbreaks are reported in both the U.S. and other countries, usually in healthcare settings.<br/><br/>An outbreak of a rare bacterial illness that first appeared in Wisconsin has now popped up in two nearby states. A patient there died of an infection with the bacteria Logi anophelis — the same bacteria that has infected 59 people in Wisconsin and one person in Michigan. So far, the bacteria has been linked with 20 deaths."
};

var createSelection = function() {
  var selection = $("#page-option").val();
  if (selection === null) {
    alert("Please select an option");
    return;
  }

  switch (selection) {
    // no slider, short text
    case "1":
      createPage(false, "short", "1. No Slider, Short Text");
      break;
    // no slider, long text
    case "2":
      createPage(false, "long", "2. No Slider, Long Text");
      break;
    // slider, short text
    case "3":
      createPage(true, "short", "3. Slider, Short Text");
      break;
    // slider, long text
    case "4":
      createPage(true, "long", "4. Slider, Long Text");
      break;
  }
};

var createPage = function(slider, text, option) {
  if (text === "short") {
    var data = {
      slider: slider,
      text: text,
      option: option,
      content: short
    };
  } else {
    var data = {
      slider: slider,
      text: text,
      option: option,
      content: long
    };
  }

  const params = JSON.stringify(data);

  $.post("api/page", { params: params }, function(res) {
    if (res.confirmation === "success") {
      var newPage = res.result;
      pages.push(newPage);
      renderPages();
    } else {
      console.log("Error: ", res.message);
      return;
    }
  });
};

var getPages = function() {
  $.get("api/page", function(res) {
    if (res.confirmation === "success") {
      pages = res.result;
      renderPages();
    } else {
      console.log("Error: " + res.message);
      return;
    }
  });
};

var getResults = function() {
  $.get("api/result", function(res) {
    if (res.confirmation === "success") {
      results = res.result;
      renderResults();
    } else {
      console.log("Error: " + res.message);
      return;
    }
  });
};

var renderPages = function() {
  if (pages === null) {
    return;
  }
  var listItems = "";
  pages.forEach(function(page, i) {
    pagesHash[page.id] = page;
    let time = moment(page.timestamp).format("YYYY-MM-DD h:mm:ss a");
    var slider = "";
    if (page.slider) {
      slider = "yes";
    } else {
      slider = "no";
    }
    listItems += "<tr><td>" + slider + "</td>";
    listItems += "<td>" + page.text + "</td>";
    listItems += "<td>" + time + "</td>";
    listItems +=
      '<td><a href="/participant/' +
      page.id +
      '" target="_blank">' +
      page.id +
      "</a></td>";
    listItems +=
      '<td><a href="/survey/' +
      page.id +
      '?admintest" class="btn-floating cyan" target="_blank"><i class="material-icons">open_in_new</i></a></td>';
    listItems +=
      '<td><a id="' +
      page.id +
      '" class="btn-floating modal-trigger orange" data-target="modal1" onclick="editPage(id)"><i class="material-icons">edit</i></a></td>';
    listItems +=
      '<td><a id="' +
      page.id +
      '" class="btn-floating red" onclick="deletePage(id)"><i class="material-icons">delete</i></a></td></tr>';
  });
  $("#table-page-list").html(listItems);
};

var renderResults = function() {
  if (results === null) {
    return;
  }
  var listItems = "";
  results.forEach(function(result, i) {
    let timeStart = moment(result.startTime).format("HH:mm:ss");
    let timeEnd = moment(result.timestamp).format("HH:mm:ss");
    let date = moment(result.timestamp).format("YYYY-MM-DD");

    var slider = "";
    if (result.slider === "true") {
      slider = "yes";
    } else {
      slider = "no";
    }

    listItems += "<tr><td>" + slider + "</td>";
    listItems += "<td>" + result.text + "</td>";
    listItems += "<td>" + result.participantID + "</td>";
    listItems += "<td>" + result.logi + "</td>";
    listItems += "<td>" + result.logiSlider + "</td>";
    listItems += "<td>" + result.symptoms + "</td>";
    listItems += "<td>" + result.symptomsSlider + "</td>";
    listItems += "<td>" + result.outbreaks + "</td>";
    listItems += "<td>" + result.outbreaksSlider + "</td>";
    listItems += "<td>" + date + "</td>";
    listItems += "<td>" + timeStart + "</td>";
    listItems += "<td>" + timeEnd + "</td>";
    listItems +=
      '<td><a id="' +
      result.id +
      '" class="btn-floating red" onclick="deleteResult(id)"><i class="material-icons">delete</i></a></td></tr>';

    var dataSet = [];
    dataSet.push(slider);
    dataSet.push(result.text);
    dataSet.push(result.linkID);
    dataSet.push(result.participantID);
    dataSet.push(result.logi);
    dataSet.push(result.logiSlider);
    dataSet.push(result.symptoms);
    dataSet.push(result.symptomsSlider);
    dataSet.push(result.outbreaks);
    dataSet.push(result.outbreaksSlider);
    dataSet.push(timeStart);
    dataSet.push(timeEnd);
    csvData.push(dataSet);
  });

  $("#table-result-list").html(listItems);
};

var deletePage = function(id) {
  if (confirm("Are you sure?") === true) {
    $.ajax({
      url: "api/page",
      type: "DELETE",
      data: { id: id },
      success: function(res) {
        if (res.confirmation === "success") {
          getPages();
        } else {
          console.log("Error: ", res.message);
          return;
        }
      }
    });
  } else {
    return;
  }
};

var deleteResult = function(id) {
  if (confirm("Are you sure?") === true) {
    $.ajax({
      url: "api/result",
      type: "DELETE",
      data: { id: id },
      success: function(res) {
        if (res.confirmation === "success") {
          getResults();
        } else {
          console.log("Error: ", res.message);
          return;
        }
      }
    });
  } else {
    return;
  }
}

var editPage = function(id) {
  currentPage = id;
  modalItems = "";
  modalItems += '<div class="row">';
  modalItems += '<div class="input-field col s12">';
  modalItems +=
    '<textarea id="text-logi" class="materialize-textarea">' +
    pagesHash[id].content.logi +
    "</textarea>";
  modalItems +=
    '<label class="active" for="text-logi">About Logi</label></div>';
  modalItems += '<div class="input-field col s12">';
  modalItems +=
    '<textarea id="text-symptom" class="materialize-textarea">' +
    pagesHash[id].content.symptom +
    "</textarea>";
  modalItems +=
    '<label class="active" for="text-symptom">Symptoms, Consequences, & Treatment</label></div>';
  modalItems += '<div class="input-field col s12">';
  modalItems +=
    '<textarea id="text-outbreak" class="materialize-textarea">' +
    pagesHash[id].content.outbreak +
    "</textarea>";
  modalItems +=
    '<label class="active" for="text-outbreak">Recent Outbreaks</label>';
  modalItems += "</div></div>";

  $("#page-content-form").html(modalItems);
  $("#text-logi").trigger("autoresize");
  $("#text-symptom").trigger("autoresize");
  $("#text-outbreak").trigger("autoresize");
};

var updatePage = function() {
  var textLogi = $("#text-logi").val();
  var textSymptom = $("#text-symptom").val();
  var textOutbreak = $("#text-outbreak").val();

  const params = {
    id: currentPage,
    data: {
      content: {
        logi: textLogi,
        symptom: textSymptom,
        outbreak: textOutbreak
      }
    }
  };

  var paramsJSON = JSON.stringify(params);

  $.ajax({
    url: "../api/page",
    type: "PUT",
    data: {
      params: paramsJSON
    },
    success: function(res) {
      if (res.confirmation === "success") {
        alert("page content has been updated");
        getPages();
        $("#modal1").modal("close");
      } else {
        console.log("Error: ", res.message);
        return;
      }
    }
  });
};

var download_csv = function() {
  if (csvData.length === 0) {
    return;
  }

  var csv = "";
  csv +=
    "Slider,Text,LinkID,ParticipantID,LogiBtn,LogiSlider,SymptomsBtn,SymptomsSlider,OutbreaksBtn,OutbreaksSlider,StartTime,EndTime\n";
  csvData.forEach(function(row) {
    csv += row.join(",");
    csv += "\n";
  });

  var hiddenElement = document.createElement("a");
  hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
  hiddenElement.target = "_blank";
  hiddenElement.download = "results.csv";
  hiddenElement.click();
};

getPages();
getResults();
