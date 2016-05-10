class ModifyEspecialesDetalles < ActiveRecord::Migration
    def change
        def up
            change_column :especiales_detalles, :vigencia, :time
        end
        def down
            change_column :especiales_detalles, :vigencia, :integer
        end
    end
end
