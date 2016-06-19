{
var compFuerInhaltTausch = null;
var daten = new Object();

// Object 
// Name der Eigenschaft wird genutzt um die entsprechende Komposition zu finden und zu übergeben
// Die Eigenschaft enthält ein Array [0] = txt / img; [1] = Layername; [2] = Inhalt (Text oder Name des Footageitems)
daten = {Item1: ["Komp1", "txt","Textlayer 1", "Das ist der Inhalt für Zeile 1"], Item2: ["Komp1","txt","Textlayer 2", "Das ist der Inhalt für Zeile 2"]}

// Funktion getCompByName
// Funktion um eine Composition mit einem bestimmten Namen zu finden und als Objekt zurückzugeben
// Name der Composition als String in die Funktion übergeben
function getCompByName(txtCompName){
var compbyName;
for (var i = 1; i <= app.project.numItems; i ++) {
    if ((app.project.item(i) instanceof CompItem) && (app.project.item(i).name === txtCompName)) {
        if (compbyName) {
            throw new Error();  //or something else
        }
        return myComp = app.project.item(i);
    }
  }
}

// Funktion getCompByName
// Funktion um ein FootageItem mit einem bestimmten Namen zu finden und als Objekt zurückzugeben
// Name des Items als String in die Funktion übergeben
function getItemByName(txtItemName){
{
  for (var i = 1; i <= app.project.numItems; i++){
    if ((app.project.item(i) instanceof FootageItem) && app.project.item(i).name == txtItemName){
        // alert(app.project.item(i))
      return app.project.item(i)
    }
  }
}
}

// Funktion txtErsetzen
function txtErsetzen(kompName, layerName, txtString){
    
    var myComp = getCompByName (kompName.toString());    
    var layer = myComp.layer(layerName); 
    var textProp = layer.property("Source Text");
    var textDocument = textProp.value;
    
    textDocument.text = txtString;
    textProp.setValue(textDocument);
}

// Funktion alle Eigenschaften eines Objekts durchgehen
function objProperties(myObject){

  for( property in myObject ) { 
    
    if (getCompByName (myObject[property][0]) instanceof CompItem){
            
            txtErsetzen(myObject[property][0], myObject[property][2], myObject[property][3]);
            
            }else{
            
            throw new Error();  //or something else
        }
  }
}

objProperties (daten)
}




    