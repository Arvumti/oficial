class UsuariosController < ApplicationController
	def show
		#render :json => Usuario.all.to_json
		render :json => { 'ok' => 1 }
	end

	def login
		@user = Usuario.where({:usuario => params[:usuario], :contrasenia => params[:contrasenia]}).first
		
		puts '--- @user ---'
		puts @user
		if @user then
			usuario = @user.as_json({ :only => ['idUsuario', 'nombre', 'usuario', 'tipo', 'email'] })
			session[:usuario] = usuario
			render :json => { 'data' => { :ok => 1} }
		else
			puts 'mal'
			render :json => {
								'errmsg' => 'Usuario y/o contraseña estan incorrectos', 
								'errnum' => 9000, 
								'data' => nil,
							}
		end 
	end
	def logout
		session[:usuario] = nil
		redirect_to '/application/login'
	end
	def update
		render :json => set_data(model_params, params[:action], find_model, 'usuario') 
	end

	private
		def find_model
			Usuario.find(params[:id])
		end
		def model_params
			params.permit(:nombre, :usuario, :contrasenia, :tipo, :email, :activo)
		end
end
