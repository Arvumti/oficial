<?php

// error_reporting(E_ALL ^ E_WARNING ^ E_NOTICE);
// header('Content-Type: text/html; charset=utf-8');
// include("funciones_db.php");

// $productos = select('SELECT  idProducto, imagen, nombre, marca, precio,
//                             CASE categoria  
//                                         WHEN 1 THEN "Calzado"
//                                         WHEN 2 THEN "Señalizacion"
//                                         WHEN 3 THEN "Impermeables"
//                                         WHEN 4 THEN "Arneses"
                                      
//                             END categoria
//                     FROM productos
//                     WHERE activo = 1');

// $tope = floor(count($productos)/2);

// $tope = floor(count($productos)/2);

// $productosP1 = "";
// $productosP2 = "";
// for($i=0; $i<count($productos); $i++) {
//     $producto = "

//         <div class='col-md-4 product-box'data-id='".$productos[$i]['idProducto']."'> 
//               <a href='#' data-id='".$productos[$i]['idProducto']."'>
//               <div class='product-wrap'><img src='img/db_imgs/".$productos[$i]['imagen']."' ></div>
//               </a>
//               <h2><a href='#'>".$productos[$i]['nombre']."</a></h2>
//               <p class='price'>$".$productos[$i]['precio']."</p>
//               <p>".$productos[$i]['marca']."</p>
//               <a href='detalles.php' class='btn btn_estandar'><i class='fa fa-shopping-cart'></i>Ver detalles</a> 
//         </div>";
    
//     if($i < $tope)
//         $productosP1 .= $producto;
//     else
//         $productosP2 .= $producto;
// }

 

?>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>CAVINSA CATALOGO WEB</title>

<link href="css/bootstrap.min.css" rel="stylesheet">
<link href="css/estilo.css" rel="stylesheet">

<link href='http://fonts.googleapis.com/css?family=Open+Sans+Condensed:700' rel='stylesheet' type='text/css'>
<link href='http://fonts.googleapis.com/css?family=Roboto:400,300,700,500' rel='stylesheet' type='text/css'>
<link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
<link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon">


</head>
<body>
<div class="header_renglon" id="header_renglon">
  <div class="container">
    <div class="row"> 
      <div class="col-md-2"> <a class="nav_marca logo" href="#"><img src="img/logo.jpg" alt="logo cavinsa"></a> </div>
      <div class="col-md-8 info_contacto">
        <p><span class="num_telefono"><i class="fa fa-phone"></i>618 123 456</span> <span class="mail-info"><i class="fa fa-comments"></i>info@cavinsa.com</span></p>
      </div>
      <div class="col-md-2">
        <ul class="social_media flota_derecho">
          
        </ul>
      </div>
    </div>
  </div>
</div>

<div class="top_navega">
  <nav class="navbar navbar-default" role="navigation">
    <div class="container"> 
      
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"> <span class="sr-only">Nav</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button>
      </div>
      
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
          <li class="active"><a href="">Inicio</a></li>
          <li><a href="">Acerca</a></li>
          <li><a href="">Servicio</a></li>
          <li class="dropdown"> <a href="" class="dropdown-toggle" data-toggle="dropdown">Ventas <span class="caret"></span></a>
            <ul class="dropdown-menu" role="menu">
              <li><a href="">Opcion</a></li>
              <li><a href="">Opcion</a></li>
            </ul>
          </li>
          <li class="dropdown"> <a href="investor.html" class="dropdown-toggle" data-toggle="dropdown">Opcion <span class="caret"></span></a>
            <ul class="dropdown-menu" role="menu">
              <li><a href="">Opcion</a></li>
           
              <li><a href="">Algo mas</a></li>
            </ul>
          </li>
     
          <li class="dropdown"> <a href="#" class="dropdown-toggle" data-toggle="dropdown">Catálogo<span class="caret"></span></a>
            <ul class="dropdown-menu" role="menu">
              <li><a href="shop.html">Botas</a></li>
             
              
             </ul>
          </li>
          <li><a href="">Contacto</a></li>
        </ul>
      
      </div>
      
    </div>
  </nav>
