class ContactoController < ApplicationController
	def index		
		render 'contacto.html.erb'
	end
	def enviarCorreo
	  @persona = { nombre:params[:nombre], email: params[:email], telefono: params[:tel],categoria: params[:department], mensaje: params[:mensaje] }
	  puts @persona.to_json	
      ActionCorreo.contacto_email(@persona).deliver      	
	  puts 'correo enviado'
	  #respond_to
	  #render '/correo_enviado.html.erb'

	  #render json: @persona
	  #redirect_to "/contacto"
	end
end
