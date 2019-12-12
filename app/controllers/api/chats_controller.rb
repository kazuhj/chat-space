class Api::ChatsController < ApplicationController
  def index
    group = Group.find(params[:group_id])
    last_message_id = params[:id].to_i
    @chats = group.chats.includes(:user).where("id > #{last_messages_id}")
  end
end