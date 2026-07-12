
let fingers;
let handColors = [
    '#FFAA00',
    '#FF00AA',
    '#AA00FF',
    '#00AAFF'
];
let boxColor = '#AAFF00';
let tinyFingers = true;
let sizex = 420;
let sizey = 420;
let imgcount = 0;
let recording = false;
paper.install(window);
window.onload = async function() {


    paper.setup('myCanvas');
    

    let canvas = document.getElementById('myCanvas');
    const recorder = new CanvasRecorder(canvas, 4500000);
    var downloadLink = document.createElement("a");
    document.body.appendChild(downloadLink);

    buildShapeGallery();

    shuffle();
    generate();

    //genGrid();
    //genStickers();
    
    if(recording){
        recorder.start();
    }
    //genAnimation();


    if(recording){
        view.onClick = function(){
            recorder.stop();
            recorder.save('finger_motion.webm');
        }
    }
}

function genAnimation(){
    fingers = new Finger([sizex, sizey], view.bounds.center.add([-900,-400]), handColors.concat([boxColor]), false, 'animation');
    let fingers1 = new Finger([sizex, sizey], view.bounds.center.add([-900,400]), handColors.concat([boxColor]), false, 'animation');
    let fingers2 = new Finger([sizex, sizey], view.bounds.center.add([0,-400]), handColors.concat([boxColor]), false, 'animation');
    let fingers3 = new Finger([sizex, sizey], view.bounds.center.add([0,400]), handColors.concat([boxColor]), false, 'animation');
    let fingers4 = new Finger([sizex, sizey], view.bounds.center.add([900,-400]), handColors.concat([boxColor]), false, 'animation');
    let fingers5 = new Finger([sizex, sizey], view.bounds.center.add([900,400]), handColors.concat([boxColor]), false, 'animation');

    //fingers = new Finger([sizex, sizey], view.bounds.center, handColors.concat([boxColor]), false, 'animation');
}

function genStickers(){
    fingers = new Finger([sizex, sizey], view.bounds.center, handColors.concat([boxColor]), false, 'sticker');
}

function genGrid(){
    let s = 350;
    let d = 150;

    fingers = new Finger([s*2+d, s*2+d], [300+s+d/2, 300+s+d/2], handColors.concat([boxColor]), false);

    let oldColors = [boxColor].concat(handColors);
    let colors = _.shuffle(oldColors);
    boxColor = colors.pop();
    handColors = colors;
    fingers = new Finger([s, s*3+d*2], [300+s*2.5+d*2, 300+s*1.5+d], handColors.concat([boxColor]), false);

    oldColors = [boxColor].concat(handColors);
    //colors = _.shuffle(oldColors);
    boxColor = colors.pop();
    handColors = colors;
    fingers = new Finger([s, s], [300+s*0.5, 300+s*2.5+d*2], handColors.concat([boxColor]), false);

    oldColors = [boxColor].concat(handColors);
    //colors = _.shuffle(oldColors);
    boxColor = colors.pop();
    handColors = colors;
    fingers = new Finger([s, s], [300+s*1.5+d, 300+s*2.5+d*2], handColors.concat([boxColor]), false);
}

function generate(text){
    project.activeLayer.removeChildren();
    let val = document.getElementById("textinput").value
    fingers = new Finger([sizex, sizey], view.bounds.center, handColors.concat([boxColor]), false, 'none', val);

    if(!tinyFingers){
        fingers.removeTinyFingers();
    }
    

}

function shuffle(){
    let oldColors = handColors.concat([boxColor]);
    let colors = _.shuffle(oldColors);

    boxC = colors.pop();
    handC = colors;
    
    if(fingers){

        changeColor('boxcolor', Color.random());
        changeColor('fillcolor1', Color.random());
        changeColor('fillcolor2', Color.random());
        changeColor('fillcolor3', Color.random());
        changeColor('fillcolor4', Color.random());

        changeColor('boxcolor', boxC);
        changeColor('fillcolor1', handC[0]);
        changeColor('fillcolor2', handC[1]);
        changeColor('fillcolor3', handC[2]);
        changeColor('fillcolor4', handC[3]);
    
    }

    handColors = handC;
    boxColor = boxC;
    document.getElementById('boxcolor').value = boxColor;
    document.getElementById('fillcolor1').value = handColors[0];
    document.getElementById('fillcolor2').value = handColors[1];
    document.getElementById('fillcolor3').value = handColors[2];
    document.getElementById('fillcolor4').value = handColors[3];
    
    

}

// --- Formen-Galerie -------------------------------------------------------
// Alle waehlbaren Formen (eingebaute Sammlung + hochgeladene) und die aktuell
// ausgewaehlten. Aktive Auswahl = diese Formen; leer -> prozedurale Finger.
let shapeItems = [];
let selectedShapes = new Set();

function buildShapeGallery(){
    shapeItems = (typeof SHAPE_LIBRARY !== 'undefined' ? SHAPE_LIBRARY : [])
        .map(s => ({ svg: s.svg, name: s.name, builtin: true }));
    renderShapeGallery();
}

