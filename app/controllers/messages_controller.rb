class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
    @members = @group.users
    respond_to do |format|
      format.html
      format.json { @new_messages = @messages.where("id > ?", params[:id]) }
    end
  end

  def create
    @message = @group.messages.new(message_params)
    if @message.save
      respond_to do |format|
        format.html{ redirect_to group_messages_path(@group),notice:"メッセージが送信されました"}
        format.json
      end
    else
      @messages = @group.messages.includes(:user)
      format.html { redirect_to group_messages_path(@group), alert: 'メッセージを入力してください。'}
      format.json { render json: @message.errors.messages }
      render :index
    end
  end

  private

  def message_params
    params.require(:message).permit(:body, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
    Time.zone ='Tokyo'
  end
end

