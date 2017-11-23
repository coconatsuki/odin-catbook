class CreateFriendships < ActiveRecord::Migration[5.1]
  def change
    create_table :friendships do |t|
      t.integer :requested_id
      t.integer :requesting_id
      t.boolean :accepted, default: false

      t.timestamps
    end
    add_index :friendships, :requested_id
    add_index :friendships, :requesting_id
    add_index :friendships, [:requested_id, :requesting_id], unique: true
  end
end
