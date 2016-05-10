class AddPostsAnuncios < ActiveRecord::Migration
  def change
  	add_column :posts_anuncios, :principal, :integer
  end
end
