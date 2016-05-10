class AddLinkToAnuncios < ActiveRecord::Migration
  def change
    add_column :anuncios, :link, :string
  end
end
