# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Post, type: :model do
  it 'is creatable' do
    post = create(:post)
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

  it { should validate_presence_of(:body) }
  it { is_expected.to have_many(:comments) }
  it { is_expected.to belong_to(:author).class_name('User') }
end
