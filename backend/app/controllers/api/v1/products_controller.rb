class Api::V1::ProductsController < ApplicationController
  before_action :authenticate_api_v1_user!
  before_action :set_product, only: [:show]
  def index
    @products = Product.all
    render json: { status: 'SUCCESS', products: @products}
  end

  def show
    render json: {status: "Success", product: @product}
  end

  def create
    product = Product.new(product_params)
    if product.save
    render json: {status: 'Success'}
    else
      render json: {status: "Failed"}
    end
  end

  private

  def set_product
    @product = Product.find(params[:id])
  end

  def product_params
    params.require(:product).permit(:name, :amount, :price)
  end
end
