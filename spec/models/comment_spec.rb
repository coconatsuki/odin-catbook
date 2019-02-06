# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Comment, type: :model do
  it 'is creatable' do
    comment = create(:comment)
    first_comment = Comment.first
    expect(first_comment.body).to eq(comment.body)
  end

  it "belongs to an author" do
    comment = create(:comment).reload
    expect(comment.author.comments.first).to eq(comment)
  end

  it "belongs to a post" do
    comment = create(:comment).reload
    expect(comment.post.comments.first).to eq(comment)
  end

  it { should validate_presence_of(:body) }
  it { is_expected.to belong_to(:author).class_name('User') }
  it { is_expected.to belong_to(:post) }
end
