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


class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :breed, :birthday, :country, :city, :things_i_like, :things_i_hate
  has_many :posts

  attribute(:likes_count) { object.likes.size }
  attribute(:friends) { object.friends }

  attribute(:is_friend) { object.friend(current_user) ? object.friend(current_user).id : nil }
  attribute(:sent_friend_request) { object.sent_friend_request(current_user) ? object.sent_friend_request(current_user).id : nil }
  attribute(:received_friend_request) { object.received_friend_request(current_user) ? object.received_friend_request(current_user).id : nil }
end
