var data = JSON.parse('{\"service\": [\"Manicure\",\"Pedicure\",\"Wax\",\"Polish\"],\"technician\": [\"Amy\",\"Jamie\",\"Lamie\",\"Ellen\"]}');

$(document).ready(function() {
    for (i in data.service){
        $("#service").append("<option value=\"" + data.service[i]+ "\" />");
    }
    for (i in data.tech){
        $("#tech").append("<option value=\"" + data.tech[i]+ "\" />");
    }
    
    $("#WalkForm").hide();
    
    $("#apptRadioButt").click(function(){
        $("#WalkForm").fadeOut('fast', function () {
            $("#ApptForm").fadeIn(); 
        });

        $("#apptRadioButt").addClass("active");
        $("#walkinRadioButt").removeClass("active");
    });

    $("#walkinRadioButt").on("click", function(){
        $("#ApptForm").fadeOut('fast', function () {
            $("#WalkForm").fadeIn(); 
        });
        $("#walkinRadioButt").addClass("active");
        $("#apptRadioButt").removeClass("active");
    });
    
    console.log("loaded checkin.js");
})

function submitBtn() {
    location.reload(true);
}
