class AddForeignKeyToFriendship < ActiveRecord::Migration[5.1]
  def change
    add_foreign_key :friendships, :users, column: :requested_id
    add_foreign_key :friendships, :users, column: :requesting_id
  end
end
