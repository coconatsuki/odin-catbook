# frozen_string_literal: true

class AddPostIdToComments < ActiveRecord::Migration[5.1]
  def change
    add_column :comments, :post_id, :integer
    add_foreign_key :comments, :posts, column: :post_id
  end
end
