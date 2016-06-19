{

var daten = new Object();

// Object 
// Name der Eigenschaft wird genutzt um die entsprechende Komposition zu finden und zu übergeben
// Die Eigenschaft enthält ein Array [0] = Kompositionsname; [1]= txt / img; [1] = Layername; [2] = Inhalt (Text oder Name des Footageitems)
daten = {
    Sportart1:["tabelle01","txt","Sportart","Sportart 1"],
    Einheit1:["tabelle01","txt","Einheit","Meter"],
    
    Item1: ["tabelle01_zeile01", "txt", "Name", "Name 1"], 
    Item2: ["tabelle01_zeile01", "txt", "Platz", "1"],
    Item3: ["tabelle01_zeile01", "txt", "Punkte", "1000"],
    Item4: ["tabelle01_zeile01","img","Flagge", "Spanien.png"],
    
    Item5: ["tabelle01_zeile02", "txt", "Name", "Name 2"], 
    Item6: ["tabelle01_zeile02", "txt", "Platz", "2"],
    Item7: ["tabelle01_zeile02", "txt", "Punkte", "999"],
    Item8: ["tabelle01_zeile02","img","Flagge", "Ungarn.png"],
    
    Item9: ["tabelle01_zeile03", "txt", "Name", "Name 3"], 
    Item10: ["tabelle01_zeile03", "txt", "Platz", "3"],
    Item11: ["tabelle01_zeile03", "txt", "Punkte", "998"],
    Item12: ["tabelle01_zeile03","img","Flagge", "Deutschland.png"],
    
    Item13: ["tabelle01_zeile04", "txt", "Name", "Name 4"], 
    Item14: ["tabelle01_zeile04", "txt", "Platz", "4"],
    Item15: ["tabelle01_zeile04", "txt", "Punkte", "997"],
    Item16: ["tabelle01_zeile04","img","Flagge", "China.png"],
    
    Item17: ["tabelle01_zeile05", "txt", "Name", "Name 5"], 
    Item18: ["tabelle01_zeile05", "txt", "Platz", "5"],
    Item19: ["tabelle01_zeile05", "txt", "Punkte", "996"],
    Item20: ["tabelle01_zeile05","img","Flagge", "Südafrika.png"],
    
    Item21: ["tabelle01_zeile06", "txt", "Name", "Name 6"], 
    Item22: ["tabelle01_zeile06", "txt", "Platz", "6"],
    Item23: ["tabelle01_zeile06", "txt", "Punkte", "995"],
    Item24: ["tabelle01_zeile06","img","Flagge", "USA.png"],
    
    Item25: ["tabelle01_zeile07", "txt", "Name", "Name 7"], 
    Item26: ["tabelle01_zeile07", "txt", "Platz", "7"],
    Item27: ["tabelle01_zeile07", "txt", "Punkte", "996"],
    Item28: ["tabelle01_zeile07","img","Flagge", "Australien.png"],
    
    Item29: ["tabelle01_zeile08", "txt", "Name", "Name 8"], 
    Item30: ["tabelle01_zeile08", "txt", "Platz", "8"],
    Item31: ["tabelle01_zeile08", "txt", "Punkte", "99"],
    Item32: ["tabelle01_zeile08","img","Flagge", "Äthiopien.png"],
    
    };

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
    
    var layer = kompName.layer(layerName); 
    var textProp = layer.property("Source Text");
    var textDocument = textProp.value;
    
    textDocument.text = txtString;
    textProp.setValue(textDocument);
}

// Funktion imageErsetzen
function imageErsetzen(kompName, layerName, txtString){
try{
    var layer = myComp.layer(layerName);
    var source = getItemByName(txtString);
    layer.replaceSource(source, true);}
catch(e){
  };

}

// Funktion alle Eigenschaften eines Objekts durchgehen
function objProperties(myObject){
  for( property in myObject ) { 
    if (getCompByName (myObject[property][0]) instanceof CompItem){
            
            // Komposition wird geholt
            var myComp = getCompByName (myObject[property][0]);
            
                if(myObject[property][1] == "txt"){
                    txtErsetzen(myComp, myObject[property][2], myObject[property][3]);
                }
            
                if(myObject[property][1] == "img"){
                   imageErsetzen(myComp, myObject[property][2], myObject[property][3]);
                }         
            }else{
            
            throw new Error();  //or something else
        }
  }
}

objProperties (daten)
}




    