# frozen_string_literal: true

# == Schema Information
#
# Table name: posts
#
#  id            :bigint(8)        not null, primary key
#  body          :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  author_id     :integer
#  smallImageUrl :string
#  largeImageUrl :string
#

require 'rails_helper'

RSpec.describe Post, type: :model do
  subject do
    create(:post)
  end

  it 'is creatable' do
    post = subject.reload
    first_post = Post.first
    expect(first_post.body).to eq(post.body)
    expect(first_post.smallImageUrl).to eq(post.smallImageUrl)
    expect(first_post.largeImageUrl).to eq(post.largeImageUrl)
  end

  it "has many comments" do
    post = create(:post, :with_comments).reload
    expect(post.comments.first.post).to eq(post)
  end

  it "has many likes" do
    post = create(:post, :with_likes).reload
    expect(post.likes.first.post).to eq(post)
  end

  it "belongs to an author" do
    post = create(:post).reload
    expect(post.author.posts.first).to eq(post)
  end

  it { is_expected.to validate_presence_of(:body) }
  it { is_expected.to validate_length_of(:body).is_at_least(5) }

  it { is_expected.to have_many(:comments) }
  it { is_expected.to belong_to(:author).class_name('User') }
end
