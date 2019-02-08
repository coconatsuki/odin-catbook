# frozen_string_literal: true

class AddProfilePicturesToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :large_profile_pic, :string
    add_column :users, :small_profile_pic, :string
    add_column :users, :large_cover_pic, :string
    add_column :users, :small_cover_pic, :string

    remove_column :users, :avatar, :string
    remove_column :users, :image, :string
  end
end
