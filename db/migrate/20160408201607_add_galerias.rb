class AddGalerias < ActiveRecord::Migration
  def change
  	add_column :galerias, :info, :string
  end
end
