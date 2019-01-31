# frozen_string_literal: true

class CurrentUserSerializer < ActiveModel::Serializer
  attributes :id, :name

  attribute(:requests_count) { object.received_pending_friends.size }
end
