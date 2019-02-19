# frozen_string_literal: true

class AddPositiveToLike < ActiveRecord::Migration[5.1]
  def change
    add_column :likes, :positive, :boolean, default: true
  end
end
