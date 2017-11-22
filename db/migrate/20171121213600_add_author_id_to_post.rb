class AddAuthorIdToPost < ActiveRecord::Migration[5.1]
  def change
    add_column :posts, :author_id, :integer, foreign_key: true
    remove_column :posts, :user_id
  end
end
