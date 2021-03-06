# frozen_string_literal: true
# == Schema Information
#
# Table name: comments
#
#  id         :bigint(8)        not null, primary key
#  body       :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  author_id  :integer
#  post_id    :integer
#
# Foreign Keys
#
#  fk_rails_...  (author_id => users.id)
#  fk_rails_...  (post_id => posts.id)
#

require 'rails_helper'

RSpec.describe Comment, type: :model do
  it 'is creatable' do
    comment = create(:comment).reload
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
