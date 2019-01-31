# frozen_string_literal: true

class CurrentUserWithRequestsSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_many :received_pending_friends, serializer: NotFriendSerializer
end
