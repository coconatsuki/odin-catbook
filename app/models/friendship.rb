# frozen_string_literal: true

class Friendship < ApplicationRecord
  belongs_to :requested, class_name: 'User'
  belongs_to :requesting, class_name: 'User'

  validates :requested_id, presence: true
  validates :requesting_id, presence: true

  scope :accepted, -> { where(accepted: true) }

  def self.find_relation(user, target)
    if relation = where("requesting_id= ? AND requested_id= ? AND accepted= ?", user.id, target.id, true).first ||
                  relation = where("requesting_id= ? AND requested_id= ? AND accepted= ?", target.id, user.id, true).first
    end
    relation
  end

  def self.find_request(user, target)
    where("requesting_id= ? AND requested_id= ? AND accepted= ?", user.id, target.id, false).first
  end

  def self.find_all_requests(user)
    where("requested_id= ? AND accepted= ?", user.id, false)
  end

  def friend_name
    User.find_by(id: requesting_id).name
  end

  def self.find_active_friendship(user1, user2)
    return unless user1 && user2

    accepted.find_by(requested_id: user1.id, requesting_id: user2.id) || accepted.find_by(requested_id: user2.id, requesting_id: user1.id)
  end
end
