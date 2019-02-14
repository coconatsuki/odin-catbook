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
    expect(first_user.large_profile_pic).to eq(user.large_profile_pic)
    expect(first_user.small_cover_pic).to eq(user.small_cover_pic)
    expect(first_user.large_cover_pic).to eq(user.large_cover_pic)
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
  it { is_expected.to have_many(:posts) }
  it { is_expected.to have_many(:comments) }
  it { is_expected.to have_many(:likes) }
  it { is_expected.to have_many(:sent_pending_friends) }
  it { is_expected.to have_many(:received_pending_friends) }
  it { is_expected.to have_many(:sent_active_friends) }
  it { is_expected.to have_many(:received_active_friends) }
end
