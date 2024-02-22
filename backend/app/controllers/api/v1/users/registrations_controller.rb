# frozen_string_literal: true

class Api::V1::Users::RegistrationsController < Devise::RegistrationsController
  include RackSessionFix
  respond_to :json
  before_action :sign_up_params, only: [:create]
  # skip_before_action :authenticate_user!
  # , if: -> { controller_name == 'sessions' && action_name == 'create' }
  # before_action :configure_account_update_params, only: [:update]

  def create
    super do |user|
      if user.persisted?
        render json: { status: 'Success', user:, message: 'Registration successful' }
      else
        render json: { status: 'Failed', errors: user.errors.full_messages }
      end and return
    end
  end

  # GET /resource/edit
  def update
    user = current_api_v1_user
    if user.update(update_params)
      render json: {
        status: { code: 200, message: 'User updated successfully.' },
        data: UserSerializer.new(user).serializable_hash[:data][:attributes]
      }
      # sign_in(user, :bypass => true)
    else
      render json: {
        status: { code: 422, message: "User couldn't be updated successfully. #{user.errors.full_messages.to_sentence}" }
      }, status: :unprocessable_entity
    end
  end

  # DELETE /resource
  def destroy
    user = current_api_v1_user
    user.destroy
    if user.destroyed?
      # cookies.delete :sessionId
      # session.delete :sessionId
      # cookies[:hoge] = { value: 'piyo', http_only: true, secure: true }
      render json: {
        status: 200,
        message: 'User account deleted successfully.'
      }, status: :ok
    else
      render json: {
        status: 500,
        message: 'Failed to delete user account.'
      }, status: :internal_server_error
    end
  end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end

  # protected

  # private
  def sign_up_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end

  def update_params
    params.require(:user).permit(:id, :name, :email, :password)
  end

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_up_params
  #   devise_parameter_sanitizer.permit(:sign_up, keys: [:attribute])
  # end

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_account_update_params
  #   devise_parameter_sanitizer.permit(:account_update, keys: [:attribute])
  # end

  # The path used after sign up.
  # def after_sign_up_path_for(resource)
  #   super(resource)
  # end

  # # The path used after sign up for inactive accounts.
  # def after_inactive_sign_up_path_for(resource)
  #   super(resource)
  # end

  # def respond_with(resource, _opts = {})
  #   # puts resource
  #   if resource.persisted?
  #     render json: {
  #       status: { code: 200, message: 'Signed up sucessfully.' },
  #       data: UserSerializer.new(resource).serializable_hash[:data][:attributes]
  #     }
  #   else
  #     render json: {
  #       status: { code: 422, message: "User couldn't be created successfully. #{resource.errors.full_messages.to_sentence}" }
  #     }, status: :unprocessable_entity
  #   end
  # end
end
