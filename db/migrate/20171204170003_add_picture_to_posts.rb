# frozen_string_literal: true

class AddPictureToPosts < ActiveRecord::Migration[5.1]
  def change
    add_column :posts, :picture, :string
  end
end
