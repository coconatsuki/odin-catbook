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
#  cropped_cover_pic      :string
#  cropped_profile_pic    :string
#  current_sign_in_at     :datetime
#  current_sign_in_ip     :inet
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
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

require 'rails_helper'

RSpec.describe User, type: :model do
  it 'is creatable' do
    user = create(:user).reload
    first_user = User.first
    expect(first_user.name).to eq(user.name)
    expect(first_user.email).to eq(user.email)
    expect(first_user.birthday).to eq(user.birthday)
    expect(first_user.country).to eq(user.country)
    expect(first_user.city).to eq(user.city)
    expect(first_user.things_i_like).to eq(user.things_i_like)
    expect(first_user.things_i_hate).to eq(user.things_i_hate)
    expect(first_user.small_profile_pic).to eq(user.small_profile_pic)
    expect(first_user.cropped_profile_pic).to eq(user.cropped_profile_pic)
    expect(first_user.small_cover_pic).to eq(user.small_cover_pic)
    expect(first_user.cropped_cover_pic).to eq(user.cropped_cover_pic)
  end

  it "has many posts" do
    user = create(:user, :with_posts).reload
    expect(user.posts.first.author).to eq(user)
  end

  it "has many comments" do
    user = create(:user, :with_comments).reload
    expect(user.comments.first.author).to eq(user)
  end

  it "has many likes" do
    user = create(:user, :with_likes).reload
    expect(user.likes.first.author).to eq(user)
  end

  it "has many sent frienships" do
    user = create(:user, :with_sent_friendships).reload
    expect(user.sent_friendships.first.requesting).to eq(user)
  end

  it "has many received frienships" do
    user = create(:user, :with_received_friendships).reload
    expect(user.received_friendships.first.requested).to eq(user)
  end

  it "has many sent pending frienships" do
    user = create(:user, :with_sent_pending_friendships).reload
    expect(user.sent_pending_friends.first.received_pending_friends.first).to eq(user)
  end

  it "has many received pending frienships" do
    user = create(:user, :with_received_pending_friendships).reload
    expect(user.received_pending_friends.first.sent_pending_friends.first).to eq(user)
  end

  it "has many sent active frienships" do
    user = create(:user, :with_sent_active_friendships).reload
    expect(user.sent_active_friends.first.received_active_friends.first).to eq(user)
  end

  it "has many received pending frienships" do
    user = create(:user, :with_received_active_friendships).reload
    expect(user.received_active_friends.first.sent_active_friends.first).to eq(user)
  end

  it { should validate_presence_of(:name) }
  it { is_expected.to validate_length_of(:name).most(25) }
  it { is_expected.to have_many(:posts) }
  it { is_expected.to have_many(:comments) }
  it { is_expected.to have_many(:likes) }
  it { is_expected.to have_many(:sent_pending_friends) }
  it { is_expected.to have_many(:received_pending_friends) }
  it { is_expected.to have_many(:sent_active_friends) }
  it { is_expected.to have_many(:received_active_friends) }
end
