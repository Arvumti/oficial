<?php
error_reporting(E_ALL ^ E_WARNING ^ E_NOTICE);
header('Content-Type: text/html; charset=utf-8');
include("db_conecta.php");

$res = Array();
$json = json_decode($_POST["data"]);
$getJson = $_GET["datas"];

if($getJson['request'] == 1) {
    $id = $getJson['idProducto'];
    $res = select("SELECT idProducto, idGaleria, direccion FROM galeria WHERE idProducto = {$id}");
}
else if($getJson['request'] == 2) {
    $id = $getJson['id'];
    $res = execQuery("DELETE FROM galeria WHERE idGaleria = {$id}");

    unlink($getJson['direccion']);
}
else if($getJson['request'] == 3) {
    $id = $getJson['id'];
    $res = select("SELECT idProducto, idGaleria, direccion FROM galeria WHERE idProducto = {$id}");
    for ($i=0; $i < count($res); $i++) { 
        unlink($res[$i]['direccion']);
    }
    $res = select("SELECT dirImg FROM productos WHERE idProducto = {$id}");
    for ($i=0; $i < count($res); $i++) { 
        unlink("img/db_imgs/".$res[$i]['dirImg']);
    }

    $res = execQuery("DELETE FROM galeria WHERE idProducto = {$id}");
    $res = execQuery("DELETE FROM productos WHERE idProducto = {$id}");
}
else if($getJson['request'] == 4) {
    $res = execQuery("INSERT INTO productos (activo) VALUES(1);");
}
else if(!$json) {
    $res = select('SELECT idProducto, imagen, nombre, categoria, marca, precio, activo, detalles FROM productos');
}
else if($json->{"request"} == 5) {//$_FILES["upIBottom"]["size"] > 0) {
    $extAll = explode('/', $_FILES["upIBottom"]["type"]);
    $ext = $extAll[1];
    $nombre = (date('ymdHis').$milliseconds.'.'.$ext);

    $res = " UPDATE productos
                SET dirimg ='".$nombre."', 
                activo = ".$json->{"activo"}."
                WHERE idProducto = ".$json->{"idProducto"};
    
    $res = execQuery($res);
    if($res["res"] == 1) {
        move_uploaded_file($_FILES["upIBottom"]["tmp_name"], "img/db_imgs/".$nombre);
        
        $res["img"] = $nombre;
        
        $filename = "img/db_imgs/".$json->{"dirImg"};
        if(strlen($json->{"imagen"}) > 0 && file_exists($filename))
            unlink($filename);
    }
}
else if($json->{"request"} == 6) {//count($_FILES["files_galeria"]["size"]) > 0) {
    $files = $_FILES["files_galeria"];
    $id = $json->{"idProducto"};
    $arrFiles = Array();

    for ($i=0; $i < count($files["size"]); $i++) { 
        $extAll = explode('.', $files["type"][$i]);
        $ext = $extAll[1];
        if(strlen($ext) == 0)
            $ext = 'jpg';

        $nombre = "img/db_imgs/".(date('ymdHis').$milliseconds.$i.'.'.$ext);

        $res = "    INSERT INTO galeria (direccion, idProducto)
                    VALUES ('{$nombre}', {$id});";
        
        if(strlen($files["tmp_name"][$i]) == 0)
            continue;

        $res = execQuery($res);
        if($res["res"] == 1) {
            move_uploaded_file($files["tmp_name"][$i], $nombre);
            $file = Array('tmp' => $files["tmp_name"][$i], 'direccion' => $nombre, 'idGaleria' => $res['idkey']);
            array_push($arrFiles, $file);
        }
    }

    $res['files'] = $arrFiles;
}
else if($json->{"request"} == 7) {
    $res = " UPDATE productos 
                SET imagen = '".($json->{"imagen"})."', 
                    nombre = '".($json->{"nombre"})."', 
                    categoria = '".($json->{"catgoria"})."', 
                    marca = '".($json->{"marca"})."',
                    precio = '".($json->{"precio"})."', 
                    activo = '".($json->{"activo"})."',
                    descripcion= '".($json->{"descripcion"})."'

                WHERE idProducto = '".($json->{"idProducto"})."'";
    
    $res = execQuery($res);
    $res['files'] = $_FILES["files[]"];
}

echo json_encode($res);

?>