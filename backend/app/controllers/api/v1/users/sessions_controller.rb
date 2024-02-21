# frozen_string_literal: true

class Api::V1::Users::SessionsController < Devise::SessionsController
  include RackSessionFix
  respond_to :json
  before_action :configure_sign_in_params, only: [:create]
  # skip_before_action :verify_authenticity_token

  # POST /resource/sign_in

  def create
    user = User.find_by(email: login_params[:email])
    if user && user.valid_password?(login_params[:password])
      sign_in(user)
      render json: { user: user.attributes.except('password', 'password_confirmation'), messsage: 'Logged in successfully', status: 200 },
             status: 200
    else
      render json: { message: 'Error, Unauthorized', status: 401 },
             status: :unauthorized
    end
  end

  # DELETE /resource/sign_out
  def destroy
    # user = current_api_v1_user
    sign_out(current_api_v1_user)
    if current_api_v1_user.nil?
      render json: { message: 'Successfully logged out', status: 200 }
    else
      render json: { message: 'Failed to logout', status: 400 }
    end
  end

  # protected

  private

  def login_params
    params.require(:user).permit(:email, :password)
  end

  # # If you have extra params to permit, append them to the sanitizer.
  def configure_sign_in_params
    devise_parameter_sanitizer.permit(:sign_in, keys: %i[email password])
  end

  def respond_with(resource, _opts = {})
    render json: {
      status: {
        code: 200,
        message: 'Logged in successfully'
      },
      data: UserSerializer.new(resource).serializable_hash[:data][:attributes]
    }
  end

  # def respond_to_on_destroy
  #   puts current_api_v1_user
  #   if current_api_v1_user
  #     render json: {
  #       status: 200,
  #       message: "logged out successfully"
  #     }, status: :ok
  #   else
  #     render json: {
  #       status: 401,
  #       message: "Couldn't find an active session."
  #     }, status: :unauthorized
  #   end
  # end
end
