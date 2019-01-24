# frozen_string_literal: true

class UserSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :posts

  attribute(:likes_count) { object.likes.size }
  attribute(:friends) { object.friends }
end
