# frozen_string_literal: true

class AddDetailsToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :breed, :string
    add_column :users, :birthday, :date
    add_column :users, :country, :string
    add_column :users, :city, :string
    add_column :users, :things_i_like, :string, array: true
    add_column :users, :things_i_hate, :string, array: true
  end
end
