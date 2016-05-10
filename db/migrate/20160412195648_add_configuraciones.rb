class AddConfiguraciones < ActiveRecord::Migration
  def change
  	add_column :configuraciones, :titulo, :string
  end
end
