class Api::V1::ProductsController < ApplicationController
  # before_action only: []
  def index
    @products = Product.all
    render json: { status: 'SUCCESS', products: @products}
  end

  def show

  end

  private
end
