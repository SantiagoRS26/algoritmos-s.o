
function animate() {
    $('fresh').prepend('<div id="curtain" style="position: absolute; right: 0; width:100%; height:100px;"></div>');


    $('#curtain').width($('#resultTable').width());
    $('#curtain').css({ left: $('#resultTable').position().left });

    var sum = 0;
    $('.exectime').each(function () {
        sum += Number($(this).val());
    });

    var distance = $("#curtain").css("width");

    animationStep(sum, 0);
    jQuery('#curtain').animate({ width: '0', marginLeft: distance }, sum * 1000 / 2, 'linear');
}

function animate1() {
    $('#DIA1').prepend('<div id="curtain1" style="position: absolute; right: 0; width:100%; height:100px;"></div>');


    $('#curtain1').width($('#resultTable').width());
    $('#curtain1').css({ left: $('#resultTable').position().left });

    var sum = 0;
    $('.exectime').each(function () {
        sum += Number($(this).val());
    });

    var distance = $("#curtain1").css("width");

    animationStep(sum, 0);
    jQuery('#curtain1').animate({ width: '0', marginLeft: distance }, sum * 1000 / 2, 'linear');
}

function animate2() {
    $('#DIA2').prepend('<div id="curtain2" style="position: absolute; right: 0; width:100%; height:100px;"></div>');


    $('#curtain2').width($('#resultTable').width());
    $('#curtain2').css({ left: $('#resultTable').position().left });

    var sum = 0;
    $('.exectime').each(function () {
        sum += Number($(this).val());
    });

    var distance = $("#curtain2").css("width");

    animationStep(sum, 0);
    jQuery('#curtain2').animate({ width: '0', marginLeft: distance }, sum * 1000 / 2, 'linear');
}

function animate3() {
    $('#DIA3').prepend('<div id="curtain3" style="position: absolute; right: 0; width:100%; height:100px;"></div>');


    $('#curtain3').width($('#resultTable').width());
    $('#curtain3').css({ left: $('#resultTable').position().left });

    var sum = 0;
    $('.exectime').each(function () {
        sum += Number($(this).val());
    });

    var distance = $("#curtain3").css("width");

    animationStep(sum, 0);
    jQuery('#curtain3').animate({ width: '0', marginLeft: distance }, sum * 1000 / 2, 'linear');
}

function animationStep(steps, cur) {
    $('#timer').html(cur);
    if (cur < steps) {
        setTimeout(function () {
            animationStep(steps, cur + 1);
        }, 500);
    }
    else {
    }
}

function drawfcfs() {
    $('fresh').html('');
    var inputTable = $('#inputTable tr');
    var th = '';
    var td = '';
    let tempo = 0;
    let ids = 0;
    let contador = 0;
    $.each(inputTable, function (key, value) {
        if (key == 0) return true;
        var executeTime = parseInt($(value.children[2]).children().first().val());
        th += '<th style="height: 60px; width: ' + executeTime * 20 + 'px;">' + (vectornombresprioridad[contador]) + '</th>';
        tempo = tempo + executeTime;
        contador++;
        td += '<td id="id' + ids + '">' + tempo + '</td>';
        ids++;
    });
    $('fresh').html('<table id="resultTable"><tr>'
        + th
        + '</tr><tr>'
        + td
        + '</tr></table>'
    );
    let suma = 0;
    for (let i = 0; i < (ids - 1); i++) {
        let sim = parseInt(document.getElementById(`id${i}`).innerHTML);
        suma = suma + sim;
    }
    suma = suma / ids;
    $('#timepro').html('');
    $('#timepro').html('<p>Tiempo promedio de espera: ' + suma.toFixed(2) + '</p><p>');
    animate();
}

