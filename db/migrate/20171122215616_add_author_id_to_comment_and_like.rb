# frozen_string_literal: true

class AddAuthorIdToCommentAndLike < ActiveRecord::Migration[5.1]
  def change
    add_column :comments, :author_id, :integer
    add_column :likes, :author_id, :integer
    add_foreign_key :comments, :users, column: :author_id
    add_foreign_key :likes, :users, column: :author_id
    add_foreign_key :posts, :users, column: :author_id
  end
end
