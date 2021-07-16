
    var arrHead = new Array();  // array for header.
    arrHead = ['Urls','',''];
    var urlList='';
    // first create TABLE structure with the headers. 
    function createTable() {
        var urlTable = document.createElement('table');
        urlTable.setAttribute('id', 'urlTable'); // table id.
        urlTable.setAttribute('class','table');
        var tr = urlTable.insertRow(-1);
        for (var h = 0; h < arrHead.length; h++) {
            var th = document.createElement('th'); // create table headers
            th.setAttribute('class',"table-dark");
            th.innerHTML = arrHead[h];
            tr.appendChild(th);
        }

        var div = document.getElementById('cont');
        div.appendChild(urlTable);  // add the TABLE to the container.

        chrome.storage.sync.get('stopUrls', function (obj) {
            if(obj.stopUrls.length >0){
                obj.stopUrls.forEach(function(url){
                    addRow(url);
                })
            }else{
                addRow('');
            }
        });
    }

    // now, add a new to the TABLE.
    function addRow(data) {
        var empTab = document.getElementById('urlTable');

        var rowCnt = empTab.rows.length;   // table row count.
        var tr = empTab.insertRow(rowCnt); // the table row.

        for (var c = 0; c < arrHead.length; c++) {
            var td = document.createElement('td'); // table definition.
            td.setAttribute("class","text-center");
            td = tr.insertCell(c);

            if (c ==1) {      // the first column.
                // add a button in every new row in the first column.
                var span = document.createElement('span');
                span.setAttribute("class","glyphicon glyphicon-trash");
                span.setAttribute('id', 'remove');
                span.setAttribute("style","padding-top: 6px;");
                td.appendChild(span);
            }
            else if (c ==2) {      // the first column.
                // add a button in every new row in the first column.
                var span = document.createElement('span');
                span.setAttribute('id', 'add');
                span.setAttribute("class","glyphicon glyphicon-plus");
                span.setAttribute("style","padding-top: 6px;");
                td.appendChild(span);
            }
            else {
                // 2nd, 3rd and 4th column, will have textbox.
                var ele = document.createElement('input');
                ele.setAttribute('type', 'text');
                if(data==''){
                    ele.setAttribute("placeholder","site url")
                }else{
                    ele.setAttribute('value', data);
                }
                td.appendChild(ele);
            }
        }
    }

    // delete TABLE row function.
    function removeRow(oButton) {
        var empTab = document.getElementById('urlTable');
        empTab.deleteRow(oButton.path[2].rowIndex); // button -> td -> tr.
        if(empTab.rows.length==1)
            addRow('');
    }

    // function to extract and submit table data.
    function submit() {
        var myTab = document.getElementById('urlTable');
        var arrValues = new Array();

        // loop through each row of the table.
        for (row = 1; row < myTab.rows.length; row++) {
            // loop through each cell in a row.
            for (c = 0; c < myTab.rows[row].cells.length; c++) {  
                var element = myTab.rows.item(row).cells[c];
                if (element.childNodes[0].getAttribute('type') == 'text') {
                    if(element.childNodes[0].value!=''){
                        arrValues.push(element.childNodes[0].value);
                    }
                }
            }
        }
        
        // The final output.
        document.getElementById('output').innerHTML = arrValues;

        chrome.storage.sync.set({
        stopUrls: arrValues
      }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('output');
        status.textContent = 'Saved.';
        setTimeout(function() {
          status.textContent = '';
        }, 750);
      });
        //console.log (arrValues);   // you can see the array values in your browsers console window. Thanks :-) 
    }

document.addEventListener('DOMContentLoaded', createTable);
document.addEventListener("click", function(e) {
    switch(e.path[0].id) {
      case "add":
        addRow('');
        break;
      case "save":
        submit();
        break;
      case "remove":
        removeRow(e);
        break;  
      default:
        console.log(e);
    }
});


















