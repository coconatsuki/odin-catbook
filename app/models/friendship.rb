class Friendship < ApplicationRecord
  belongs_to :requested, class_name: 'User'
  belongs_to :requesting, class_name: 'User'

  validates :requested_id, presence: true
  validates :requesting_id, presence: true
end
