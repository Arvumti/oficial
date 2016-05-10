class AddPosts < ActiveRecord::Migration
	def change
		add_column :posts, :idAutor, :integer
	end
end
