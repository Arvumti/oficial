class AddIdEspecial < ActiveRecord::Migration
  def change
  	add_column :especiales_detalles, :idEspecial, :integer
  end
end
