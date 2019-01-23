# frozen_string_literal: true

class CurrentUserWithFriendsSerializer < ActiveModel::Serializer
  attributes :id, :name

  attribute(:friends) { object.friends }
end
