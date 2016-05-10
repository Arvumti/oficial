$(document).on('ready', inicio);
var app = {},
    tmp = null,
    $topLoader = null,
    tmpProducto = function(){},
    categorias = [' ', 'Calzado', 'Señalización', 'Impermeables', 'Arneses' ];

function inicio() {
    $(document).foundation();
    console.log(1);

    $('.btn-nuevo').on('click', function(){
        $.getJSON('routes.php', {datas:{request:4}}).done(done);

        function done(data) {
            var data = {
                idProducto: data.idkey,
                activo: 1,
            };
            var productos = tmpProducto({data:data});
            $('#pnlProductos').prepend(productos);
        }
    });
    $('#pnlProductos').on('click', '.btn-eliminar', function(e){
        var id = $(e.currentTarget).parents('article.pnl-producto').data('id');
        $.getJSON('routes.php', {datas:{request:3, id:id}}).done(done);

        function done(data) {
            $(e.currentTarget).parents('article.pnl-producto').remove();
        }
    });

    $('.gv-galeria tbody').on('click', 'i', function(e) {
        var id = $(e.currentTarget).data('id');
        var direccion = $(e.currentTarget).data('direccion');

        $.getJSON('routes.php', {datas:{request:2, id:id, direccion:direccion}}).done(done);

        function done(data) {
            $(e.currentTarget).parents('tr').remove();
        }
    });
    $('.files-modal').on('change', function() {
        saveGaleria(app.currentGalery, $('.form-galeria'));
    });
    $('.btn-agregar-modal').on('click', function() {
        $('.files-modal').click();
    });
    $('.btn-cerrar-modal').on('click', function() {
        app.currentGalery = null;
        $('.reveal-modal-galery').foundation('reveal', 'close');
    });
    $('#pnlProductos').on('click', '.btn-galeria', function(e) {
        app.currentGalery = $(e.currentTarget);
        var id = app.currentGalery.data('id');
        $.getJSON('routes.php', {datas:{request:1, idProducto:id}}).done(done);

        function done(data) {
            var trs = tmpTrGaleria({data:data});
            $('.gv-galeria tbody').html(trs);
        }


        $('.reveal-modal-galery').foundation('reveal', 'open');
    });
    
    Handlebars.registerHelper('GetMeses', function(categoria){
        var options = '';
        for(var i = 1; i < categorias.length; i++) {
            options += '<option value="' + i + '" ' + ( i == categotia? 'selected' : '') + '>' + categorias[i] + '</option>';
        }
        return options;
	});    
    tmpCarro = Handlebars.compile($('#tmp-producto').html());
    tmpTrGaleria = Handlebars.compile($('#tmp-tr-galeria').html());
    
    getCarros();
    
    $('#pnlProductos').on('click', '.btn-guradar', function(e) {
        var elem = $(e.currentTarget).parents('.pnl-producto');
        saveCarro(elem, 7);
    });
    
    $('#pnlProductos').on('click', '.btn-visible', function(e) {
        var elem = $(e.currentTarget).parents('.pnl-producto');
        if(elem.data('activo') == 1) {
            elem.data('activo', 0);
            elem.find('textarea, input, select, .btn-guradar').attr('disabled', 'disabled');
            $(e.currentTarget).find('i').removeClass('fa-eye').addClass('fa-eye-slash');
        }
        else {
            elem.data('activo', 1);
            elem.find('textarea, input, select, .btn-guradar').removeAttr('disabled', 'disabled');
            $(e.currentTarget).find('i').removeClass('fa-eye-slash').addClass('fa-eye');
        }
        saveCarro(elem, 7);
    });
    $('#pnlProductos').on('click', '.pnl-producto .img-logo', function(e) { 
        e.preventDefault();
        app.current = $(e.currentTarget).parents('.pnl-producto');
        
        $('#upIBottom').click();
    });
    
    $('#upIBottom').on('change', function() {
        saveCarro(app.current, 5);
    });
    
    $topLoader = $("#topLoader").percentageLoader({width: 256, height: 256, controllable : true, progress : 0, onProgressUpdate : function(val) {
        $topLoader.setValue(Math.round(val * 100.0));
    }});
}

function getCarros() {
    $.getJSON('routes.php', {data:1}).done(done).fail(fail);
    
    function done(data) {
        var carros = tmpCarro({data:data});
        $('#pnlProductos').append(carros);
    }
    
    function fail(xhr) {
        console.log(xhr);
    }
}

