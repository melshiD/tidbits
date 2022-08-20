function doGet(e) {
    const body = e.parameter;
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const ws = ss.getSheetByName("test");
    ws.appendRow([body.name, body.location, body.amount, body.passwordHash, Utilities.formatDate(new Date(), "GMT+1", 'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'')]);
  }
  
  function doPost(e){
    const body = e.postData.contents;
    const bodyJSON = JSON.parse(body);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const ws = ss.getSheetByName("test");
    ws.appendRow([bodyJSON.name, bodyJSON.location, bodyJSON.amount, bodyJSON.password, bodyJSON.timestamp]);
  }