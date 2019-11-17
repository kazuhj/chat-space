class Group < ApplicationRecord
  has_many :group_users
  has_many :users, through: :group_users
  # 自身のDB設計にはないが、回答に基きバリデーションを追加。
  validates :name, presence: true, uniqueness: true
end
