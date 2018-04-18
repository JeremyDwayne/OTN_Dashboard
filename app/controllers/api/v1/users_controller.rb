class Api::V1::UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]
  before_action :authenticate_user!, except: [:invited]

  def resource_name
    :user
  end

  def index
    @users = User.all
    render json: @users
  end

  def admins
    render json: AdminSerializer.new(Admin.all).serialized_json
  end

  def show
    render json: @user
  end

  def invited
    puts params.inspect
    render json: User.find_by_invitation_token(params[:invitation_token], true)
  end

  def create
    @user = User.new

    if @user.save
      render json: @user, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def update
    puts "PARAMS #{params.inspect}"
    if @user.update_attributes(user_params)
      render json: @user, status: :ok
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @user.destroy
  end

  private
  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    devise_parameter_sanitizer.permit(:update, keys: [:email, :first_name, :last_name, :password, :password_confirmation, :role, :institution_id])
  end

end
