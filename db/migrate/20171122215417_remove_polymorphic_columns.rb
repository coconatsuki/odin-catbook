# frozen_string_literal: true

class RemovePolymorphicColumns < ActiveRecord::Migration[5.1]
  def change
    remove_column :likes, :likable_id
    remove_column :likes, :likable_type
    remove_column :comments, :commentable_id
    remove_column :comments, :commentable_type
  end
end
