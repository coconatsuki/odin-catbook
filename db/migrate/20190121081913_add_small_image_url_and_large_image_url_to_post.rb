# frozen_string_literal: true

class AddSmallImageUrlAndLargeImageUrlToPost < ActiveRecord::Migration[5.1]
  def change
    add_column :posts, :smallImageUrl, :string
    add_column :posts, :largeImageUrl, :string
    remove_column :posts, :picture
  end
end
