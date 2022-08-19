function copyNodeStyle(sourceNode, targetNode) {
    const computedStyle = window.getComputedStyle(sourceNode);
    Array.from(computedStyle).forEach(key => targetNode.style.setProperty(key, computedStyle.getPropertyValue(key), computedStyle.getPropertyPriority(key)))
  }

  function doGet(e) {
    const body = e.parameter;
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const ws = ss.getSheetByName("test");
    ws.appendRow([body.name, body.location, body.amount, body.password]);
    // ws.appendRow([bodyJSON.name, bodyJSON.location, bodyJSON.amount, bodyJSON.password]);
    // ws.appendRow([bodyJSON.name, bodyJSON.location, bodyJSON.amount, bodyJSON.password, bodyJSON.timestamp]);
  
  
  
    // return ContentService
    //   .createTextOutput(JSON.stringify(response))
    //   .setMimeType(ContentService.MimeType.JSON);
  }
  
  function doPost(e){
    const body = e.postData.contents;
    const bodyJSON = JSON.parse(body);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const ws = ss.getSheetByName("test");
    ws.appendRow([bodyJSON.name, bodyJSON.location, bodyJSON.amount, bodyJSON.password, bodyJSON.timestamp]);
  }