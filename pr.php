<?php

error_reporting(E_ALL ^ E_WARNING ^ E_NOTICE);
header('Content-Type: text/html; charset=utf-8');
include("funciones_db.php");

$productos = select('SELECT  idProducto, imagen, nombre, marca, precio,
                            CASE categoria  
                                        WHEN 1 THEN "Calzado"
                                        WHEN 2 THEN "Señalizacion"
                                        WHEN 3 THEN "Impermeables"
                                        WHEN 4 THEN "Arneses"
                                      
                            END categoria
                    FROM productos
                    WHERE activo = 1');

$tope = floor(count($productos)/2);

$tope = floor(count($productos)/2);

$productosP1 = "";
$productosP2 = "";
for($i=0; $i<count($productos); $i++) {
    $producto = "

        <div class='col-md-4 product-box'data-id='".$productos[$i]['idProducto']."'> 
              <a href='#' data-id='".$productos[$i]['idProducto']."'>
              <div class='product-wrap'><img src='img/db_imgs/".$productos[$i]['imagen']."' ></div>
              </a>
              <h2><a href='#'>".$productos[$i]['nombre']."</a></h2>
              <p class='price'>$".$productos[$i]['precio']."</p>
              <p>".$productos[$i]['marca']."</p>
              <a href='detalles.php' class='btn btn_estandar'><i class='fa fa-shopping-cart'></i>Ver detalles</a> 
        </div>";
    
    if($i < $tope)
        $productosP1 .= $producto;
    else
        $productosP2 .= $producto;
}

 

?>