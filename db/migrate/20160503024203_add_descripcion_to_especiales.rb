class AddDescripcionToEspeciales < ActiveRecord::Migration
  def change
    add_column :especiales, :descripcion, :string
  end
end
