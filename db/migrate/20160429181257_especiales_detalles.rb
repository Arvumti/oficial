class EspecialesDetalles < ActiveRecord::Migration
  def change
      create_table :especiales_detalles, id: false do |t|
          t.column :idEspecialDetalle, 'INT AUTO_INCREMENT PRIMARY KEY' #primary_key: true
          t.string :latitud
          t.string :longitud
          t.string :texto
          t.string :nombre
          t.string :foto
          t.integer :activo, null: false, default:1
          t.integer :vigencia
          t.timestamps
      end
  end
end