</div>
<div class="tp-page-header" >
  <div class="container">
    <div class="row">
      <div class="col-md-12 page-header-title">
        <h2>Catálogo</h2>
        <ol class="breadcrumb">
          <li><a href="#">Web</a></li>
          <li class="active">Shop</li>
        </ol>
      </div>
    </div>
  </div>
</div>
<div id="franja_linea"></div>

<div class="main-wrapper">
  <div class="woo-shop" id="woo-shop">
    <div class="container">
      <div class="row">
        <div class="col-md-9 shop-listing">
          
          <div class="row">
            <div class="col-md-8">
              <p>Mostrando X Productos</p>
            </div>
            <div class="col-md-4">
              <!--select id="sorting" name="sorting" class="form-control">
                <option value="menu_order">Default sorting</option>
                <option value="popularity">Sort by popularity</option>
                <option value="rating">Sort by average rating</option>
                <option value="date">Sort by newness</option>
                <option value="price">Sort by price: low to high</option>
                <option value="price-desc">Sort by price: high to low</option>
              </select-->
            </div>
          </div>
          <div class="row products">
            <div class="col-md-4 product-box"> 
              <a href="#">
              <div class="product-wrap"><img src="img/product-1.png" alt=""></div>
              </a>
              <h2><a href="#">GUANTES PROTECCION</a></h2>
              <p class="price">$652.00–$702.00</p>
              <p class="rating"><span><a href="#" class="rating-done"><i class="fa fa-star"></i></a></span> <span> <a href="#" class="rating-done"><i class="fa fa-star"></i></a></span> <span> <a href="#" class="rating-done"><i class="fa fa-star"></i></a></span> <span><a href="#" class="rating-done"><i class="fa fa-star"></i></a></span> <span><a href="#"><i class="fa fa-star"></i></a></span> </p>
              <a href="#" class="btn btn_estandar"><i class="fa fa-shopping-cart"></i>Ver detalles</a> 
            </div>
            
            <div class="col-md-4 product-box"> 
              <a href="#">
              <div class="product-wrap"><img src="img/product-2.png" alt=""></div>
              </a>
              <h2><a href="#">CHAMARRA NA AVCA38</a></h2>
              <p class="price"><span class="price-del">$1014.00</span>$1000.00</p>
              <p class="rating"><span><a href="#" class="rating-done"><i class="fa fa-star"></i></a></span> <span><a href="#" class="rating-done"><i class="fa fa-star"></i></a></span> <span><a href="#"><i class="fa fa-star"></i></a></span> <span><a href="#"><i class="fa fa-star"></i></a></span> <span><a href="#"><i class="fa fa-star"></i></a></span> </p>
              <a href="#" class="btn btn_estandar"><i class="fa fa-shopping-cart"></i>Ver detalles</a> </div>
            
            <div class="col-md-4 product-box"> 
              <a href="#"><span class="offer">Oferta</span>
              <div class="product-wrap"><img src="img/product-3.png" alt=""></div>
              </a>
              <h2><a href="#">NOMBRE PRODUCTO</a></h2>
              <p class="price">$100.00</p>
              <p class="rating"><span><a href="#" class="rating-done"><i class="fa fa-star"></i></a></span> <span><a href="#" class="rating-done"><i class="fa fa-star"></i></a></span> <span><a href="#"><i class="fa fa-star"></i></a></span> <span><a href="#"><i class="fa fa-star"></i></a></span> <span><a href="#"><i class="fa fa-star"></i></a></span> </p>
              <a href="#" class="btn btn_estandar"><i class="fa fa-shopping-cart"></i>Ver detalles</a> </div>
            <div class="col-md-4 product-box"> 
              <a href="#">
              <div class="product-wrap"><img src="img/product-5.png" alt=""></div>
              </a>
              <h2><a href="#">NOMBRE PRODUCTO</a></h2>
              <p class="price">$65.00–$70.00</p>
              <p class="rating"><span><a href="#" class="rating-done"><i class="fa fa-star"></i></a></span> <span> <a href="#" class="rating-done"><i class="fa fa-star"></i></a></span> <span> <a href="#" class="rating-done"><i class="fa fa-star"></i></a></span> <span><a href="#" class="rating-done"><i class="fa fa-star"></i></a></span> <span><a href="#"><i class="fa fa-star"></i></a></span> </p>
              <a href="#" class="btn btn_estandar"><i class="fa fa-shopping-cart"></i>Ver detalles</a> </div>
            
            <div class="col-md-4 product-box"> 
              <a href="#">
              <div class="product-wrap"><img src="img/product-4.png" alt=""></div>
              </a>
              <h2><a href="#">producto minero </a></h2>
              <p class="price"><span class="price-del">$114.00</span>$100.00</p>
              <p class="rating"><span><a href="#" class="rating-done"><i class="fa fa-star"></i></a></span> <span><a href="#" class="rating-done"><i class="fa fa-star"></i></a></span> <span><a href="#"><i class="fa fa-star"></i></a></span> <span><a href="#"><i class="fa fa-star"></i></a></span> <span><a href="#"><i class="fa fa-star"></i></a></span> </p>
              <a href="#" class="btn btn_estandar"><i class="fa fa-shopping-cart"></i>Ver detalles</a> </div>
            
            <div class="col-md-4 product-box"> 
              <a href="#">
              <div class="product-wrap"><img src="img/product-6.png" alt=""></div>
              </a>
              <h2><a href="#">Otro producto</a></h2>
              <p class="price">$100.00</p>
              <p class="rating"><span><a href="#" class="rating-done"><i class="fa fa-star"></i></a></span> <span><a href="#" class="rating-done"><i class="fa fa-star"></i></a></span> <span><a href="#"><i class="fa fa-star"></i></a></span> <span><a href="#"><i class="fa fa-star"></i></a></span> <span><a href="#"><i class="fa fa-star"></i></a></span> </p>
              <a href="#" class="btn btn_estandar"><i class="fa fa-shopping-cart"></i>Ver detalles</a> </div>
            <div class="col-md-4 product-box"> 
              <a href="#">
              <div class="product-wrap"><img src="img/product-1.png" alt=""></div>
              </a>
              <h2><a href="#">Otro producto</a></h2>
              <p class="price">$65.00–$70.00</p>
              <p class="rating"><span><a href="#" class="rating-done"><i class="fa fa-star"></i></a></span> <span> <a href="#" class="rating-done"><i class="fa fa-star"></i></a></span> <span> <a href="#" class="rating-done"><i class="fa fa-star"></i></a></span> <span><a href="#" class="rating-done"><i class="fa fa-star"></i></a></span> <span><a href="#"><i class="fa fa-star"></i></a></span> </p>
              <a href="#" class="btn btn_estandar"><i class="fa fa-shopping-cart"></i>Ver detalles</a> </div>
            
            <div class="col-md-4 product-box">
              <a href="#">
              <div class="product-wrap"><img src="img/product-2.png" alt=""></div>
              </a>
              <h2><a href="#">Otro producto</a></h2>
              <p class="price"><span class="price-del">$114.00</span>$100.00</p>
              <p class="rating"><span><a href="#" class="rating-done"><i class="fa fa-star"></i></a></span> <span><a href="#" class="rating-done"><i class="fa fa-star"></i></a></span> <span><a href="#"><i class="fa fa-star"></i></a></span> <span><a href="#"><i class="fa fa-star"></i></a></span> <span><a href="#"><i class="fa fa-star"></i></a></span> </p>
              <a href="#" class="btn btn_estandar"><i class="fa fa-shopping-cart"></i>Ver detalles</a> </div>
            
            <div class="col-md-4 product-box"> 
              <a href="#">
              <div class="product-wrap"><img src="img/product-3.png" alt=""></div>
              </a>
              <h2><a href="#">Otro producto</a></h2>
              <p class="price">$100.00</p>
              <p class="rating"><span><a href="#" class="rating-done"><i class="fa fa-star"></i></a></span> <span><a href="#" class="rating-done"><i class="fa fa-star"></i></a></span> <span><a href="#"><i class="fa fa-star"></i></a></span> <span><a href="#"><i class="fa fa-star"></i></a></span> <span><a href="#"><i class="fa fa-star"></i></a></span> </p>
              <a href="#" class="btn btn_estandar"><i class="fa fa-shopping-cart"></i>Ver detalles</a> </div>
            
            <div class="col-md-12 blog-pagination">
              <ul class="pagination">
                <li class="active"><a href="#">1 <span class="sr-only">(current)</span></a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#"><span aria-hidden="true">»</span><span class="sr-only">Next</span></a></li>
              </ul>
            </div>
          </div>
          
        </div>
        
        <div class="col-md-3 shop-sidebar">
          <div class="row">
            <div class="col-md-12">
              
            </div>
            
            <div class="col-md-12">
            
            </div>
            
            <div class="col-md-12">
              <div class="widget categories-widget">
                <h2 class="widget-title">Producto categorias</h2>
                <ul>
                  <li><i class="fa fa-angle-double-right "></i> <a href="#">Guantes</a></li>
                  <li><i class="fa fa-angle-double-right "></i> <a href="#">Botas</a></li>
                  <li><i class="fa fa-angle-double-right "></i> <a href="#">Ojos proteccion</a></li>
                  <li><i class="fa fa-angle-double-right "></i> <a href="#">Casco</a></li>
                  <li><i class="fa fa-angle-double-right "></i> <a href="#">Otra categoría</a></li>
                </ul>
              </div>
              
            </div>
           
            <div class="col-md-12 top-listing">
              <h2>Productos más votados</h2>
              <div class="row product-box">
                <div class="col-md-4">
                  <div class="product-wrap">
                    <img src="img/product-1.png" alt="" class="img-responsive">
                </div>
              </div>
              <div class="col-md-8">
                <h3><a href="#">Guantes de protección</a></h3>
                <p class="price">$655.00–$705.00</p>
                <p class="rating"><span><a href="#" class="rating-done"><i class="fa fa-star"></i></a></span> <span><a href="#" class="rating-done"><i class="fa fa-star"></i></a></span> <span><a href="#"><i class="fa fa-star"></i></a></span> <span><a href="#"><i class="fa fa-star"></i></a></span> <span><a href="#"><i class="fa fa-star"></i></a></span> </p>

              </div>
             </div>
             <div class="row product-box">
                <div class="col-md-4">
                  <div class="product-wrap">
                    <img src="img/product-1.png" alt="" class="img-responsive">
                </div>
              </div>
              <div class="col-md-8">
                <h3><a href="#">Guantes</a></h3>
                <p class="price">$654.00–$704.00</p>
                <p class="rating"><span><a href="#" class="rating-done"><i class="fa fa-star"></i></a></span> <span><a href="#" class="rating-done"><i class="fa fa-star"></i></a></span> <span><a href="#"><i class="fa fa-star"></i></a></span> <span><a href="#"><i class="fa fa-star"></i></a></span> <span><a href="#"><i class="fa fa-star"></i></a></span> </p>

              </div>
             </div>
             <div class="row product-box">
                <div class="col-md-4">
                  <div class="product-wrap">
                    <img src="img/product-1.png" alt="" class="img-responsive">
                </div>
              </div>
              <div class="col-md-8">
                <h3><a href="#">Guantes</a></h3>
                <p class="price">$653.00–$703.00</p>
                <p class="rating"><span><a href="#" class="rating-done"><i class="fa fa-star"></i></a></span> <span><a href="#" class="rating-done"><i class="fa fa-star"></i></a></span> <span><a href="#"><i class="fa fa-star"></i></a></span> <span><a href="#"><i class="fa fa-star"></i></a></span> <span><a href="#"><i class="fa fa-star"></i></a></span> </p>

              </div>
             </div>
             <div class="row product-box">
                <div class="col-md-4">
                  <div class="product-wrap">
                    <img src="img/product-1.png" alt="" class="img-responsive">
                </div>
              </div>
              <div class="col-md-8">
                <h3><a href="#">Guantes</a></h3>
                <p class="price">$654.00–$740.00</p>
                <p class="rating"><span><a href="#" class="rating-done"><i class="fa fa-star"></i></a></span> <span><a href="#" class="rating-done"><i class="fa fa-star"></i></a></span> <span><a href="#"><i class="fa fa-star"></i></a></span> <span><a href="#"><i class="fa fa-star"></i></a></span> <span><a href="#"><i class="fa fa-star"></i></a></span> </p>

              </div>
             </div>



            </div>




          </div>
        </div>
      </div>
    </div>
  </div>
  
