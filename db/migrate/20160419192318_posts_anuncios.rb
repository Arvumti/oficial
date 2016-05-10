class PostsAnuncios < ActiveRecord::Migration
  def change
  	create_table :posts_anuncios, id: false do |t|
		t.column :idPostAnuncio, 'INT AUTO_INCREMENT PRIMARY KEY' #primary_key: true
		t.integer :idPost, references: 'post', index: {name:'idx_posAnu_pos'}, foreign_key: true
		t.integer :idAnuncio, references: 'anuncio', index: {name:'idx_posAnu_anu'}, foreign_key: true

		t.timestamps
	end
  end
end
