
/*
* Decompiled with Jsxer
* Version: 1.7.2
* JSXBIN 2.0
*/

var settingsFile = "/c/Script/guidescropscriptsettings.db";
var win = new Object();
win.widthField = new Object();
win.heightField = new Object();
win.ppiField = new Object();
win.linesTop = new Object();
win.linesBottom = new Object();
win.linesLeft = new Object();
win.linesRight = new Object();
win.ddl = new Object();
win.widthField.text = "1200px";
win.heightField.text = "1600px";
win.ppiField.text = "300";
/*салита
win.linesTop.text = "83px";
win.linesBottom.text = "83px";
win.linesLeft.text = "83px";
win.linesRight.text = "83px";
*/

/* кенгуру*/
win.linesTop.text = "100px";
win.linesBottom.text = "300px";
win.linesLeft.text = "150px";
win.linesRight.text = "150px";


win.ddl.selection = "xxx";
var doc = app.activeDocument;
try {
var sel = doc.selection.bounds;
var selEx = true;
} catch (err) {var selEx = false;
}
var startForegroundColor = app.foregroundColor;
var startBackgroundColor = app.backgroundColor;
var startRulerUnits = app.preferences.rulerUnits;
var startTypeUnits = app.preferences.typeUnits;
var startDisplayDialogs = app.displayDialogs;
var startForegroundColor = app.foregroundColor;
var startBackgroundColor = app.backgroundColor;
app.preferences.rulerUnits = Units.PIXELS;
app.preferences.typeUnits = TypeUnits.PIXELS;
app.displayDialogs = DialogModes.NO;
/* кенгуру*/
app.foregroundColor.rgb.hexValue = "EBEBEB";
app.backgroundColor.rgb.hexValue = "EBEBEB";


