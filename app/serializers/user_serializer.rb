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

class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :breed, :birthday, :country, :city, :things_i_like, :things_i_hate
  has_many :posts

  attribute(:likes_count) { object.likes.positive.size }
  attribute(:dislikes_count) { object.likes.negative.size }
  attribute(:friends) { object.friends }

  attribute(:is_friend) { object.friend(current_user) ? object.friend(current_user).id : nil }
  attribute(:sent_friend_request) { object.sent_friend_request(current_user) ? object.sent_friend_request(current_user).id : nil }
  attribute(:received_friend_request) { object.received_friend_request(current_user) ? object.received_friend_request(current_user).id : nil }
end
