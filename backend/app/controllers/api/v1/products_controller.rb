class Api::V1::ProductsController < ApplicationController
  before_action :set_product, only: [:show]

  def index
    @products = Product.all
    render json: { message: 'Successfully fetched products', status: 200,
                   products: @products.as_json(include: :images) }
  end

  def show
    render json: { message: 'Successfully found product', status: 200, product: @product.as_json(include: :images) }
  end

  private

  def set_product
    @product = Product.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { message: 'Failed to find product', status: 400 }
  end
end