function drawsjf() {
    $('#DIA1').html('');
    var inputTable = $('#inputTable tr');
    var th = '';
    var td = '';
    var executeTimes = [];
    let contador = 0;
    let tempo = 0;

    $.each(inputTable, function (key, value) {
        if (key == 0) return true;
        var executeTime = parseInt($(value.children[2]).children().first().val());
        executeTimes[key - 1] = { "executeTime": executeTime, "P": key - 1 };
    });

    executeTimes.sort(function (a, b) {
        if (a.executeTime == b.executeTime)
            return a.P - b.P;
        return a.executeTime - b.executeTime
    });

    $.each(executeTimes, function (key, value) {
        th += '<th style="height: 60px; width: ' + value.executeTime * 20 + 'px;">P' + value.P + '</th>';
        tempo = tempo + value.executeTime;
        td += '<td id="id1' + contador + '">' + (tempo) + '</td>';
        contador++;
    });

    $('#DIA1').html('<table id="resultTable"><tr>'
        + th
        + '</tr><tr>'
        + td
        + '</tr></table>'
    );
    let suma = 0;
    for (let i = 0; i < (contador - 1); i++) {
        let sim = parseInt(document.getElementById(`id1${i}`).innerHTML);
        suma = suma + sim;
    }
    suma = suma / contador;
    $('#timepro1').html('');
    $('#timepro1').html('<p>Tiempo promedio de espera: ' + suma.toFixed(2) + '</p>');

    animate1();
}

function drawprioridad() {
    $('#DIA2').html('');
    var inputTable = $('#inputTable tr');
    var th = '';
    var td = '';
    var executeTimes = [];
    let tempo = 0;
    let contador = 0;
    $.each(inputTable, function (key, value) {
        if (key == 0) return true;
        var executeTime = parseInt($(value.children[2]).children().first().val());
        var priority = parseInt($(value.children[4]).children().first().val());
        executeTimes[key - 1] = { "executeTime": executeTime, "P": key - 1, "priority": priority };
    });
    executeTimes.sort(function (a, b) {
        if (a.priority == b.priority)
            return a.P - b.P;
        return a.priority - b.priority
    });

    $.each(executeTimes, function (key, value) {
        th += '<th style="height: 60px; width: ' + value.executeTime * 20 + 'px;">P' + value.P + '</th>';
        tempo = tempo + value.executeTime;
        td += '<td id="id2' + contador + '">' + tempo + '</td>';
        contador++;
    });

    $('#DIA2').html('<table id="resultTable"<tr>'
        + th
        + '</tr><tr>'
        + td
        + '</tr></table>'
    );

    let suma = 0;
    for (let i = 0; i < (contador - 1); i++) {
        let sim = parseInt(document.getElementById(`id2${i}`).innerHTML);
        suma = suma + sim;
    }
    suma = suma / contador;
    $('#timepro2').html('');
    $('#timepro2').html('<p>Tiempo promedio de espera: ' + suma.toFixed(2) + '</p>');

    animate2();
}

function drawrobin() {
    $('#DIA3').html('');
    var inputTable = $('#inputTable tr');
    var th = '';
    var td = '';
    let contador = 0;
    let tempo2 = 0;
    var quantum = 2;
    /* var quantum = $('#quantum').val(); */
    var executeTimes = [];

    $.each(inputTable, function (key, value) {
        if (key == 0) return true;
        var executeTime = parseInt($(value.children[2]).children().first().val());
        executeTimes[key - 1] = { "executeTime": executeTime, "P": key - 1 };
    });

    var areWeThereYet = false;
    while (!areWeThereYet) {
        areWeThereYet = true;
        $.each(executeTimes, function (key, value) {
            if (value.executeTime > 0) {
                th += '<th style="height: 60px; width: ' + (value.executeTime > quantum ? quantum : value.executeTime) * 20 + 'px;">P' + value.P + '</th>';
                contador = (contador + (value.executeTime > quantum ? quantum : value.executeTime));
                td += '<td id="ids3' + tempo2 + '">' + contador + '</td>';
                value.executeTime -= quantum;
                areWeThereYet = false;
                tempo2++;
            }

        });
    }
    $('#DIA3').html('<table id="resultTable"<tr>'
        + th
        + '</tr><tr>'
        + td
        + '</tr></table>'
    );


    let suma = 0;
    for (let i = 0; i < (tempo2 - 1); i++) {
        let sim = parseInt(document.getElementById(`ids3${i}`).innerHTML);
        suma = suma + sim;
    }
    suma = suma / cantprocesos;
    $('#timepro3').html('');
    $('#timepro3').html('<p>Tiempo promedio de espera: ' + suma.toFixed(2) + '</p>');
    animate3();
}