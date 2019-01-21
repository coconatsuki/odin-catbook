# frozen_string_literal: true

class RemoveTitleToComments < ActiveRecord::Migration[5.1]
  def change
    remove_column :comments, :title
  end
end
