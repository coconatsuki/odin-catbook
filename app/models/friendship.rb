# frozen_string_literal: true
# == Schema Information
#
# Table name: friendships
#
#  id            :bigint(8)        not null, primary key
#  accepted      :boolean          default(FALSE)
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  requested_id  :integer
#  requesting_id :integer
#
# Indexes
#
#  index_friendships_on_requested_id                    (requested_id)
#  index_friendships_on_requested_id_and_requesting_id  (requested_id,requesting_id) UNIQUE
#  index_friendships_on_requesting_id                   (requesting_id)
#
# Foreign Keys
#
#  fk_rails_...  (requested_id => users.id)
#  fk_rails_...  (requesting_id => users.id)
#

class Friendship < ApplicationRecord
  belongs_to :requested, class_name: 'User'
  belongs_to :requesting, class_name: 'User'

  validates :requested_id, presence: true
  validates :requesting_id, presence: true

  scope :accepted, -> { where(accepted: true) }
  scope :pending, -> { where(accepted: false) }

  def self.find_active_friendship(user1, user2)
    return unless user1 && user2

    accepted.find_by(requested_id: user1.id, requesting_id: user2.id) || accepted.find_by(requested_id: user2.id, requesting_id: user1.id)
  end

  def self.find_sent_friend_request(current_user, user)
    return unless user

    pending.find_by(requested_id: current_user.id, requesting_id: user.id)
  end

  def self.find_received_friend_request(current_user, user)
    return unless user

    pending.find_by(requesting_id: current_user.id, requested_id: user.id)
  end
end
