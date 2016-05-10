class AddActivoToAutores < ActiveRecord::Migration
  def change
    add_column :autores, :activo, :integer
  end
end
