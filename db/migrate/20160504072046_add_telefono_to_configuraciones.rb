class AddTelefonoToConfiguraciones < ActiveRecord::Migration
  def change
    add_column :configuraciones, :telefono, :string
    add_column :configuraciones, :correo, :string
    add_column :configuraciones, :direccion, :string
  end
end
