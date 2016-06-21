
#include "json2.js"

(function importOlympiaErgebnisse()
{
    
var scriptName = "Import Ergebnisse";
var daten = new Object();
var txtExtension = ".txt";	
var txtExtensionFilter;
var fileToImport;
var ErrorString;
var FehlerNr;
var erfolg;

	// filter function (for Mac) to show only TXT files in the file dialog box
	function isTXTFile(fileObj)
	{
		var istxt = false;
		
		if (fileObj) {
			if ((fileObj instanceof File) && fileObj.exists) {
				istxt = fileObj.name.indexOf(txtExtension, fileObj.name.length - txtExtension.length) !== -1;
			} else if ((fileObj instanceof Folder) && fileObj.exists) {
				istxt = true;	// allow folders to be selectable so that you can navigate into them
			}
		}
		
		return istxt;
	}
	
// Textdatei öffnen
//
function openTextFile(){
        
        txtExtensionFilter = ($.os.indexOf("Windows") !== -1) ? "*"+txtExtension : isTXTFile;
        fileToImport = File.openDialog("Select a Textfile", txtExtensionFilter, true);

        if (!fileToImport || fileToImport.exists) {
            ErrorString
            return;
        }
        var txtFile = new File(fileToImport);
        txtFile.open("r");
        txtFile.encoding = "utf-8";
        var jsonString = txtFile.read();
        //alert(jsonString);
        
        daten = JSON.parse(jsonString);

}


// Funktion getCompByName
// Funktion um eine Composition mit einem bestimmten Namen zu finden und als Objekt zurückzugeben
// Name der Composition als String in die Funktion übergeben
function getCompByName(txtCompName){
    //alert(txtCompName);
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
      return app.project.item(i)
    }
  }
}
}

// Funktion txtErsetzen
function txtErsetzen(kompName, layerName, txtString){
    
    var layer = kompName.layer(layerName); 
        if ((layer instanceof TextLayer) && layer.name == layerName){
            var textProp = layer.property("Source Text");
            var textDocument = textProp.value;
            textDocument.text = txtString;
            textProp.setValue(textDocument);
        }else{
        meldungHinzufuegen("Warnung: ", "Ebene " + layerName + " konnte im Projekt nicht gefunden werden!");
        erfolg = false;
        }

}

// Funktion imageErsetzen
function imageErsetzen(kompName, layerName, txtString){

    var layer = myComp.layer(layerName);
    if(layer!=null){
    var source = getItemByName(txtString);
        if(!source){
        source = getItemByName("Leer.png"); 
        meldungHinzufuegen("Warnung: ", "Material " + txtString + " konnte im Projekt nicht gefunden werden!");
        erfolg = false;
        }else{
            layer.replaceSource(source, true);
            return;
            }
        }else{
    meldungHinzufuegen("Warnung: ", "Ebene " +  layerName + " konnte im Projekt nicht gefunden werden!");
    erfolg = false;}
}

// Funktion alle Eigenschaften eines Objekts durchgehen
function objProperties(myObject){
//alert(myObject);  
  for( property in myObject ) { 
    if (getCompByName (myObject[property][0]) instanceof CompItem){
            
            // Komposition wird geholt
            var myComp = getCompByName (myObject[property][0]);

                if(myObject[property][1] == "txt"){

                    txtErsetzen(myComp, myObject[property][2], myObject[property][3]);
                };
            
                if(myObject[property][1] == "img"){
                   imageErsetzen(myComp, myObject[property][2], myObject[property][3]);
                } ;
            
            }else{
            meldungHinzufuegen("Warnung: ", "Komposition: " + myObject[property][0] + " existiert im Projekt nicht!");
            erfolg = false;
        }
  }
}

// Funktion ErrorString
function meldungHinzufuegen(errorTyp,errorText){
        FehlerNr = FehlerNr + 1    
        ErrorString = ErrorString + FehlerNr + ": " + errorTyp + errorText + "\n";
    };

// Funktion Gesamtablauf
function programmAblauf(){
    erfolg = true;   
    ErrorString = "Start Datenübername: \n" 
    FehlerNr = 0;
    openTextFile ();
    objProperties (daten);
    if(erfolg== true){meldungHinzufuegen ("Super! ","Die Datenübernahme war Erfolgreich!")}else{meldungHinzufuegen ("Warnung: ","Bei der Datenübernahme sind Fehler aufgetreten!")};
    alert(ErrorString);
    }

programmAblauf ();
}
)();




    