# frozen_string_literal: true

class CurrentUserWithRequestsSerializer < CurrentUserSerializer
  has_many :received_pending_friends, serializer: NotFriendSerializer
end
