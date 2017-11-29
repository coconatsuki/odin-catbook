class Friendship < ApplicationRecord
  belongs_to :requested, class_name: 'User'
  belongs_to :requesting, class_name: 'User'

  validates :requested_id, presence: true
  validates :requesting_id, presence: true

  def self.find_relation(user, target)
    if relation = self.where("requesting_id= ? AND requested_id= ? AND accepted= ?", user.id, target.id, true).first ||
      relation = self.where("requesting_id= ? AND requested_id= ? AND accepted= ?", target.id, user.id, true).first
    end
    relation
  end

  def self.find_request(user, target)
    self.where("requesting_id= ? AND requested_id= ? AND accepted= ?", user.id, target.id, false).first
  end

  def self.find_all_requests(user)
    self.where("requested_id= ? AND accepted= ?", user.id, false)
  end

  def friend_name
    User.find_by(id: self.requesting_id).name
  end


end
