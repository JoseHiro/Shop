class Api::V1::MembersController < ApplicationController
  before_action  :authenticate_api_v1_user!
  def index
    render json: { member: current_api_v1_user }
  end
end
