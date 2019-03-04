# frozen_string_literal: true

class ChangeLargePictureToCropPicture < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :cropped_profile_pic, :string
    add_column :users, :cropped_cover_pic, :string

    remove_column :users, :large_profile_pic, :string
    remove_column :users, :large_cover_pic, :string
    remove_column :posts, :largeImageUrl, :string
  end
end
