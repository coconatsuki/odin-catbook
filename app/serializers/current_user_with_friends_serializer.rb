# frozen_string_literal: true

class CurrentUserWithFriendsSerializer < ActiveModel::Serializer
  attributes :id, :name

  attribute(:friends) { object.friends }
  attribute(:received_friend_requests) { object.received_pending_friends }
  attribute(:sent_friend_requests) { object.sent_pending_friends }
end
