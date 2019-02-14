# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id                     :bigint(8)        not null, primary key
#  name                   :string
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :inet
#  last_sign_in_ip        :inet
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  provider               :string
#  uid                    :string
#  breed                  :string
#  birthday               :date
#  country                :string
#  city                   :string
#  things_i_like          :string           is an Array
#  things_i_hate          :string           is an Array
#  large_profile_pic      :string
#  small_profile_pic      :string
#  large_cover_pic        :string
#  small_cover_pic        :string
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

  # def pending_friends
  #   received_pending_friends | sent_pending_friends
  # end

  def all_friends
    friends | received_pending_friends | sent_pending_friends
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

  def liked_by
    likes.find_by(author_id: user.id)
  end

  # Give back the posts of all the user friends, and his own.
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
