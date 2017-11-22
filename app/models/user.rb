class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  #------------------- BASIC ASSOCIATIONS -----------------------------------

  has_many :posts, foreign_key: 'author_id', dependent: :destroy
  has_many :comments, foreign_key: 'author_id', dependent: :destroy
  has_many :likes, foreign_key: 'author_id', dependent: :destroy

  #-------------- FRIENDSHIPS ASSOCIATONS ---------------------------------

  has_many :sent_friendships, foreign_key: 'requesting_id',
                              class_name: 'Friendship',
                              dependent: :destroy
  has_many :received_friendships, foreign_key: 'requested_id',
                                  class_name: 'Friendship',
                                  dependent: :destroy
#--------------------
  has_many :sent_active_friends, -> { where(friendships: { accepted: true})},
                                through: :sent_friendships,
                                 source: :requested

  has_many :sent_pending_friends, -> { where(friendships: { accepted: false })},
                                  through: :sent_friendships,
                                  source: :requested


  has_many :received_active_friends, -> { where( friendships: { accepted: true })},
                                     through: :received_friendships,
                                     source: :requesting

  has_many :received_pending_friends, -> { where( friendships: { accepted: false })},
                                      through: :received_friendships,
                                      source: :requesting

#---------------------

  def friends
    self.sent_friendships.where(accepted: true, requesting_id: self.id) +
    self.received_friendships.where(accepted: true, requested_id: self.id)
  end




end
