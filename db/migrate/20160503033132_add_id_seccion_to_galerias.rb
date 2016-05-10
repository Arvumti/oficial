class AddIdSeccionToGalerias < ActiveRecord::Migration
  def change
    add_column :galerias, :idEspecial, :integer
  end
end
