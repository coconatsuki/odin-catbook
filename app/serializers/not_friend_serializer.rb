# frozen_string_literal: true

class NotFriendSerializer < ActiveModel::Serializer
  attributes :id, :name, :cropped_profile_pic

  attribute(:sent_friend_request) { object.sent_friend_request(current_user) ? object.sent_friend_request(current_user).id : nil }
  attribute(:received_friend_request) { object.received_friend_request(current_user) ? object.received_friend_request(current_user).id : nil }
end
