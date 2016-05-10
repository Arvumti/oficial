class ModifyEspeciales < ActiveRecord::Migration
    def up
        change_column :especiales_detalles, :vigencia, :date
    end
    def down
        change_column :especiales_detalles, :vigencia, :integer
    end
end