</div>

<div id="footer" class="footer-section">
  <div class="container">
    <div class="row">
      <div class="col-md-3 tp-ft-about">
        <div class="ft-logo"><img src="img/.png" alt=""></div>
        <div class="address">
          <ul>
            <li><i class="fa fa-home"></i>Libertad 350<br>
              Zona centro,
              Durango Mexico</li>
            <li><i class="fa fa-phone"></i>1
          618 808 603 6035</li>
            <li><i class="fa fa-fax"></i>618 603 6035</li>
            <li><i class="fa fa-envelope"></i>info@cavinsa.com</li>
          </ul>
        </div>
        
      </div>
      <div class="col-md-3 tp-investor-relation">
        <h2>Giros</h2>
        <ul>
          <li><i class="fa fa-angle-double-right"></i><a href="#">Industria Minera</a></li>
          <li><i class="fa fa-angle-double-right"></i> <a href="#">Construccion</a></li>
          <li> <i class="fa fa-angle-double-right"></i><a href="#">Opcion</a></li>
          <li> <i class="fa fa-angle-double-right"></i><a href="#">sss</a></li>
          <li> <i class="fa fa-angle-double-right"></i><a href="#">Opcion</a></li>
         
        </ul>
      </div>
     
      <div class="col-md-3 tp-pages-link">
        <h2>Links</h2>
        <ul>
          <li><i class="fa fa-angle-double-right"></i><a href="#">Nosotross</a></li>
          <li><i class="fa fa-angle-double-right"></i><a href="#">Servicios</a></li>
          <li> <i class="fa fa-angle-double-right"></i><a href="#">Catálogo</a></li>
          <li> <i class="fa fa-angle-double-right"></i><a href="#">Contacto</a></li>
        </ul>
      </div>
 
      <div class="col-md-3 tp-informations-link">
        <h2>InformationsLinks</h2>
        <ul>
          <li><i class="fa fa-angle-double-right"></i><a href="#">Annual Report</a></li>
          <li><i class="fa fa-angle-double-right"></i><a href="#">Board of Member</a></li>
          <li> <i class="fa fa-angle-double-right"></i><a href="#">Become Investor</a></li>
          <li> <i class="fa fa-angle-double-right"></i><a href="#">Support</a></li>
          <li> <i class="fa fa-angle-double-right"></i><a href="#">Investor Form</a></li>
          <li> <i class="fa fa-angle-double-right"></i><a href="#">FAQ</a></li>
        </ul>
      </div>
    </div>
    

  </div>
</div>

<div id="tiny-footer" class="tiny-footer">
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <p class="copyright-ct">© 2015 CAVINSA  | </p>



      </div>
      <div class="col-md-6">
        <ul class="social_media-ft flota_derecho">
          <li><a href="#"><i class="fa fa-facebook-square"></i></a></li>
          <li><a href=""><i class="fa fa-twitter-square"></i></a></li>
          <li><a href=""><i class="fa fa-google-plus-square"></i></a></li>
          <li><a href=""><i class="fa  fa-rss-square"></i></a></li>
          <li><a href=""><i class="fa  fa-linkedin-square"></i></a></li>
        </ul>
      </div>
    </div>
  </div>
</div>

<script src="js/jquery-1.11.1.min.js"></script> 

<script type="text/javascript" src="js/bootstrap.min.js"></script>
</body>
</html>