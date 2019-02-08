# frozen_string_literal: true

class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :breed, :birthday, :country, :city, :things_i_like, :things_i_hate
  has_many :posts

  attribute(:likes_count) { object.likes.size }
  attribute(:friends) { object.friends }

  attribute(:is_friend) { object.friend(current_user) ? object.friend(current_user).id : nil }
  attribute(:sent_friend_request) { object.sent_friend_request(current_user) ? object.sent_friend_request(current_user).id : nil }
  attribute(:received_friend_request) { object.received_friend_request(current_user) ? object.received_friend_request(current_user).id : nil }
end
