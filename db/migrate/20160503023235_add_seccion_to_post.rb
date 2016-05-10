class AddSeccionToPost < ActiveRecord::Migration
  def change
    add_column :posts, :idEspecial, :integer
  end
end
