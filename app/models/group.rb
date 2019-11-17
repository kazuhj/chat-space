class Group < ApplicationRecord
  has_many :group_users
  has_many :users, through: :groups_users
  # 自身のDB設計にはないが、回答に基きバリデーションを追加。
  validates :name, presence: true, uniqueness: true
  # 回答にはないが、自身のDB設計でアソシエーションを組んだため、追加。
  has_many :chats
end