function saveGaleria(elem, form) {         
    var json = {
        idCarro     : elem.data('id'),
        request     : 6,
    };
    
    var formData = new FormData(form[0]);
    formData.append("data", JSON.stringify(json));
    
    lShow();
    
    $.ajax({
        url: 'routes.php',  //Server script to process data
        type: 'POST',
        xhr: function() {  // Custom XMLHttpRequest
            var myXhr = $.ajaxSettings.xhr();
            if(myXhr.upload){ // Check if upload property exists
                myXhr.upload.addEventListener('progress', progressHandlingFunction, false); // For handling the progress of the upload
            }
            return myXhr;
        },
        success: function(data) {
            lHide();
            form[0].reset();
            if(data.res == 1) {
                var trs = tmpTrGaleria({data:data.files});
                $('.gv-galeria tbody').append(trs);
            }
            
            console.log(data.err);
        },
        error: function(xhr) {
            lHide();
            console.log(xhr);
        },
        // Form data
        data: formData,
        //Options to tell jQuery not to process data or worry about content-type.
        dataType: "json",
        cache: false,
        contentType: false,
        processData: false
    });
    
    return json;
}

function saveCarro(elem, request) { 
    var elemFile = $('form.global-form-file input:file')[0],
        file = elemFile.files[0],
        type = file ? file.type : '';
        
    var json = {
        idProducto    : elem.data('id'),
        imagen    : elem.find('.img-logo').find('img').attr('src').substring(12),
        nombre      : elem.find('.txtNombre').val(),
        marca      : elem.find('.txtMarca').val(),
        descripcion   : elem.find('.txaDescripcion').val(),
        categoria       : elem.find('.cboCategoria').val(),
        precio      : elem.find('.txtPrecio').val(),
        activo      : elem.data('activo'),
        request     : request || 5,
    };
    
    var formData = new FormData($('form.global-form-file')[0]);
    formData.append("data", JSON.stringify(json));
    
    lShow();
    
    $.ajax({
        url: 'routes.php',  //Server script to process data
        type: 'POST',
        xhr: function() {  // Custom XMLHttpRequest
            var myXhr = $.ajaxSettings.xhr();
            if(myXhr.upload){ // Check if upload property exists
                myXhr.upload.addEventListener('progress', progressHandlingFunction, false); // For handling the progress of the upload
            }
            return myXhr;
        },
        success: function(data) {
            if(data.res == 1 && data.img)
                app.current.find('.img-logo img').attr('src', 'img\\db_imgs\\' + data.img);
            
            console.log(data.err);
            
            $('form.global-form-file')[0].reset();
            app.current = null;
            lHide();
        },
        error: function(xhr) {
            lHide();
            console.log(xhr);
        },
        // Form data
        data: formData,
        //Options to tell jQuery not to process data or worry about content-type.
        dataType: "json",
        cache: false,
        contentType: false,
        processData: false
    });
    
    return json;
}

function progressHandlingFunction(e){
    console.log(e);
    if(e.lengthComputable){
        console.log({value:e.loaded,max:e.total});
        
        $topLoader.setProgress(0);
        $topLoader.setValue('0kb');
        var kb = e.loaded;
        var totalKb = e.total + 100;
        
        $topLoader.setProgress(kb / totalKb);
        $topLoader.setValue(kb.toString() + 'kb');
    }
}

function SetCurrenArticle(article){
    $('section.files article').removeClass('current');
    article.addClass('current');
}

function lShow() {
    var h1 = $(document).height();
    var h2 = $('body').height();
    var h3 = $('html').height();
    var  max = 0;
    
    if(h1 > h2 && h1 > h3)
        max = h1;
    else if (h2 > h3)
        max = h2;
    else
        max = h3;
    
    var top = $(document).scrollTop() + 250;
    
    $('.loading').css({height:max + 'px'}).removeClass('isHidden').children('#topLoader').css({top:top + 'px'});
}

function lHide() {
    $('.loading').addClass('isHidden');
}

Handlebars.registerHelper('isActivoIco', function(activo){
    if(activo == 0)
      return '-slash';
});

Handlebars.registerHelper('isActivo', function(activo){
    if(activo == 0)
      return 'disabled';
});