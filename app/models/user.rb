# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id                     :bigint(8)        not null, primary key
#  birthday               :date
#  breed                  :string
#  city                   :string
#  country                :string
#  current_sign_in_at     :datetime
#  current_sign_in_ip     :inet
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  large_cover_pic        :string
#  large_profile_pic      :string
#  last_sign_in_at        :datetime
#  last_sign_in_ip        :inet
#  name                   :string
#  provider               :string
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string
#  sign_in_count          :integer          default(0), not null
#  small_cover_pic        :string
#  small_profile_pic      :string
#  things_i_hate          :string           is an Array
#  things_i_like          :string           is an Array
#  uid                    :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
# Indexes
#
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_name                  (name) UNIQUE
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#

class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  devise :omniauthable, omniauth_providers: [:facebook]

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
  has_many :sent_active_friends, -> { where(friendships: { accepted: true }) },
           through: :sent_friendships,
           source: :requested

  has_many :sent_pending_friends, -> { where(friendships: { accepted: false }) },
           through: :sent_friendships,
           source: :requested

  has_many :received_active_friends, -> { where( friendships: { accepted: true }) },
           through: :received_friendships,
           source: :requesting

  has_many :received_pending_friends, -> { where( friendships: { accepted: false }) },
           through: :received_friendships,
           source: :requesting

  #---------------------general methods

  def friends
    sent_active_friends | received_active_friends
  end

  def friend(current_user)
    Friendship.find_active_friendship(current_user, self)
  end

  def sent_friend_request(current_user)
    requesting_user_id = sent_pending_friends.find_by(id: current_user.id)
    Friendship.find_by(requested_id: requesting_user_id)
  end

  def received_friend_request(current_user)
    requested_user_id = received_pending_friends.find_by(id: current_user.id)
    Friendship.find_by(requesting_id: requested_user_id)
  end

  def evaluated_by
    likes.find_by(author_id: user.id)
  end

  # Give back the posts of all the user's friends, and his own.
  def feed
    users = friends << self
    @posts = Post.where(author: users).order(created_at: :desc).includes(:likes, :author, :comments)
  end

  def send_welcome_email
    UserMailer.welcome_mail(self).deliver_later
  end

  #------------------------------OmniAuth-----------------------------------

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.password = Devise.friendly_token[0, 20]
      user.name = auth.info.name # assuming the user model has a name
      user.image = auth.info.image # assuming the user model has an image
      # If you are using confirmable and the provider(s) you use validate emails,
      # uncomment the line below to skip the confirmation emails.
      # user.skip_confirmation!
    end
  end
end
