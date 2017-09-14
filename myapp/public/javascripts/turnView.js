/* global $ */

$.get(url, function (data, status) {
    
})

function createRow(rowID, techname, techstatus, jobcount) {
    return '<tr id=\"' + rowID + '\"><th>' + techname + '</th><td id=\"' + rowID + 'status\">' + techstatus + '</td><td id=\"' + rowID + 'count\">' + jobcount + '</td></tr>';
}

for (var itr = 0; itr < row.length; itr++) {
    $(identifier).append(createRow());
}