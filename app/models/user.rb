class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :posts, foreign_key: 'author_id', dependent: :destroy

  has_many :requested_friendships, class_name: "Friendship",
                                   dependent: :destroy
  has_many :received_friendships, class_name: "Friendship",
                                   dependent: :destroy
  has_many :accepted_friendships, class_name: "Friendship",
                                   dependent: :destroy
  has_many :requested_friends, through: :requested_friendships
  has_many :requesting_friends, through: :received_friendships
  has_many :friends, :accepted_friendships
end
