class AddNombreToEspeciales < ActiveRecord::Migration
  def change
    add_column :especiales, :nombre, :string
  end
end
