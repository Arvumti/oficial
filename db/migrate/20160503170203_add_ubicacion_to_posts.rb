class AddUbicacionToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :ubicacion, :string
  end
end