function renderShapeGallery(){
    let gallery = document.getElementById('shapegallery');
    if(!gallery){
        return;
    }
    gallery.innerHTML = '';
    shapeItems.forEach(item => {
        let btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'shapebtn' + (selectedShapes.has(item.svg) ? ' selected' : '');
        btn.title = item.name || 'SVG';
        btn.innerHTML = item.svg;
        btn.onclick = function(){ toggleShape(item.svg); };
        gallery.appendChild(btn);
    });
}

function toggleShape(svg){
    if(selectedShapes.has(svg)){
        selectedShapes.delete(svg);
    }else{
        selectedShapes.add(svg);
    }
    applyShapeSelection();
    renderShapeGallery();
}

// Uebernimmt die aktuelle Auswahl (Galerie + Uploads) und zeichnet neu.
function applyShapeSelection(){
    setCustomSVGs([...selectedShapes]);
    generate();
}

// Liest hochgeladene SVG-Dateien ein, fuegt sie der Galerie hinzu, waehlt sie
// aus und zeichnet neu. Bei mehreren Formen wird pro Hand zufaellig eine gewaehlt.
function uploadSVGs(files){
    if(!files || files.length === 0){
        return;
    }
    let contents = [];
    let remaining = files.length;

    function done(){
        remaining--;
        if(remaining === 0){
            let svgs = contents.filter(Boolean);
            svgs.forEach(svg => {
                if(!shapeItems.some(it => it.svg === svg)){
                    shapeItems.push({ svg: svg, name: 'Upload', builtin: false });
                }
                selectedShapes.add(svg);
            });
            if(svgs.length > 0){
                applyShapeSelection();
                renderShapeGallery();
            }
            document.getElementById('svgupload').value = '';
        }
    }

    for(let i = 0; i < files.length; i++){
        let idx = i;
        let reader = new FileReader();
        reader.onload = function(e){
            contents[idx] = e.target.result;
            done();
        };
        reader.onerror = function(){
            console.error('Konnte SVG nicht lesen:', files[idx].name);
            done();
        };
        reader.readAsText(files[i]);
    }
}

// Auswahl aufheben -> zurueck zu den original prozeduralen Fingern.
function resetShapes(){
    selectedShapes.clear();
    setCustomSVGs([]);
    generate();
    renderShapeGallery();
}

// Regler fuer Groesse / Stauchung / Anzahl. Neuzeichnen leicht verzoegert,
// damit das Ziehen des Reglers fluessig bleibt.
var regenerateDebounced = _.debounce(function(){
    generate();
}, 250);

function changeSVGSetting(key, value){
    setSVGSetting(key, parseFloat(value));
    regenerateDebounced();
}

// Umschalten zwischen Zufallsdrehung und fester Ausrichtung.
function changeRandomRotation(checked){
    setSVGSetting('randomRotation', checked);
    let slider = document.getElementById('rotationslider');
    if(slider){
        slider.disabled = checked;
    }
    regenerateDebounced();
}

// Ein-/Ausblenden der Einstellungsleiste (Hamburger auf schmalen Screens).
function toggleMenu(){
    document.getElementById('settingswrap').classList.toggle('open');
}

function toggleFingers(){
    if(tinyFingers){
        fingers.removeTinyFingers();
    }else{
        fingers.insertTinyFingers();
    }
    tinyFingers = !tinyFingers;
}

var changeText = _.debounce(function (text) {
  generate(text);
  }, 500);

function changeSize(name, value){
    if(name == 'sizex'){
        sizex = value;
    }
    if(name == 'sizey'){
        sizey = value;
    }

}

function changeStyle(val){
    if(val == 'fill'){
        fingers.makeColored();
    }
    if(val == 'nofill'){
        fingers.makeLineArt();
    }
}

function changeColor(colorname, value){
    if(colorname == 'fillcolor1'){
        fingers.changeColor(handColors[0], value);
        handColors[0] = value;
    }
    if(colorname == 'fillcolor2'){
        fingers.changeColor(handColors[1], value);
        handColors[1] = value;
    }
    if(colorname == 'fillcolor3'){
        fingers.changeColor(handColors[2], value);
        handColors[2] = value;
    }
    if(colorname == 'fillcolor4'){
        fingers.changeColor(handColors[3], value);
        handColors[3] = value;
    }
    if(colorname == 'boxcolor'){
        fingers.changeColor(boxColor, value);
        boxColor = value;
    }
}

function downloadSVG(){
    var svg = project.exportSVG({ asString: true });
    var svgBlob = new Blob([svg], {type:"image/svg+xml;charset=utf-8"});
    var svgUrl = URL.createObjectURL(svgBlob);
    var downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = "funkyfingers.svg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

function downloadPNG(){
    var canvas = document.getElementById("myCanvas");
    var downloadLink = document.createElement("a");
    downloadLink.href = canvas.toDataURL("image/png;base64");
    downloadLink.download = 'funkyfingers.png'
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}



