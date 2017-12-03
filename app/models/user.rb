class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  devise :omniauthable, :omniauth_providers => [:facebook]

  after_create :send_welcome_email

  validates :name, presence: true


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
    self.sent_active_friends | self.received_active_friends
  end

  def pending_friends
    self.received_pending_friends | self.sent_pending_friends
  end

  def all_friends
    friends | self.received_pending_friends | self.sent_pending_friends
  end

  #Give back the posts of all the user friends, and his own.
  def feed
    users = self.friends << self
    @posts =  Post.where(author: users).order(created_at: :desc).includes(:likes, :author, :comments)
  end

  def send_welcome_email
    UserMailer.welcome_mail(self).deliver_now
  end

  #---------------OmniAuth

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.password = Devise.friendly_token[0,20]
      user.name = auth.info.name   # assuming the user model has a name
      user.image = auth.info.image  #assuming the user model has an image
      # If you are using confirmable and the provider(s) you use validate emails,
      # uncomment the line below to skip the confirmation emails.
      # user.skip_confirmation!
    end
  end

end