/* белый
app.foregroundColor.rgb.hexValue = "FFFFFF";
app.backgroundColor.rgb.hexValue = "FFFFFF";
*/
if (selEx == false) { 
doc.trim(TrimType.TOPLEFT);
doc.selection.selectAll();
selEx = true;
}
if (selEx == true) { 
var idsetd = charIDToTypeID("setd");
var desc3 = new ActionDescriptor();
var idnull = charIDToTypeID("null");
var ref1 = new ActionReference();
var idPrpr = charIDToTypeID("Prpr");
var idFlIn = charIDToTypeID("FlIn");
ref1.putProperty(idPrpr, idFlIn);
var idDcmn = charIDToTypeID("Dcmn");
var idOrdn = charIDToTypeID("Ordn");
var idTrgt = charIDToTypeID("Trgt");
ref1.putEnumerated(idDcmn, idOrdn, idTrgt);
desc3.putReference(idnull, ref1);
var idT = charIDToTypeID("T   ");
var desc4 = new ActionDescriptor();
var idByln = charIDToTypeID("Byln");
desc4.putString(idByln, doc.path.parent.name);
var idFlIn = charIDToTypeID("FlIn");
desc3.putObject(idT, idFlIn, desc4);
executeAction(idsetd, desc3, DialogModes.NO);
var idsetd = charIDToTypeID("setd");
var desc7 = new ActionDescriptor();
var idnull = charIDToTypeID("null");
var ref3 = new ActionReference();
var idPrpr = charIDToTypeID("Prpr");
var idFlIn = charIDToTypeID("FlIn");
ref3.putProperty(idPrpr, idFlIn);
var idDcmn = charIDToTypeID("Dcmn");
var idOrdn = charIDToTypeID("Ordn");
var idTrgt = charIDToTypeID("Trgt");
ref3.putEnumerated(idDcmn, idOrdn, idTrgt);
desc7.putReference(idnull, ref3);
var idT = charIDToTypeID("T   ");
var desc8 = new ActionDescriptor();
var idCrci = charIDToTypeID("Crci");
desc8.putString(idCrci, "postanovkaManeken");
var idFlIn = charIDToTypeID("FlIn");
desc7.putObject(idT, idFlIn, desc8);
executeAction(idsetd, desc7, DialogModes.NO);
doc.flatten();
var sel = doc.selection.bounds;
var inSelA = sel[0];
var inSelB = sel[1];
var inSelC = sel[2];
var inSelD = sel[3];
if (((inSelD - inSelB) * (((new UnitValue(win.widthField.text) - new UnitValue(win.linesLeft.text)) - new UnitValue(win.linesRight.text)) / ((new UnitValue(win.heightField.text) - new UnitValue(win.linesTop.text)) - new UnitValue(win.linesBottom.text)))) <= (inSelC - inSelA)) { 
if (win.ddl.selection == "\u043d\u0438\u0437\u0443") { 
var k = (inSelC - inSelA) / ((new UnitValue(win.widthField.text) - new UnitValue(win.linesLeft.text)) - new UnitValue(win.linesRight.text));
var outSelA = inSelA - (new UnitValue(win.linesLeft.text) * k);
var outSelB = inSelD - ((new UnitValue(win.heightField.text) - new UnitValue(win.linesBottom.text)) * k);

Lilcryy developer #gavno, [28.03.2025 20:49]
var outSelC = inSelC + (new UnitValue(win.linesRight.text) * k);
var outSelD = inSelD + (new UnitValue(win.linesBottom.text) * k);
}
else if (win.ddl.selection == "\u0432\u0435\u0440\u0445\u0443") {
var k = (inSelC - inSelA) / ((new UnitValue(win.widthField.text) - new UnitValue(win.linesLeft.text)) - new UnitValue(win.linesRight.text));
var outSelA = inSelA - (new UnitValue(win.linesLeft.text) * k);
var outSelB = inSelB - (new UnitValue(win.linesTop.text) * k);
var outSelC = inSelC + (new UnitValue(win.linesRight.text) * k);
var outSelD = inSelB + ((new UnitValue(win.heightField.text) - new UnitValue(win.linesTop.text)) * k);
}
else {
var k = (inSelC - inSelA) / ((new UnitValue(win.widthField.text) - new UnitValue(win.linesLeft.text)) - new UnitValue(win.linesRight.text));
var center = (inSelB + inSelD) / 2;
var outSelA = inSelA - (new UnitValue(win.linesLeft.text) * k);
var outSelB = center - ((new UnitValue(win.heightField.text) / 2) * k);
var outSelC = inSelC + (new UnitValue(win.linesRight.text) * k);
var outSelD = center + ((new UnitValue(win.heightField.text) / 2) * k);
}
}
else {
var k = (inSelD - inSelB) / ((new UnitValue(win.heightField.text) - new UnitValue(win.linesTop.text)) - new UnitValue(win.linesBottom.text));
var center = (inSelA + inSelC) / 2;
var outSelA = center - ((new UnitValue(win.widthField.text) / 2) * k);
var outSelB = inSelB - (new UnitValue(win.linesTop.text) * k);
var outSelC = center + ((new UnitValue(win.widthField.text) / 2) * k);
var outSelD = inSelD + (new UnitValue(win.linesBottom.text) * k);
}
doc.selection.deselect();
doc.crop([outSelA, outSelB, outSelC, outSelD]);
doc.resizeImage(new UnitValue(win.widthField.text), new UnitValue(win.heightField.text), win.ppiField.text);
doc.guides.removeAll();
doc.guides.add(Direction.HORIZONTAL, new UnitValue(win.linesTop.text));
doc.guides.add(Direction.HORIZONTAL, new UnitValue(win.heightField.text) - new UnitValue(win.linesBottom.text));
doc.guides.add(Direction.VERTICAL, new UnitValue(win.linesLeft.text));
doc.guides.add(Direction.VERTICAL, new UnitValue(win.widthField.text) - new UnitValue(win.linesRight.text));
}
app.preferences.rulerUnits = startRulerUnits;
app.preferences.typeUnits = startTypeUnits;
app.displayDialogs = startDisplayDialogs;
app.foregroundColor = startForegroundColor;
app.backgroundColor = startBackgroundColor;
