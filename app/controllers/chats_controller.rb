class ChatsController < ApplicationController
  before_action :set_group
  def index
    @chat = Chat.new
    @chats = @group.chats.includes(:user)
  end

  def create
    @chat = @group.chats.new(chat_params)
    @chats = @group.chats.includes(:user)
    @chat.save
      respond_to do |format|
        format.html { redirect_to group_chats_path, notice: "メッセージを送信しました" }
        format.json
      end
  end

  private

  def chat_params
    params.require(:chat).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
    @users = @group.users
  end
end
