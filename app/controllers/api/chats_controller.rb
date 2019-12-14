class Api::ChatsController < ApplicationController
  def index
    @group = Group.find(params[:group_id])
    @chats = @group.chats.includes(:user).where('id > ?', params[:last_id]) 
  end
end