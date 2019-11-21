class Group < ApplicationRecord
  has_many :group_users
  has_many :users, through: :group_users
  # 自身のDB設計にはないが、回答に基きバリデーションを追加。
  validates :name, presence: true, uniqueness: true
  has_many :chats

  def show_last_message
    if (last_chat = chats.last).present?
      last_chat.content? ? last_chat.content : '画像が投稿されています'
    else
      'まだメッセージはありません'
    end
  end
end
